// File: /client/src/services/api.js
import axios from 'axios';

// Create an axios instance with base URL of your backend API
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if deploying
});

// ✅ Send a chat message to the bot and get a response
export const sendMessageToBot = async (sessionId, message) => {
  try {
    const res = await API.post('/chat', { sessionId, message });
    return res.data;
  } catch (err) {
    console.error('Error sending message to bot:', err);
    return {
      responseText: 'Sorry, something went wrong.',
      sessionId,
    };
  }
};

// ✅ Get personalized credit card recommendations based on sessionId
export const getRecommendations = async (sessionId) => {
  try {
    const res = await API.get(`/recommendations?sessionId=${sessionId}`);
    
    // Log the raw data to verify backend structure
    console.log('getRecommendations API response:', res.data);

    // Case 1: if backend sends an array directly: [ { card1 }, { card2 }, ... ]
    if (Array.isArray(res.data)) {
      return res.data;
    }

    // Case 2: if backend sends { cards: [...] }
    if (Array.isArray(res.data.cards)) {
      return res.data.cards;
    }

    // Fallback: no valid cards array found
    return [];
  } catch (err) {
    console.error('Error getting recommendations:', err);
    return [];
  }
};
