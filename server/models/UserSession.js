

const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    role: {
        type: String, 
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


const userInputsSchema = new mongoose.Schema({
    monthlyIncome: {
        type: Number,
        default: null 
    },
    spendingHabits: {
        type: Map, 
        of: Number,
        default: {}
    },
    preferredBenefits: {
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


const userSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
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


userSessionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
