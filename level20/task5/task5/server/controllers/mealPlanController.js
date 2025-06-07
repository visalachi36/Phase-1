import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';

// @desc    Get meal plans for user
// @route   GET /api/meal-plans
// @access  Private
export const getMealPlans = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { user: req.user.id };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const mealPlans = await MealPlan.find(query)
      .populate('recipe', 'title imageUrl prepTime cookTime')
      .sort({ date: 1, meal: 1 });

    res.json({
      success: true,
      data: { mealPlans }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching meal plans',
      error: error.message
    });
  }
};

// @desc    Create meal plan
// @route   POST /api/meal-plans
// @access  Private
export const createMealPlan = async (req, res) => {
  try {
    const { date, meal, recipe: recipeId, servings, notes } = req.body;

    // Check if recipe exists and user has access
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (recipe.author.toString() !== req.user.id && !recipe.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to use this recipe'
      });
    }

    // Check if meal plan already exists for this date and meal
    const existingPlan = await MealPlan.findOne({
      user: req.user.id,
      date: new Date(date),
      meal
    });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: 'Meal plan already exists for this date and meal type'
      });
    }

    const mealPlan = await MealPlan.create({
      user: req.user.id,
      date: new Date(date),
      meal,
      recipe: recipeId,
      servings,
      notes
    });

    await mealPlan.populate('recipe', 'title imageUrl prepTime cookTime');

    res.status(201).json({
      success: true,
      message: 'Meal plan created successfully',
      data: { mealPlan }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Meal plan already exists for this date and meal type'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error creating meal plan',
      error: error.message
    });
  }
};

// @desc    Update meal plan
// @route   PUT /api/meal-plans/:id
// @access  Private
export const updateMealPlan = async (req, res) => {
  try {
    let mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    // Check ownership
    if (mealPlan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this meal plan'
      });
    }

    mealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('recipe', 'title imageUrl prepTime cookTime');

    res.json({
      success: true,
      message: 'Meal plan updated successfully',
      data: { mealPlan }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating meal plan',
      error: error.message
    });
  }
};

// @desc    Delete meal plan
// @route   DELETE /api/meal-plans/:id
// @access  Private
export const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    // Check ownership
    if (mealPlan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this meal plan'
      });
    }

    await MealPlan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Meal plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting meal plan',
      error: error.message
    });
  }
};

// @desc    Mark meal as completed
// @route   PATCH /api/meal-plans/:id/complete
// @access  Private
export const completeMeal = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    // Check ownership
    if (mealPlan.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this meal plan'
      });
    }

    mealPlan.completed = !mealPlan.completed;
    await mealPlan.save();

    res.json({
      success: true,
      message: `Meal marked as ${mealPlan.completed ? 'completed' : 'incomplete'}`,
      data: { completed: mealPlan.completed }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating meal completion',
      error: error.message
    });
  }
};