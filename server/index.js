import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-diet-planner';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Mongoose Schema Definitions
const MealPlanItemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  isManual: { type: Boolean, default: false },
  isAutoCalculate: { type: Boolean, default: true }
});

const FoodItemSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
});

const ResultSchema = new mongoose.Schema({
  bmi: String,
  bmr: Number,
  tdee: Number,
  goalCalories: Number,
  goalLabel: String
});

const DietPlannerStateSchema = new mongoose.Schema({
  theme: { type: String, default: 'dark' },
  units: { type: String, default: 'metric' },
  age: { type: Number, default: 28 },
  gender: { type: String, default: 'male' },
  weightKg: { type: Number, default: 70 },
  weightLbs: { type: Number, default: 154 },
  heightCm: { type: Number, default: 175 },
  feet: { type: Number, default: 5 },
  inches: { type: Number, default: 9 },
  activity: { type: String, default: 'moderate' },
  goal: { type: String, default: 'maintain' },
  planStyle: { type: String, default: 'balanced' },
  mealsPerDay: { type: Number, default: 3 },
  result: ResultSchema,
  mealPlan: [MealPlanItemSchema],
  foodDatabase: [FoodItemSchema]
}, { timestamps: true });

const DietPlannerState = mongoose.model('DietPlannerState', DietPlannerStateSchema);

// API Endpoints

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({ 
      success: true, 
      message: 'Server is running', 
      mongodbStatus: mongoStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Health check failed' });
  }
});

// Load State
app.get('/api/state', async (req, res) => {
  try {
    let state = await DietPlannerState.findOne().sort({ updatedAt: -1 });
    if (!state) {
      console.log('ℹ️  No saved state found in MongoDB');
      return res.status(200).json({ message: "No saved state found", state: null });
    }
    console.log('✅ State loaded from MongoDB successfully');
    res.status(200).json(state);
  } catch (error) {
    console.error('❌ Error fetching state:', error.message);
    res.status(500).json({ error: 'Server error while fetching state', details: error.message });
  }
});

// Save State
app.post('/api/state', async (req, res) => {
  try {
    const stateData = req.body;
    console.log('📝 Attempting to save state to MongoDB...');
    
    let state = await DietPlannerState.findOne();
    
    if (state) {
      // Update existing state
      console.log('🔄 Updating existing state...');
      Object.assign(state, stateData);
      await state.save();
      console.log('✅ State updated successfully in MongoDB');
    } else {
      // Create new state
      console.log('✨ Creating new state...');
      state = new DietPlannerState(stateData);
      await state.save();
      console.log('✅ New state created and saved to MongoDB');
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'State saved successfully to MongoDB', 
      state,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error saving state:', error.message);
    res.status(500).json({ 
      error: 'Server error while saving state', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
