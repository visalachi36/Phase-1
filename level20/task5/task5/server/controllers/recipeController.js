import Recipe from '../models/Recipe.js';
import { scaleIngredients } from '../utils/ingredientScaler.js';

// @desc    Get all recipes for user
// @route   GET /api/recipes
// @access  Private
export const getRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 10, cuisine, mealType, difficulty, search } = req.query;
    
    const query = { author: req.user.id };
    
    // Add filters
    if (cuisine) query.cuisine = cuisine;
    if (mealType) query.mealType = mealType;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Recipe.countDocuments(query);

    res.json({
      success: true,
      data: {
        recipes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching recipes',
      error: error.message
    });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Private
export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check if user owns recipe or recipe is public
    if (recipe.author._id.toString() !== req.user.id && !recipe.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this recipe'
      });
    }

    res.json({
      success: true,
      data: { recipe }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching recipe',
      error: error.message
    });
  }
};

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req, res) => {
  try {
    req.body.author = req.user.id;
    
    const recipe = await Recipe.create(req.body);
    await recipe.populate('author', 'name');

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: { recipe }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating recipe',
      error: error.message
    });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name');

    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: { recipe }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating recipe',
      error: error.message
    });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting recipe',
      error: error.message
    });
  }
};

// @desc    Scale recipe ingredients
// @route   POST /api/recipes/:id/scale
// @access  Private
export const scaleRecipe = async (req, res) => {
  try {
    const { servings } = req.body;
    
    if (!servings || servings < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid serving size is required'
      });
    }

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const scaledIngredients = scaleIngredients(recipe.ingredients, recipe.servings, servings);

    res.json({
      success: true,
      data: {
        originalServings: recipe.servings,
        newServings: servings,
        scaledIngredients
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error scaling recipe',
      error: error.message
    });
  }
};

// @desc    Toggle recipe favorite
// @route   POST /api/recipes/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const isFavorited = recipe.favorites.includes(req.user.id);

    if (isFavorited) {
      recipe.favorites = recipe.favorites.filter(id => id.toString() !== req.user.id);
    } else {
      recipe.favorites.push(req.user.id);
    }

    await recipe.save();

    res.json({
      success: true,
      message: isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites',
      data: { isFavorited: !isFavorited }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error toggling favorite',
      error: error.message
    });
  }
};