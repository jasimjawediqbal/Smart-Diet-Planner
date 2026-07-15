import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const connectDB = async (attempt = 1) => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart-diet-planner';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log(`✅ MongoDB connected → ${uri}`);
    return true;
  } catch (err) {
    console.error(`❌ MongoDB connection failed (attempt ${attempt}/${MAX_RETRIES}): ${err.message}`);

    if (attempt < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB(attempt + 1);
    }

    console.warn('⚠️ MongoDB is unavailable; starting the Express server in degraded mode.');
    return false;
  }
};

export default connectDB;
