import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import healthRouter from './routes/health.js';
import stateRouter from './routes/state.js';

// Load environment variables from root .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Connect to MongoDB ────────────────────────────────────────────────────────
const dbConnected = await connectDB();
if (!dbConnected) {
  console.warn('⚠️ Continuing without MongoDB. API routes will respond with a degraded status.');
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter);
app.use('/api/state',  stateRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
