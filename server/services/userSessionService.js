<<<<<<< HEAD
// server/services/userSessionService.js

const UserSession = require('../models/UserSession'); // Import the UserSession Mongoose model
=======


const UserSession = require('../models/UserSession'); 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47

/**
 * Retrieves a user session by its ID.
 * @param {string} sessionId - The unique ID of the user session.
 * @returns {Promise<Object|null>} The user session object or null if not found.
 */
exports.getUserSession = async (sessionId) => {
    try {
        const session = await UserSession.findOne({ sessionId: sessionId });
        return session;
    } catch (error) {
        console.error(`Error fetching user session ${sessionId}:`, error);
        throw new Error('Could not retrieve user session.');
    }
};

/**
 * Creates a new user session.
<<<<<<< HEAD
 * @param {string} sessionId - The unique ID for the new session.
 * @returns {Promise<Object>} The newly created user session object.
=======
 * @param {string} sessionId 
 * @returns {Promise<Object>} 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
 */
exports.createUserSession = async (sessionId) => {
    try {
        const newSession = new UserSession({ sessionId: sessionId });
        await newSession.save();
        return newSession;
    } catch (error) {
        console.error(`Error creating user session ${sessionId}:`, error);
        throw new Error('Could not create user session.');
    }
};

/**
 * Updates an existing user session.
<<<<<<< HEAD
 * @param {string} sessionId - The ID of the session to update.
 * @param {Object} updatedData - The data to update the session with.
 * @returns {Promise<Object|null>} The updated user session object or null if not found.
=======
 * @param {string} sessionId 
 * @param {Object} updatedData 
 * @returns {Promise<Object|null>}
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
 */
exports.updateUserSession = async (sessionId, updatedData) => {
    try {
        const session = await UserSession.findOneAndUpdate(
            { sessionId: sessionId },
            { $set: updatedData },
<<<<<<< HEAD
            { new: true, upsert: false } // new: true returns the updated document, upsert: false means don't create if not found
=======
            { new: true, upsert: false } 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        );
        return session;
    } catch (error) {
        console.error(`Error updating user session ${sessionId}:`, error);
        throw new Error('Could not update user session.');
    }
};

/**
<<<<<<< HEAD
 * Deletes a user session. (Optional, useful for cleanup)
 * @param {string} sessionId - The ID of the session to delete.
 * @returns {Promise<Object|null>} The deleted user session object or null if not found.
=======
 * 
 * @param {string} sessionId 
 * @returns {Promise<Object|null>} 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
 */
exports.deleteUserSession = async (sessionId) => {
    try {
        const result = await UserSession.findOneAndDelete({ sessionId: sessionId });
        return result;
    } catch (error) {
        console.error(`Error deleting user session ${sessionId}:`, error);
        throw new Error('Could not delete user session.');
    }
};
