const express = require('express');
const router = express.Router();

// Import individual route modules
const chatRoutes = require('./chatRoutes');
const recommendationRoutes = require('./recommendationRoutes');

// Use the imported routes
// All routes defined in chatRoutes will be prefixed with '/api'
router.use('/api', chatRoutes);
// All routes defined in recommendationRoutes will also be prefixed with '/api'
router.use('/api', recommendationRoutes);

module.exports = router;