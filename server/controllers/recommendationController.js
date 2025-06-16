// server/controllers/recommendationController.js

const userSessionService = require('../services/userSessionService');
const creditCardService = require('../services/creditCardService'); // Service for SQLite operations
const recommendationEngine = require('../services/recommendationEngine');

/**
 * Generates and provides credit card recommendations based on user inputs.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getCardRecommendations = async (req, res) => {
    const { sessionId } = req.query; 

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required for recommendations.' });
    }

    try {
        
        const userSession = await userSessionService.getUserSession(sessionId);

        if (!userSession) {
            return res.status(404).json({ error: 'User session not found.' });
        }

        const userInputs = userSession.userInputs;

        
        const allCreditCards = await creditCardService.getAllCreditCards();

        if (!allCreditCards || allCreditCards.length === 0) {
            return res.status(500).json({ error: 'No credit card data available for recommendations.' });
        }

        
        const topRecommendations = recommendationEngine.getTopRecommendations(userInputs, allCreditCards);

        
        userSession.recommendations = topRecommendations.map(card => ({
            card_id: card.card_id,
            name: card.name,
            issuer: card.issuer,
            image_url: card.image_url,
            keyReasons: card.keyReasons, 
            rewardSimulation: card.rewardSimulation 
        }));
        await userSessionService.updateUserSession(sessionId, userSession);


        
        res.json(topRecommendations);

    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ error: 'Failed to generate recommendations.' });
    }
};
