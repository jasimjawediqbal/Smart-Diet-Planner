import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  bmi:          { type: String },
  bmr:          { type: Number },
  tdee:         { type: Number },
  goalCalories: { type: Number },
  goalLabel:    { type: String },
});

export default ResultSchema;
