// server/controllers/chatController.js

const userSessionService = require('../services/userSessionService');
const llmService = require('../services/llmService'); // Assuming this service interacts with OpenAI/LangChain
const { v4: uuidv4 } = require('uuid'); // For generating unique session IDs

/**
 * Handles incoming chat messages from the user.
 * Manages the conversation flow, updates user session, and interacts with the LLM.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
exports.handleChatMessage = async (req, res) => {
    const { sessionId: clientSessionId, message } = req.body;

    // Use the session ID from the client, or generate a new one if it's the first message
    let sessionId = clientSessionId;
    if (!sessionId) {
        sessionId = uuidv4();
    }

    try {
        // 1. Retrieve or create user session from MongoDB
        let userSession = await userSessionService.getUserSession(sessionId);

        // If no session exists, create a new one
        if (!userSession) {
            userSession = await userSessionService.createUserSession(sessionId);
        }

        // Add user's message to chat history
        userSession.chatHistory.push({ role: 'user', content: message });

        // 2. Prepare chat history and user inputs for the LLM
        // Combine chat history with current user inputs for comprehensive context
        const llmContext = {
            chatHistory: userSession.chatHistory,
            userInputs: userSession.userInputs,
            // lastQuestionAsked is less critical now as LLM manages flow directly
        };

        // 3. Get response and extracted inputs from LLM service
        const llmResponse = await llmService.getLLMResponseAndExtractInputs(llmContext, message);

        // Update user session with LLM's text response
        if (llmResponse.text) {
             userSession.chatHistory.push({ role: 'assistant', content: llmResponse.text });
        }


        // IMPORTANT: If LLM extracted inputs via function calling, merge them
        if (Object.keys(llmResponse.extractedInputs).length > 0) {
            // Merge extracted inputs. This allows partial updates
            // and ensures that previously collected data isn't lost if LLM only extracts new pieces.
            Object.assign(userSession.userInputs, llmResponse.extractedInputs);

            // Add the tool call to chat history for LLM context, if you want it visible
            // This is crucial for the LLM to understand its own actions.
            if (llmResponse.toolCalls && llmResponse.toolCalls.length > 0) {
                 userSession.chatHistory.push({
                     role: 'assistant',
                     tool_calls: llmResponse.toolCalls,
                 });
                 // Add the "tool_response" to history for the LLM to know the result
                 // In a real setup, you'd execute the tool and add its output.
                 // For extraction, the output is the extracted data.
                 userSession.chatHistory.push({
                    role: 'tool',
                    tool_call_id: llmResponse.toolCalls[0].id, // Assuming one tool call for simplicity
                    content: JSON.stringify(llmResponse.extractedInputs) // What the tool "returned"
                 });
            }
        }


        // 4. Save updated user session to MongoDB
        await userSessionService.updateUserSession(sessionId, userSession);

        // 5. Send response back to client
        res.json({
            sessionId: sessionId,
            response: llmResponse.text,
            userInputs: userSession.userInputs,
            conversationComplete: llmResponse.conversationComplete // Signal if all info collected
        });

    } catch (error) {
        console.error('Error handling chat message:', error);
        res.status(500).json({ error: 'Failed to process chat message.' });
    }
};
