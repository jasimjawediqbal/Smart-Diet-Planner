import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  calories: { type: Number, required: true },
  protein:  { type: Number, default: 0 },
  carbs:    { type: Number, default: 0 },
  fat:      { type: Number, default: 0 },
});

export default FoodItemSchema;
