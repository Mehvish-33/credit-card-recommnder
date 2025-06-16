// llmService.js

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
You are CardMate, a friendly and helpful credit card assistant for Indian users.

🎯 Your job:
Collect the following:
1. Monthly income (₹)
2. Monthly spending: fuel, travel, groceries, dining
3. Preferred benefits (like cashback, travel, lounge access, dining, fuel, movies, shopping)
4. Credit score or say "unknown"

📌 Tips:
- Be simple and natural.
- Ask ONE missing detail at a time.
- If user gives many, thank them and move on to next.
- If confused, guide gently: "Even an estimate like ₹1000 helps 😊"
- Don’t overwhelm or ask all together.
- As soon as all details are known, call extract_user_info.

After tool call, say:
"Awesome! I now have everything I need to recommend your top credit cards. Shall I continue?"

Known inputs so far:
`;

const fewShotExamples = [
  {
    role: "user",
    content: "Hey I want a credit card"
  },
  {
    role: "assistant",
    content: "Sure! To help you better, can you share your monthly income (even an estimate is okay)?"
  },
  {
    role: "user",
    content: "₹25000"
  },
  {
    role: "assistant",
    content: "Great! Now, can you tell me your monthly spending on fuel?"
  },
  {
    role: "user",
    content: "I think around ₹1500"
  },
  {
    role: "assistant",
    content: "Thanks 😊 What about travel, groceries, and dining? Rough numbers are fine!"
  }
];

exports.getLLMResponseAndExtractInputs = async (llmContext, userMessage) => {
  let assistantResponseText = "I'm having trouble understanding that. Could you try rephrasing?";
  let extractedInputs = {};
  let conversationComplete = false;
  let toolCalls = [];

  try {
    const messagesForOpenAI = [
      {
        role: 'system',
        content: `${inlinePrompt} ${JSON.stringify(llmContext.userInputs || {})}`
      },
      ...fewShotExamples,
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
      temperature: 0.6,
      max_tokens: 500,
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
              assistantResponseText =
                "Awesome! I now have everything I need to recommend your top credit cards. Shall I continue?";
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("OpenAI API Error:", err);
    assistantResponseText = "Oops! Something went wrong. Please try again in a moment.";
  }

  return {
    text: assistantResponseText,
    extractedInputs,
    conversationComplete,
    toolCalls
  };
};
