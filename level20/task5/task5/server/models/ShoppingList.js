import mongoose from 'mongoose';

const shoppingItemSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required']
  },
  category: {
    type: String,
    enum: ['Meat & Seafood', 'Dairy', 'Fruits', 'Vegetables', 'Grains & Bakery', 'Pantry', 'Other'],
    default: 'Other'
  },
  recipes: [{
    type: String,
    required: true
  }],
  purchased: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  }
});

const shoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Shopping list name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  items: [shoppingItemSchema],
  dateRange: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  totalEstimatedCost: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
shoppingListSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('ShoppingList', shoppingListSchema);