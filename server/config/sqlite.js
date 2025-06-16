// server/config/sqlite.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

let db;

/**
 * Establishes a connection to the SQLite database.
 * @returns {Promise<sqlite3.Database>} A promise that resolves with the database instance.
 */
const connectSQLite = () => {
    return new Promise((resolve, reject) => {
        const dbPath = process.env.SQLITE_DB_PATH || './server/data/credit_cards.db';

        // Ensure the data directory exists
        const dataDir = './server/data';
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
            console.log(`✅ Created data directory: ${dataDir}`);
        }

        // Connect to SQLite (will create the file if it doesn't exist)
        db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('❌ SQLite connection error:', err.message);
                reject(err);
            } else {
                console.log('✅ SQLite connected successfully');
                resolve(db);
            }
        });
    });
};

// Export the connector and db getter
module.exports = {
    connectSQLite,
    getDb: () => db
};
