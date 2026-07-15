import mongoose from 'mongoose';

const MealPlanItemSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  calories:        { type: Number, required: true },
  protein:         { type: Number, default: 0 },
  carbs:           { type: Number, default: 0 },
  fat:             { type: Number, default: 0 },
  isManual:        { type: Boolean, default: false },
  isAutoCalculate: { type: Boolean, default: true },
});

export default MealPlanItemSchema;
