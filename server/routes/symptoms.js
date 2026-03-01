const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../services/aiService');
const SymptomCheck = require('../models/SymptomCheck');

// POST /api/symptoms
router.post('/', async (req, res) => {
    try {
        const { age, symptoms, familyHistory, additionalInfo } = req.body;

        if (!age || !symptoms || symptoms.length === 0) {
            return res.status(400).json({ error: 'Please provide age and at least one symptom' });
        }

        const analysis = await analyzeSymptoms(symptoms, age, familyHistory, additionalInfo);

        // Try to save to database
        try {
            const record = new SymptomCheck({
                age,
                symptoms,
                familyHistory,
                additionalInfo,
                riskLevel: analysis.riskLevel,
                explanation: analysis.explanation,
                recommendations: analysis.recommendations
            });
            await record.save();
        } catch (dbErr) {
            // DB save failure is non-critical
            console.log('Could not save to DB (non-critical):', dbErr.message);
        }

        res.json({ success: true, analysis });
    } catch (err) {
        console.error('Symptom analysis error:', err);
        res.status(500).json({ error: 'Analysis failed. Please try again.' });
    }
});

module.exports = router;
