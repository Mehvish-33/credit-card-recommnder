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
    default: null
  },
  spendingHabits: {
    type: Map, // Store key-value pairs like { fuel: 5000, travel: 10000 }
    of: Number,
    default: {}
  },
  preferredBenefits: {
    type: [String], // Example: ['cashback', 'lounge access']
    default: []
  },
  existingCards: {
    type: [String],
    default: []
  },
  creditScore: {
    type: String,
    default: 'unknown'
  }
}, { _id: false });

// Define the main UserSession schema
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

// Auto-update `updatedAt` timestamp on save
userSessionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
const UserSession = mongoose.model('UserSession', userSessionSchema);
module.exports = UserSession;
