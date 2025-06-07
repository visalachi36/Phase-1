import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  meal: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Must serve at least 1 person'],
    max: [20, 'Cannot serve more than 20 people']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [200, 'Notes cannot be more than 200 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
mealPlanSchema.index({ user: 1, date: 1, meal: 1 });
mealPlanSchema.index({ user: 1, date: 1 });

// Ensure unique meal plan per user, date, and meal type
mealPlanSchema.index({ user: 1, date: 1, meal: 1 }, { unique: true });

export default mongoose.model('MealPlan', mealPlanSchema);