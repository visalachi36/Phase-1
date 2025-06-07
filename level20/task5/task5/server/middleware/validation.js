import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

export const validateRecipe = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('cuisine')
    .isIn(['Italian', 'Thai', 'Mexican', 'Indian', 'Chinese', 'French', 'Japanese', 'Mediterranean', 'American', 'Other'])
    .withMessage('Invalid cuisine type'),
  body('mealType')
    .isIn(['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'])
    .withMessage('Invalid meal type'),
  body('prepTime')
    .isInt({ min: 0 })
    .withMessage('Prep time must be a positive number'),
  body('cookTime')
    .isInt({ min: 0 })
    .withMessage('Cook time must be a positive number'),
  body('servings')
    .isInt({ min: 1, max: 50 })
    .withMessage('Servings must be between 1 and 50'),
  body('difficulty')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Invalid difficulty level'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('At least one ingredient is required'),
  body('instructions')
    .isArray({ min: 1 })
    .withMessage('At least one instruction is required'),
  handleValidationErrors
];

export const validateMealPlan = [
  body('date')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('meal')
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid meal type'),
  body('recipe')
    .isMongoId()
    .withMessage('Invalid recipe ID'),
  body('servings')
    .isInt({ min: 1, max: 20 })
    .withMessage('Servings must be between 1 and 20'),
  handleValidationErrors
];