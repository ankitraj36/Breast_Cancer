const mongoose = require('mongoose');

const symptomCheckSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    gender: { type: String, default: 'female' },
    symptoms: [{ type: String }],
    familyHistory: { type: Boolean, default: false },
    additionalInfo: { type: String },
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'] },
    explanation: { type: String },
    recommendations: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SymptomCheck', symptomCheckSchema);
