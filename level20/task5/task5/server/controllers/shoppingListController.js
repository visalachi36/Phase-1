import ShoppingList from '../models/ShoppingList.js';
import MealPlan from '../models/MealPlan.js';
import Recipe from '../models/Recipe.js';
import { consolidateIngredients, scaleIngredients, categorizeIngredient } from '../utils/ingredientScaler.js';

// @desc    Get shopping lists for user
// @route   GET /api/shopping-lists
// @access  Private
export const getShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { shoppingLists }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching shopping lists',
      error: error.message
    });
  }
};

// @desc    Get single shopping list
// @route   GET /api/shopping-lists/:id
// @access  Private
export const getShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (shoppingList.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this shopping list'
      });
    }

    res.json({
      success: true,
      data: { shoppingList }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching shopping list',
      error: error.message
    });
  }
};

// @desc    Generate shopping list from meal plans
// @route   POST /api/shopping-lists/generate
// @access  Private
export const generateShoppingList = async (req, res) => {
  try {
    const { startDate, endDate, name } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    // Get meal plans for the date range
    const mealPlans = await MealPlan.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('recipe');

    if (mealPlans.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No meal plans found for the specified date range'
      });
    }

    // Collect all ingredients with scaling
    const allIngredients = [];
    
    mealPlans.forEach(plan => {
      const scaledIngredients = scaleIngredients(
        plan.recipe.ingredients,
        plan.recipe.servings,
        plan.servings
      );
      
      const ingredientsWithRecipe = scaledIngredients.map(ing => ({
        ...ing,
        recipes: [plan.recipe.title]
      }));
      
      allIngredients.push(ingredientsWithRecipe);
    });

    // Consolidate ingredients
    const consolidatedIngredients = consolidateIngredients(allIngredients);

    // Create shopping list items with categories
    const items = consolidatedIngredients.map(item => ({
      ingredient: item.ingredient,
      amount: Math.round(item.amount * 100) / 100,
      unit: item.unit,
      category: categorizeIngredient(item.ingredient),
      recipes: item.recipes,
      purchased: false
    }));

    // Create shopping list
    const shoppingList = await ShoppingList.create({
      user: req.user.id,
      name: name || `Shopping List - ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`,
      items,
      dateRange: {
        start: new Date(startDate),
        end: new Date(endDate)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Shopping list generated successfully',
      data: { shoppingList }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error generating shopping list',
      error: error.message
    });
  }
};

// @desc    Update shopping list
// @route   PUT /api/shopping-lists/:id
// @access  Private
export const updateShoppingList = async (req, res) => {
  try {
    let shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (shoppingList.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this shopping list'
      });
    }

    shoppingList = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Shopping list updated successfully',
      data: { shoppingList }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating shopping list',
      error: error.message
    });
  }
};

// @desc    Delete shopping list
// @route   DELETE /api/shopping-lists/:id
// @access  Private
export const deleteShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (shoppingList.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this shopping list'
      });
    }

    await ShoppingList.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Shopping list deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting shopping list',
      error: error.message
    });
  }
};

// @desc    Toggle item purchased status
// @route   PATCH /api/shopping-lists/:id/items/:itemId/toggle
// @access  Private
export const toggleItemPurchased = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    
    const shoppingList = await ShoppingList.findById(id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Check ownership
    if (shoppingList.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this shopping list'
      });
    }

    const item = shoppingList.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list item not found'
      });
    }

    item.purchased = !item.purchased;
    await shoppingList.save();

    res.json({
      success: true,
      message: `Item marked as ${item.purchased ? 'purchased' : 'not purchased'}`,
      data: { purchased: item.purchased }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating item status',
      error: error.message
    });
  }
};