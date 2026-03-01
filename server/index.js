const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('./config/db');
const { initAI } = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Connect DB & Init AI ────────────────────────────────
connectDB();
initAI();

// ─── API Routes ──────────────────────────────────────────
app.use('/api/contact', require('./routes/contact'));
app.use('/api/symptoms', require('./routes/symptoms'));
app.use('/api/chat', require('./routes/chat'));

// ─── Health Check ────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Serve React in Production ───────────────────────────
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
    });
}

// ─── Start Server ────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🎀 Breast Cancer Awareness Server running on port ${PORT}`);
    console.log(`   API: http://localhost:${PORT}/api/health\n`);
});
