import express from 'express';
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  scaleRecipe,
  toggleFavorite
} from '../controllers/recipeController.js';
import { protect } from '../middleware/auth.js';
import { validateRecipe } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getRecipes)
  .post(validateRecipe, createRecipe);

router.route('/:id')
  .get(getRecipe)
  .put(validateRecipe, updateRecipe)
  .delete(deleteRecipe);

router.post('/:id/scale', scaleRecipe);
router.post('/:id/favorite', toggleFavorite);

export default router;