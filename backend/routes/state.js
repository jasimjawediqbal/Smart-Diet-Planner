import express from 'express';
import mongoose from 'mongoose';
import DietPlannerState from '../models/DietPlannerState.js';
import FoodEntry from '../models/FoodEntry.js';

const router = express.Router();

const normalizeFoodDatabase = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === 'object' && typeof item.name === 'string' && item.name.trim())
    .map((item) => ({
      name: item.name.trim(),
      calories: Number(item.calories) || 0,
      protein: Number(item.protein) || 0,
      carbs: Number(item.carbs) || 0,
      fat: Number(item.fat) || 0,
    }));
};

const normalizeMealPlan = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === 'object')
    .map((item, index) => ({
      name: typeof item.name === 'string' && item.name.trim() ? item.name.trim() : `Meal ${index + 1}`,
      calories: Number(item.calories) || 0,
      protein: Number(item.protein) || 0,
      carbs: Number(item.carbs) || 0,
      fat: Number(item.fat) || 0,
      isManual: Boolean(item.isManual),
      isAutoCalculate: item.isAutoCalculate !== false,
    }));
};

const normalizeStatePayload = (stateData = {}) => {
  const payload = { ...stateData };

  if (Object.prototype.hasOwnProperty.call(stateData, 'mealPlan')) {
    payload.mealPlan = normalizeMealPlan(stateData.mealPlan);
  }

  if (Object.prototype.hasOwnProperty.call(stateData, 'foodDatabase')) {
    payload.foodDatabase = normalizeFoodDatabase(stateData.foodDatabase);
  }

  return payload;
};

// GET /api/state — load the most recently updated state
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB is not connected. State could not be loaded.',
        state: null,
      });
    }

    const state = await DietPlannerState.findOne().sort({ updatedAt: -1 });

    if (!state) {
      console.log('ℹ️  No saved state found in MongoDB — returning null');
      return res.status(200).json({ message: 'No saved state found', state: null });
    }

    console.log('✅ State loaded from MongoDB');
    res.status(200).json(state);
  } catch (error) {
    console.error('❌ Error fetching state:', error.message);
    res.status(500).json({ error: 'Server error while fetching state', details: error.message });
  }
});

// POST /api/state — upsert (create or update) the state
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB is not connected. State could not be saved.',
      });
    }

    const stateData = normalizeStatePayload(req.body);
    console.log('📝 Saving state to MongoDB...');

    let state = await DietPlannerState.findOne();

    if (state) {
      console.log('🔄 Updating existing state...');
      Object.assign(state, stateData);
      await state.save();
      console.log('✅ State updated in MongoDB');
    } else {
      console.log('✨ Creating new state...');
      state = new DietPlannerState(stateData);
      await state.save();
      console.log('✅ New state saved to MongoDB');
    }

    const foodItems = normalizeFoodDatabase(stateData.foodDatabase || []);

    if (state._id) {
      await FoodEntry.deleteMany({ stateId: state._id });
      if (foodItems.length > 0) {
        const foodDocs = foodItems.map((item) => ({
          stateId: state._id,
          ...item,
        }));
        await FoodEntry.insertMany(foodDocs);
        console.log(`✅ Persisted ${foodDocs.length} food entries to MongoDB`);
      }
    }

    res.status(200).json({
      success: true,
      message: 'State saved successfully',
      state,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error saving state:', error.message);
    res.status(500).json({ error: 'Server error while saving state', details: error.message });
  }
});

export default router;
