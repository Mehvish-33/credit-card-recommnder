<<<<<<< HEAD
// server/scripts/setup_sqlite_db.js
// script to run sql commands in .sql file
=======

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

<<<<<<< HEAD
// Load environment variables from server/.env
=======
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbPath = process.env.SQLITE_DB_PATH;
const sqlFilePath = path.resolve(__dirname, '../data/indian_credit_cards.sql');

<<<<<<< HEAD
// Ensure the data directory exists
=======
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory: ${dataDir}`);
}

<<<<<<< HEAD
// Function to set up the SQLite database
=======

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
const setupDatabase = () => {
    let db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(`Error opening database ${dbPath}:`, err.message);
            process.exit(1);
        }
        console.log(`Connected to SQLite database: ${dbPath}`);
    });

<<<<<<< HEAD
    // Read the SQL file
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Run all SQL commands in the file
=======
   
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

   
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
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

<<<<<<< HEAD
// Execute the setup function
=======

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
setupDatabase();
