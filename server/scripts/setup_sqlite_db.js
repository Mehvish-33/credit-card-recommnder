// server/scripts/setup_sqlite_db.js
// script to run sql commands in .sql file
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Load environment variables from server/.env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbPath = process.env.SQLITE_DB_PATH;
const sqlFilePath = path.resolve(__dirname, '../data/indian_credit_cards.sql');

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory: ${dataDir}`);
}

// Function to set up the SQLite database
const setupDatabase = () => {
    let db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(`Error opening database ${dbPath}:`, err.message);
            process.exit(1);
        }
        console.log(`Connected to SQLite database: ${dbPath}`);
    });

    // Read the SQL file
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Run all SQL commands in the file
    db.exec(sql, function(err) {
        if (err) {
            console.error(`Error executing SQL script from ${sqlFilePath}:`, err.message);
            process.exit(1);
        }
        console.log('SQLite database setup completed successfully from SQL script.');
        db.close((closeErr) => {
            if (closeErr) {
                console.error('Error closing database:', closeErr.message);
            } else {
                console.log('SQLite database connection closed.');
            }
        });
    });
};

// Execute the setup function
setupDatabase();
