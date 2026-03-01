const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Please fill in all fields' });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for reaching out! We will get back to you soon.'
        });
    } catch (err) {
        // If MongoDB not connected, still return success for demo purposes
        if (err.name === 'MongooseError' || err.name === 'MongoServerError') {
            return res.status(200).json({
                success: true,
                message: 'Thank you for your message! (Demo mode — database not connected)'
            });
        }
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
