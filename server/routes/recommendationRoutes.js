const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const recommendationController = require('../controllers/recommendationController'); // Import the recommendation controller
=======
const recommendationController = require('../controllers/recommendationController'); 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47

/**
 * @route GET /api/recommendations
 * @description Fetches credit card recommendations based on user session data.
 * @access Public
 */
router.get('/recommendations', recommendationController.getCardRecommendations);

module.exports = router;