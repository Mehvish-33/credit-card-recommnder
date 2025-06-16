// server/config/sqlite.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); // Node.js File System module

let db; // Variable to hold the SQLite database instance

/**
 * Establishes a connection to the SQLite database.
 * The SQLite database file path is retrieved from environment variables.
 * This function also ensures the database file exists.
 * @returns {Promise<sqlite3.Database>} A promise that resolves with the database instance when connected.
 */
const connectSQLite = () => {
    return new Promise((resolve, reject) => {
        const dbPath = process.env.SQLITE_DB_PATH;

        // Ensure the data directory exists
        const dataDir = './data';
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
            console.log(`Created data directory: ${dataDir}`);
        }

        // Connect to the database. If the file does not exist, it will be created.
        db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('SQLite connection error:', err.message);
                reject(err); // Reject the promise on connection error
            } else {
                console.log('Connected to the SQLite database.');
                resolve(db); // Resolve with the database instance
            }
        });
    });
};

module.exports = {
    connectSQLite,
    getDb: () => db // Getter function to retrieve the connected db instance
};
