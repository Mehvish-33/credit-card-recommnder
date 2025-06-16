// File: server/server.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import DB connections
const connectMongoDB = require('./config/mongodb');
const { connectSQLite } = require('./config/sqlite');

// Import routes
const apiRoutes = require('./routes');
const whatsappRoute = require('./routes/Whatsapp'); // ✅ Ensure the file is named exactly 'whatsapp.js' (lowercase)

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------ MIDDLEWARE ------------------ //
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// ------------------ DATABASE CONNECTIONS ------------------ //
// MongoDB for user sessions
connectMongoDB();

// SQLite for credit card data
connectSQLite()
  .then((sqliteDbInstance) => {
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
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
