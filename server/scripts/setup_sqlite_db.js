
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbPath = process.env.SQLITE_DB_PATH;
const sqlFilePath = path.resolve(__dirname, '../data/indian_credit_cards.sql');

const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log(`Created data directory: ${dataDir}`);
}


const setupDatabase = () => {
    let db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(`Error opening database ${dbPath}:`, err.message);
            process.exit(1);
        }
        console.log(`Connected to SQLite database: ${dbPath}`);
    });

   
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

   
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


setupDatabase();
