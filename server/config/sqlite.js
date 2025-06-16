

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); 

let db; 

/**
 * Establishes a connection to the SQLite database.
 * The SQLite database file path is retrieved from environment variables.
 * This function also ensures the database file exists.
 * @returns {Promise<sqlite3.Database>} A promise that resolves with the database instance when connected.
 */
const connectSQLite = () => {
    return new Promise((resolve, reject) => {
        const dbPath = process.env.SQLITE_DB_PATH;

        
        const dataDir = './data';
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
            console.log(`Created data directory: ${dataDir}`);
        }

       
        db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('SQLite connection error:', err.message);
                reject(err); 
            } else {
                console.log('Connected to the SQLite database.');
                resolve(db); 
            }
        });
    });
};

module.exports = {
    connectSQLite,
    getDb: () => db 
};
