const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools = [
  {
    type: "function",
    function: {
      name: "extract_user_info",
      description: "Extracts key credit card recommendation criteria from user's conversation.",
      parameters: {
        type: "object",
        properties: {
          monthlyIncome: { type: "number", description: "Monthly income in INR" },
          fuelSpending: { type: "number", description: "Fuel spending in INR" },
          travelSpending: { type: "number", description: "Travel spending in INR" },
          groceriesSpending: { type: "number", description: "Groceries spending in INR" },
          diningSpending: { type: "number", description: "Dining spending in INR" },
          preferredBenefits: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "cashback", "travel points", "lounge access",
                "dining benefits", "movie offers", "fuel benefits", "shopping vouchers"
              ]
            },
            description: "Preferred card benefits"
          },
          creditScore: {
            type: "string",
            description: "User’s credit score or 'unknown'",
          },
        },
        required: [
          "monthlyIncome", "fuelSpending", "travelSpending",
          "groceriesSpending", "diningSpending", "preferredBenefits", "creditScore"
        ],
      },
    },
  },
];

const inlinePrompt = `
You are CardMate, a smart and helpful credit card advisor for Indian users.

Your task is to understand the user's financial habits and recommend the best credit card based on the following key criteria:
1. Monthly income (in INR)
2. Monthly spending in: fuel, travel, groceries, dining
3. Preferred benefits (choose from cashback, travel points, lounge access, movie offers, shopping vouchers, fuel benefits, dining perks)
4. Credit score (if known, else accept 'unknown')

👉 Ask one missing detail at a time.
👉 If the user gives many at once, acknowledge each and focus on the next missing one.
👉 Politely ignore irrelevant queries and steer the conversation back on track.
👉 Use extract_user_info tool **immediately** when all fields are provided.
👉 After tool call, say:  
“Great! I now have all your details and can provide tailored credit card recommendations. Would you like to see them?”

Be friendly, natural, and adaptive.
`;

exports.getLLMResponseAndExtractInputs = async (llmContext, userMessage) => {
  let assistantResponseText = "I'm having trouble understanding right now. Could you rephrase?";
  let extractedInputs = {};
  let conversationComplete = false;
  let toolCalls = [];

  try {
    const messagesForOpenAI = [
      {
        role: 'system',
        content: `${inlinePrompt}\n\nCurrent user inputs: ${JSON.stringify(llmContext.userInputs || {})}`
      },
      ...llmContext.chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messagesForOpenAI,
      temperature: 0.7,
      max_tokens: 400,
      tools: tools,
      tool_choice: "auto"
    });

    const responseMessage = completion.choices[0].message;
    assistantResponseText = responseMessage.content || '';

    if (responseMessage.tool_calls) {
      toolCalls = responseMessage.tool_calls;

      for (const toolCall of toolCalls) {
        if (toolCall.function.name === "extract_user_info") {
          const args = JSON.parse(toolCall.function.arguments);

          extractedInputs = {
            monthlyIncome: args.monthlyIncome,
            spendingHabits: {
              fuel: args.fuelSpending || 0,
              travel: args.travelSpending || 0,
              groceries: args.groceriesSpending || 0,
              dining: args.diningSpending || 0
            },
            preferredBenefits: args.preferredBenefits || [],
            creditScore: args.creditScore || 'unknown'
          };

          const required = tools[0].function.parameters.required;
          const allSet = required.every(key => {
            if (key.endsWith("Spending")) {
              const cat = key.replace("Spending", "");
              return extractedInputs.spendingHabits[cat] !== undefined;
            }
            return extractedInputs[key] !== undefined;
          });

          if (allSet) {
            conversationComplete = true;
            if (!assistantResponseText) {
              assistantResponseText = "Great! I now have all your details and can provide tailored credit card recommendations. Would you like to see them?";
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("OpenAI API Error:", err);
    assistantResponseText = "Sorry, I'm facing a technical issue right now. Please try again shortly.";
  }

  return {
    text: assistantResponseText,
    extractedInputs,
    conversationComplete,
    toolCalls
  };
};
