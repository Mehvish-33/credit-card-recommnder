// server/services/llmService.js

const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Defines the tool (function) schema for extracting user information.
 * The LLM will be instructed to call this function when it identifies relevant data.
 */
const tools = [
    {
        type: "function",
        function: {
            name: "extract_user_info",
            description: "Extracts key credit card recommendation criteria from user's conversation.",
            parameters: {
                type: "object",
                properties: {
                    monthlyIncome: {
                        type: "number",
                        description: "User's approximate monthly income in Indian Rupees."
                    },
                    fuelSpending: {
                        type: "number",
                        description: "User's approximate monthly spending on fuel in Indian Rupees."
                    },
                    travelSpending: {
                        type: "number",
                        description: "User's approximate monthly spending on travel in Indian Rupees."
                    },
                    groceriesSpending: {
                        type: "number",
                        description: "User's approximate monthly spending on groceries in Indian Rupees."
                    },
                    diningSpending: {
                        type: "number",
                        description: "User's approximate monthly spending on dining in Indian Rupees."
                    },
                    preferredBenefits: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: ["cashback", "travel points", "lounge access", "dining benefits", "movie offers", "fuel benefits", "shopping vouchers"]
                        },
                        description: "List of preferred credit card benefits (e.g., cashback, lounge access)."
                    },
                    creditScore: {
                        type: "string",
                        description: "User's approximate credit score (e.g., '750') or 'unknown'."
                    },
                },
                // Define which properties are required before the function can be called.
                // The LLM will try to gather these before making the call.
                required: ["monthlyIncome", "fuelSpending", "travelSpending", "groceriesSpending", "diningSpending", "preferredBenefits", "creditScore"],
            },
        },
    },
];

/**
 * Gets a response from the LLM and attempts to extract user inputs using function calling.
 * @param {Object} llmContext - Context containing chat history and current user inputs.
 * @param {string} userMessage - The latest message from the user.
 * @returns {Promise<Object>} An object containing the LLM's text response,
 * extracted inputs (from tool calls), and a flag if the conversation is complete.
 */
exports.getLLMResponseAndExtractInputs = async (llmContext, userMessage) => {
    let assistantResponseText = "I'm having trouble understanding right now. Could you rephrase?";
    let extractedInputs = {};
    let conversationComplete = false;
    let toolCalls = [];

    try {
        const messagesForOpenAI = llmContext.chatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
        }));

        // Add a detailed system message to guide the LLM's behavior and tool usage.
        messagesForOpenAI.unshift({
            role: 'system',
            content: `You are an intelligent and helpful credit card recommendation assistant for Indian users.
            Your primary goal is to gather the following specific information from the user to provide accurate recommendations:
            1.  **Monthly Income** (in Indian Rupees).
            2.  **Monthly Spending Habits** on key categories: **fuel, travel, groceries, and dining** (approximate amounts in Indian Rupees).
            3.  **Preferred Benefits**: (e.g., cashback, travel points, lounge access, dining benefits, movie offers, fuel benefits, shopping vouchers).
            4.  **Approximate Credit Score**: (a number like '750' or 'unknown' if they don't know).

            **Conversation Flow & Tool Usage:**
            -   Go through these points one by one. If information for a point is missing, ask for it clearly and concisely.
            -   Acknowledge the information once received.
            -   If the user provides information for a future point, acknowledge it and then guide them back to the current missing piece.
            -   If the user asks an irrelevant question, gently steer them back to the information gathering process.
            -   **Crucially, use the 'extract_user_info' tool as soon as you have collected ALL the required parameters from the user.** Do not wait for all fields to be populated in \`llmContext.userInputs\` if the user just provided it. Your goal is to fill the tool's parameters.
            -   Once the 'extract_user_info' tool is successfully called and confirms all required data is extracted, transition to stating: "Great! I have all the necessary information. I can now provide you with credit card recommendations. Would you like to see them?" This signals \`conversationComplete = true\`.
            -   Be conversational, friendly, and efficient in gathering information.

            **Current State of User Inputs (for internal context, not for user display):**
            ${JSON.stringify(llmContext.userInputs || {})}
            `
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messagesForOpenAI,
            temperature: 0.7,
            max_tokens: 300, // Increased max_tokens slightly to allow for tool calls and follow-up text
            tools: tools, // Provide the tools to the LLM
            tool_choice: "auto", // Allow the LLM to decide when to call a tool
        });

        const responseMessage = completion.choices[0].message;
        assistantResponseText = responseMessage.content || ''; // LLM might only return a tool_call

        // --- Process Tool Calls ---
        if (responseMessage.tool_calls) {
            toolCalls = responseMessage.tool_calls;
            for (const toolCall of toolCalls) {
                if (toolCall.function.name === "extract_user_info") {
                    const functionArgs = JSON.parse(toolCall.function.arguments);
                    extractedInputs = {
                        monthlyIncome: functionArgs.monthlyIncome,
                        spendingHabits: {
                            fuel: functionArgs.fuelSpending || 0,
                            travel: functionArgs.travelSpending || 0,
                            groceries: functionArgs.groceriesSpending || 0,
                            dining: functionArgs.diningSpending || 0,
                        },
                        preferredBenefits: functionArgs.preferredBenefits || [],
                        creditScore: functionArgs.creditScore || 'unknown',
                    };

                    // Check if all *required* inputs from the tool are present
                    // This is a more robust way to determine conversation completion
                    const allRequiredExtracted = Object.keys(tools[0].function.parameters.required).every(key => {
                        if (key === 'fuelSpending' || key === 'travelSpending' || key === 'groceriesSpending' || key === 'diningSpending') {
                            return extractedInputs.spendingHabits[key.replace('Spending', '')] !== undefined && extractedInputs.spendingHabits[key.replace('Spending', '')] !== null;
                        }
                        return extractedInputs[key] !== undefined && extractedInputs[key] !== null;
                    });


                    if (allRequiredExtracted) {
                        conversationComplete = true;
                        // LLM should produce a final message indicating completion if it calls the tool successfully
                        // If it doesn't, we can provide a default here or in the controller.
                        if (!assistantResponseText) { // If LLM only made a tool call and no text
                             assistantResponseText = "Great! I have all the necessary information. I can now provide you with credit card recommendations. Would you like to see them?";
                        }
                    }
                }
            }
        }

    } catch (llmError) {
        console.error("Error with OpenAI API:", llmError);
        if (llmError.response) {
            console.error("OpenAI API Response Error:", llmError.response.status, llmError.response.data);
        }
        assistantResponseText = "I'm experiencing a technical issue with my understanding. Please try again in a moment.";
        conversationComplete = false;
    }

    return {
        text: assistantResponseText,
        extractedInputs: extractedInputs,
        conversationComplete: conversationComplete,
        toolCalls: toolCalls // Pass tool calls back to controller if further action needed
    };
};