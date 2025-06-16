const express = require('express');
const router = express.Router();


const chatRoutes = require('./chatRoutes');
const recommendationRoutes = require('./recommendationRoutes');


router.use('/api', chatRoutes);

router.use('/api', recommendationRoutes);

module.exports = router;