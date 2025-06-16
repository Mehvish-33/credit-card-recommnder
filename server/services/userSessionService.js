

const UserSession = require('../models/UserSession'); 

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
 * @param {string} sessionId 
 * @returns {Promise<Object>} 
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
 * @param {string} sessionId 
 * @param {Object} updatedData 
 * @returns {Promise<Object|null>}
 */
exports.updateUserSession = async (sessionId, updatedData) => {
    try {
        const session = await UserSession.findOneAndUpdate(
            { sessionId: sessionId },
            { $set: updatedData },
            { new: true, upsert: false } 
        );
        return session;
    } catch (error) {
        console.error(`Error updating user session ${sessionId}:`, error);
        throw new Error('Could not update user session.');
    }
};

/**
 * 
 * @param {string} sessionId 
 * @returns {Promise<Object|null>} 
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
