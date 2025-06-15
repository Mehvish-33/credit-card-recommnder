// server/controllers/recommendationController.js

const userSessionService = require('../services/userSessionService');
const creditCardService = require('../services/creditCardService'); // Service for SQLite operations
const recommendationEngine = require('../services/recommendationEngine');

/**
 * Generates and provides credit card recommendations based on user inputs.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
exports.getCardRecommendations = async (req, res) => {
    const { sessionId } = req.query; // Assuming sessionId comes as a query parameter

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required for recommendations.' });
    }

    try {
        // 1. Retrieve user inputs from the session in MongoDB
        const userSession = await userSessionService.getUserSession(sessionId);

        if (!userSession) {
            return res.status(404).json({ error: 'User session not found.' });
        }

        const userInputs = userSession.userInputs;

        // 2. Fetch all credit card data from SQLite
        const allCreditCards = await creditCardService.getAllCreditCards();

        if (!allCreditCards || allCreditCards.length === 0) {
            return res.status(500).json({ error: 'No credit card data available for recommendations.' });
        }

        // 3. Use the recommendation engine to filter and rank cards
        const topRecommendations = recommendationEngine.getTopRecommendations(userInputs, allCreditCards);

        // Optional: Save recommendations back to the user session for history/comparison features
        userSession.recommendations = topRecommendations.map(card => ({
            card_id: card.card_id,
            name: card.name,
            issuer: card.issuer,
            image_url: card.image_url,
            keyReasons: card.keyReasons, // This will be added by the recommendationEngine
            rewardSimulation: card.rewardSimulation // This will also be added by the recommendationEngine
        }));
        await userSessionService.updateUserSession(sessionId, userSession);


        // 4. Send the top recommendations back to the client
        res.json(topRecommendations);

    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ error: 'Failed to generate recommendations.' });
    }
};
