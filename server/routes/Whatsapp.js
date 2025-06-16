const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { getLLMResponseAndExtractInputs } = require('../services/llmService');
const { getRecommendationsFromInputs } = require('../services/recommendationEngine');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// 🧠 Simple memory store per WhatsApp number
const sessions = {};

router.post('/', async (req, res) => {
  const from = req.body.From;
  const incomingMsg = req.body.Body;

  console.log('📩 WhatsApp message from', from, ':', incomingMsg);

  // Initialize session if new
  if (!sessions[from]) {
    sessions[from] = {
      chatHistory: [],
      userInputs: {}
    };
  }

  const session = sessions[from];

  // Push incoming message to chat history
  session.chatHistory.push({ role: 'user', content: incomingMsg });

  try {
    const { text, extractedInputs, conversationComplete } =
      await getLLMResponseAndExtractInputs(session, incomingMsg);

    // Push assistant response to history
    session.chatHistory.push({ role: 'assistant', content: text });

    // Update user inputs if available
    if (Object.keys(extractedInputs).length > 0) {
      session.userInputs = { ...session.userInputs, ...extractedInputs };
    }

    // Step 1: Send the assistant reply
    await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: from,
      body: text,
    });

    // Step 2: If complete, send recommendations
    if (conversationComplete) {
      const recommendations = await getRecommendationsFromInputs(session.userInputs);

      const reply = recommendations.length
        ? recommendations.map((card, i) =>
            `${i + 1}. ${card.name} - ${card.keyReasons.join(', ')}`).join('\n\n')
        : "Sorry, no suitable credit cards were found.";

      await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: from,
        body: `📢 Based on your inputs, here are some recommendations:\n\n${reply}`,
      });

      // Optional: Clear session if you want fresh start
      delete sessions[from];
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ WhatsApp handler error:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
