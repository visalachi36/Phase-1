import express from 'express';
import {
  getShoppingLists,
  getShoppingList,
  generateShoppingList,
  updateShoppingList,
  deleteShoppingList,
  toggleItemPurchased
} from '../controllers/shoppingListController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getShoppingLists);

router.post('/generate', generateShoppingList);

router.route('/:id')
  .get(getShoppingList)
  .put(updateShoppingList)
  .delete(deleteShoppingList);

router.patch('/:id/items/:itemId/toggle', toggleItemPurchased);

export default router;