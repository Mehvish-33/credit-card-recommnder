// server/models/UserSession.js

const mongoose = require('mongoose');

// Define the schema for a single chat message within the session
const messageSchema = new mongoose.Schema({
    role: {
        type: String, // 'user' or 'assistant'
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Define the schema for user-specific inputs collected during the conversation
const userInputsSchema = new mongoose.Schema({
    monthlyIncome: {
        type: Number,
        default: null // Null if not yet collected
    },
    spendingHabits: {
        type: Map, // Store key-value pairs like { fuel: 5000, travel: 10000 }
        of: Number,
        default: {}
    },
    preferredBenefits: {
        type: [String], // Array of strings like ['cashback', 'lounge access']
        default: []
    },
    existingCards: {
        type: [String], // Array of strings for names of existing cards (optional)
        default: []
    },
    creditScore: {
        type: String, // Allow "unknown" or a score range
        default: 'unknown'
    },
    // Add other dynamic questions as needed
}, { _id: false }); // Do not create a default _id for this sub-document

// Define the main UserSession schema
const userSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true, // Each session should have a unique ID
        index: true   // Index for faster lookups
    },
    chatHistory: {
        type: [messageSchema], // An array of message sub-documents
        default: []
    },
    userInputs: {
        type: userInputsSchema, // Embed the userInputs sub-document
        default: {}
    },
    lastQuestionAsked: {
        type: String, // Stores a key/identifier for the last question the LLM asked
        default: null
    },
    recommendations: {
        type: [Object], // Store the recommended cards (can be a flexible object for now)
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update `updatedAt` field on every save
userSessionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Mongoose model from the schema
const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
