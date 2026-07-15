import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// GET /api/health
router.get('/', async (req, res) => {
  try {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
      success: true,
      message: 'Server is running',
      mongodbStatus: mongoStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Health check failed' });
  }
});

export default router;
