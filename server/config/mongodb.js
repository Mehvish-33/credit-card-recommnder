const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 * The MongoDB connection string is retrieved from environment variables.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
<<<<<<< HEAD
            // Optional: Mongoose 6+ often handles these automatically, but good for clarity
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
=======
            
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
<<<<<<< HEAD
        // Exit process with failure
=======
        
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        process.exit(1);
    }
};

module.exports = connectMongoDB;
