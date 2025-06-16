// server/server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import database connection functions
const connectMongoDB = require('./config/mongodb');
const { connectSQLite } = require('./config/sqlite');

// Import routes
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
    console.log('✅ SQLite connected');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to SQLite:', err);
    process.exit(1); // Exit if critical DB connection fails
  });

// ------------------ ROUTES ------------------ //
// WhatsApp webhook (Twilio)
app.use('/api/whatsapp', whatsappRoute);

// Other app API endpoints (chat, recommendations)
app.use('/', apiRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('💳 Credit Card Recommender Backend is running!');
});

// Optional: SQLite test route
app.get('/api/test-sqlite', (req, res) => {
  const db = app.locals.sqliteDB;
  if (!db) {
    return res.status(500).json({ message: 'SQLite not connected.' });
  }

  db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'SQLite tables retrieved successfully', tables });
  });
});

// ------------------ START SERVER ------------------ //
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
