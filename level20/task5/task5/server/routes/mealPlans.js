import express from 'express';
import {
  getMealPlans,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
  completeMeal
} from '../controllers/mealPlanController.js';
import { protect } from '../middleware/auth.js';
import { validateMealPlan } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMealPlans)
  .post(validateMealPlan, createMealPlan);

router.route('/:id')
  .put(updateMealPlan)
  .delete(deleteMealPlan);

router.patch('/:id/complete', completeMeal);

export default router;