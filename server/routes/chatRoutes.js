const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController'); // Import the chat controller

/**
 * @route POST /api/chat
 * @description Handles incoming chat messages and orchestrates LLM interaction.
 * @access Public
 */
router.post('/chat', chatController.handleChatMessage);

module.exports = router;