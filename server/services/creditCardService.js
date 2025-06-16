// server/services/creditCardService.js

// Import the function to get the SQLite database instance
const { getDb: getSqliteDb } = require('../config/sqlite');

/**
 * Retrieves all credit card records from the SQLite database.
 * @returns {Promise<Array>} A promise that resolves with an array of credit card objects.
 */
exports.getAllCreditCards = () => {
    return new Promise((resolve, reject) => {
        const db = getSqliteDb();
        if (!db) {
            return reject(new Error('SQLite database not initialized.'));
        }

        const sql = `SELECT * FROM indian_credit_cards;`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error fetching all credit cards:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

/**
 * Retrieves a single credit card record by its ID.
 * @param {number} cardId - The ID of the credit card.
 * @returns {Promise<Object|null>} A promise that resolves with the credit card object or null if not found.
 */
exports.getCreditCardById = (cardId) => {
    return new Promise((resolve, reject) => {
        const db = getSqliteDb();
        if (!db) {
            return reject(new Error('SQLite database not initialized.'));
        }

        const sql = `SELECT * FROM indian_credit_cards WHERE card_id = ?;`;
        db.get(sql, [cardId], (err, row) => {
            if (err) {
                console.error(`Error fetching credit card with ID ${cardId}:`, err.message);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};
