import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Ingredient amount is required'],
    min: [0, 'Amount must be positive']
  },
  unit: {
    type: String,
    required: [true, 'Ingredient unit is required'],
    enum: ['cups', 'tbsp', 'tsp', 'oz', 'lbs', 'g', 'kg', 'ml', 'l', 'pieces', 'cloves', 'pinch']
  },
  notes: {
    type: String,
    trim: true
  }
});

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  sugar: Number,
  sodium: Number
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    enum: ['Italian', 'Thai', 'Mexican', 'Indian', 'Chinese', 'French', 'Japanese', 'Mediterranean', 'American', 'Other']
  },
  mealType: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
  },
  prepTime: {
    type: Number,
    required: [true, 'Prep time is required'],
    min: [0, 'Prep time must be positive']
  },
  cookTime: {
    type: Number,
    required: [true, 'Cook time is required'],
    min: [0, 'Cook time must be positive']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Must serve at least 1 person'],
    max: [50, 'Cannot serve more than 50 people']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  ingredients: {
    type: [ingredientSchema],
    required: [true, 'At least one ingredient is required'],
    validate: [arrayLimit, 'Must have at least one ingredient']
  },
  instructions: {
    type: [String],
    required: [true, 'Instructions are required'],
    validate: [arrayLimit, 'Must have at least one instruction step']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  nutrition: nutritionSchema,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

function arrayLimit(val) {
  return val.length > 0;
}

// Indexes for better query performance
recipeSchema.index({ author: 1, createdAt: -1 });
recipeSchema.index({ cuisine: 1, mealType: 1 });
recipeSchema.index({ tags: 1 });
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

export default mongoose.model('Recipe', recipeSchema);