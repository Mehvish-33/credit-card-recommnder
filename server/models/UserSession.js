<<<<<<< HEAD
// server/models/UserSession.js

const mongoose = require('mongoose');

// Define the schema for a single chat message within the session
const messageSchema = new mongoose.Schema({
    role: {
        type: String, // 'user' or 'assistant'
=======


const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    role: {
        type: String, 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
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

<<<<<<< HEAD
// Define the schema for user-specific inputs collected during the conversation
const userInputsSchema = new mongoose.Schema({
    monthlyIncome: {
        type: Number,
        default: null // Null if not yet collected
    },
    spendingHabits: {
        type: Map, // Store key-value pairs like { fuel: 5000, travel: 10000 }
=======

const userInputsSchema = new mongoose.Schema({
    monthlyIncome: {
        type: Number,
        default: null 
    },
    spendingHabits: {
        type: Map, 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
        of: Number,
        default: {}
    },
    preferredBenefits: {
<<<<<<< HEAD
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
=======
        type: [String], 
        default: []
    },
    existingCards: {
        type: [String], 
        default: []
    },
    creditScore: {
        type: String, 
        default: 'unknown'
    },
    
}, { _id: false }); 


>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
const userSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
<<<<<<< HEAD
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
=======
        unique: true, 
        index: true   
    },
    chatHistory: {
        type: [messageSchema], 
        default: []
    },
    userInputs: {
        type: userInputsSchema, 
        default: {}
    },
    lastQuestionAsked: {
        type: String, 
        default: null
    },
    recommendations: {
        type: [Object], 
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
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

<<<<<<< HEAD
// Update `updatedAt` field on every save
=======

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
userSessionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

<<<<<<< HEAD
// Create the Mongoose model from the schema
=======

>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
