const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// Import individual route modules
const chatRoutes = require('./chatRoutes');
const recommendationRoutes = require('./recommendationRoutes');

// Use the imported routes
// All routes defined in chatRoutes will be prefixed with '/api'
router.use('/api', chatRoutes);
// All routes defined in recommendationRoutes will also be prefixed with '/api'
=======

const chatRoutes = require('./chatRoutes');
const recommendationRoutes = require('./recommendationRoutes');


router.use('/api', chatRoutes);

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
router.use('/api', recommendationRoutes);

module.exports = router;