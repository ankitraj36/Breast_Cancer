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

// Note: In production on Vercel, static files are served by Vercel's CDN,
// not by Express. The api/index.js entry handles only /api/* routes.

// ─── Start Server (local dev only, Vercel uses the export) ──
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🎀 Breast Cancer Awareness Server running on port ${PORT}`);
        console.log(`   API: http://localhost:${PORT}/api/health\n`);
    });
}

// Export for Vercel serverless
module.exports = app;
