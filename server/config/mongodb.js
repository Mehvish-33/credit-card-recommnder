const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 * The MongoDB connection string is retrieved from environment variables.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Optional: Mongoose 6+ often handles these automatically, but good for clarity
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectMongoDB;
