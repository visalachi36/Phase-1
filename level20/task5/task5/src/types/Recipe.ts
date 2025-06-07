export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  mealType: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  createdAt: Date;
  imageUrl?: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: string;
  recipe: Recipe;
  servings: number;
}

export interface ShoppingItem {
  ingredient: string;
  amount: number;
  unit: string;
  recipes: string[];
}