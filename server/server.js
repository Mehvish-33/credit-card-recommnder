// server/server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import database connection functions
const connectMongoDB = require('./config/mongodb');
const { connectSQLite, getDb: getSqliteDb } = require('./config/sqlite'); // Renamed getDb to getSqliteDb for clarity

// Import the main routes index file
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes (important for frontend communication)
app.use(express.json()); // Parse JSON request bodies

// Database Connections (initiated here)
connectMongoDB(); // Connect to MongoDB for User Sessions

// Connect to SQLite for Credit Card Data
connectSQLite().then(sqliteDbInstance => {
    // Once SQLite is connected, make its instance globally available via app.locals
    // This allows services (like creditCardService) to access the connected DB
    app.locals.sqliteDB = sqliteDbInstance;
}).catch(err => {
    console.error('Failed to connect to SQLite:', err);
    // If SQLite connection fails, the server should not start as credit card data is essential.
    process.exit(1);
});

// Use the API routes
// All routes defined in apiRoutes (e.g., /api/chat, /api/recommendations)
// will be accessible under the base URL
app.use('/', apiRoutes);

// Basic Route for testing (optional, can be removed once main routes are working)
app.get('/', (req, res) => {
    res.send('Credit Card Recommender Backend is running!');
});

// Example: A simple route to test SQLite connection and tables (after setup_sqlite_db.js has run)
app.get('/api/test-sqlite', (req, res) => {
    const db = app.locals.sqliteDB;
    if (!db) {
        return res.status(500).json({ message: 'SQLite database not connected.' });
    }
    db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'SQLite connected and tables fetched.', tables });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
