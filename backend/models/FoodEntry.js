import mongoose from 'mongoose';

const FoodEntrySchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietPlannerState',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
  },
  { timestamps: true }
);

FoodEntrySchema.index({ stateId: 1, name: 1 }, { unique: true });

const FoodEntry = mongoose.model('FoodEntry', FoodEntrySchema);

export default FoodEntry;
