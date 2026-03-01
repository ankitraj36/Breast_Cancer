const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../services/aiService');

// POST /api/chat
router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Please provide a message' });
        }

        const response = await chatWithAssistant(message, history || []);
        res.json({ success: true, ...response });
    } catch (err) {
        console.error('Chat error:', err);
        res.status(500).json({ error: 'Chat service unavailable. Please try again.' });
    }
});

module.exports = router;
