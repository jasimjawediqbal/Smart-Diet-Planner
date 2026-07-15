import mongoose from 'mongoose';
import MealPlanItemSchema from './MealPlanItem.js';
import FoodItemSchema     from './FoodItem.js';
import ResultSchema       from './Result.js';

const DietPlannerStateSchema = new mongoose.Schema(
  {
    theme:       { type: String, default: 'dark' },
    units:       { type: String, default: 'metric' },
    age:         { type: Number, default: 28 },
    gender:      { type: String, default: 'male' },
    weightKg:    { type: Number, default: 70 },
    weightLbs:   { type: Number, default: 154 },
    heightCm:    { type: Number, default: 175 },
    feet:        { type: Number, default: 5 },
    inches:      { type: Number, default: 9 },
    activity:    { type: String, default: 'moderate' },
    goal:        { type: String, default: 'maintain' },
    planStyle:   { type: String, default: 'balanced' },
    mealsPerDay: { type: Number, default: 3 },
    result:      { type: ResultSchema, default: null },
    mealPlan:    { type: [MealPlanItemSchema], default: [] },
    foodDatabase:{ type: [FoodItemSchema],    default: [] },
  },
  { timestamps: true }
);

const DietPlannerState = mongoose.model('DietPlannerState', DietPlannerStateSchema);

export default DietPlannerState;
