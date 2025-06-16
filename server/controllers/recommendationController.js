// server/controllers/recommendationController.js

const userSessionService = require('../services/userSessionService');
const creditCardService = require('../services/creditCardService'); // Service for SQLite operations
const recommendationEngine = require('../services/recommendationEngine');

/**
 * Generates and provides credit card recommendations based on user inputs.
<<<<<<< HEAD
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
exports.getCardRecommendations = async (req, res) => {
    const { sessionId } = req.query; // Assuming sessionId comes as a query parameter
=======
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getCardRecommendations = async (req, res) => {
    const { sessionId } = req.query; 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required for recommendations.' });
    }

    try {
<<<<<<< HEAD
        // 1. Retrieve user inputs from the session in MongoDB
=======
        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        const userSession = await userSessionService.getUserSession(sessionId);

        if (!userSession) {
            return res.status(404).json({ error: 'User session not found.' });
        }

        const userInputs = userSession.userInputs;

<<<<<<< HEAD
        // 2. Fetch all credit card data from SQLite
=======
        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        const allCreditCards = await creditCardService.getAllCreditCards();

        if (!allCreditCards || allCreditCards.length === 0) {
            return res.status(500).json({ error: 'No credit card data available for recommendations.' });
        }

<<<<<<< HEAD
        // 3. Use the recommendation engine to filter and rank cards
        const topRecommendations = recommendationEngine.getTopRecommendations(userInputs, allCreditCards);

        // Optional: Save recommendations back to the user session for history/comparison features
=======
        
        const topRecommendations = recommendationEngine.getTopRecommendations(userInputs, allCreditCards);

        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        userSession.recommendations = topRecommendations.map(card => ({
            card_id: card.card_id,
            name: card.name,
            issuer: card.issuer,
            image_url: card.image_url,
<<<<<<< HEAD
            keyReasons: card.keyReasons, // This will be added by the recommendationEngine
            rewardSimulation: card.rewardSimulation // This will also be added by the recommendationEngine
=======
            keyReasons: card.keyReasons, 
            rewardSimulation: card.rewardSimulation 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        }));
        await userSessionService.updateUserSession(sessionId, userSession);


<<<<<<< HEAD
        // 4. Send the top recommendations back to the client
=======
        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        res.json(topRecommendations);

    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ error: 'Failed to generate recommendations.' });
    }
};
