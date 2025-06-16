const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController'); 

/**
 * @route GET /api/recommendations
 * @description Fetches credit card recommendations based on user session data.
 * @access Public
 */
router.get('/recommendations', recommendationController.getCardRecommendations);

module.exports = router;