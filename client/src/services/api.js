import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

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

export const getRecommendations = async (sessionId) => {
  try {
    const res = await API.get(`/recommendations?sessionId=${sessionId}`);
    console.log('getRecommendations API response:', res.data);

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.cards)) return res.data.cards;
    return [];
  } catch (err) {
    console.error('Error getting recommendations:', err);
    return [];
  }
};
