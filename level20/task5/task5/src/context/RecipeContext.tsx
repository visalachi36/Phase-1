import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Recipe, MealPlan, ShoppingItem } from '../types/Recipe';

interface RecipeState {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  searchQuery: string;
  selectedCuisine: string;
  selectedMealType: string;
  currentView: 'recipes' | 'create' | 'meal-plan' | 'shopping';
  shoppingList: ShoppingItem[];
}

type RecipeAction =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'UPDATE_RECIPE'; payload: Recipe }
  | { type: 'DELETE_RECIPE'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CUISINE_FILTER'; payload: string }
  | { type: 'SET_MEAL_TYPE_FILTER'; payload: string }
  | { type: 'SET_CURRENT_VIEW'; payload: RecipeState['currentView'] }
  | { type: 'ADD_MEAL_PLAN'; payload: MealPlan }
  | { type: 'REMOVE_MEAL_PLAN'; payload: string }
  | { type: 'GENERATE_SHOPPING_LIST' };

const initialState: RecipeState = {
  recipes: [
    {
      id: '1',
      title: 'Classic Spaghetti Carbonara',
      description: 'A creamy Roman pasta dish with eggs, cheese, and pancetta',
      cuisine: 'Italian',
      mealType: 'Dinner',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        { id: '1', name: 'Spaghetti', amount: 400, unit: 'g' },
        { id: '2', name: 'Eggs', amount: 4, unit: 'pieces' },
        { id: '3', name: 'Pancetta', amount: 150, unit: 'g' },
        { id: '4', name: 'Parmesan cheese', amount: 100, unit: 'g' },
        { id: '5', name: 'Black pepper', amount: 1, unit: 'tsp' }
      ],
      instructions: [
        'Boil water for pasta and cook spaghetti according to package directions',
        'While pasta cooks, dice pancetta and cook in a large pan until crispy',
        'Beat eggs with grated Parmesan and black pepper in a bowl',
        'Drain pasta, reserving 1 cup pasta water',
        'Add hot pasta to pancetta pan, remove from heat',
        'Quickly stir in egg mixture, adding pasta water as needed to create creamy sauce',
        'Serve immediately with extra Parmesan and black pepper'
      ],
      tags: ['pasta', 'italian', 'quick', 'comfort food'],
      createdAt: new Date(),
      imageUrl: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg'
    },
    {
      id: '2',
      title: 'Thai Green Curry',
      description: 'Aromatic and spicy curry with coconut milk and vegetables',
      cuisine: 'Thai',
      mealType: 'Dinner',
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        { id: '1', name: 'Green curry paste', amount: 3, unit: 'tbsp' },
        { id: '2', name: 'Coconut milk', amount: 400, unit: 'ml' },
        { id: '3', name: 'Chicken breast', amount: 500, unit: 'g' },
        { id: '4', name: 'Thai eggplant', amount: 200, unit: 'g' },
        { id: '5', name: 'Fish sauce', amount: 2, unit: 'tbsp' },
        { id: '6', name: 'Palm sugar', amount: 1, unit: 'tbsp' },
        { id: '7', name: 'Thai basil', amount: 20, unit: 'g' }
      ],
      instructions: [
        'Heat oil in a wok and fry curry paste for 2 minutes until fragrant',
        'Add thick coconut milk and simmer until oil separates',
        'Add sliced chicken and cook until almost done',
        'Add remaining coconut milk, eggplant, fish sauce, and palm sugar',
        'Simmer for 10-15 minutes until vegetables are tender',
        'Stir in Thai basil leaves and serve with jasmine rice'
      ],
      tags: ['curry', 'thai', 'spicy', 'coconut'],
      createdAt: new Date(),
      imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg'
    }
  ],
  mealPlans: [],
  searchQuery: '',
  selectedCuisine: '',
  selectedMealType: '',
  currentView: 'recipes',
  shoppingList: []
};

const RecipeContext = createContext<{
  state: RecipeState;
  dispatch: React.Dispatch<RecipeAction>;
} | null>(null);

function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case 'UPDATE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? action.payload : recipe
        )
      };
    case 'DELETE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_CUISINE_FILTER':
      return {
        ...state,
        selectedCuisine: action.payload
      };
    case 'SET_MEAL_TYPE_FILTER':
      return {
        ...state,
        selectedMealType: action.payload
      };
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload
      };
    case 'ADD_MEAL_PLAN':
      return {
        ...state,
        mealPlans: [...state.mealPlans, action.payload]
      };
    case 'REMOVE_MEAL_PLAN':
      return {
        ...state,
        mealPlans: state.mealPlans.filter(plan => plan.id !== action.payload)
      };
    case 'GENERATE_SHOPPING_LIST':
      const shoppingMap = new Map<string, ShoppingItem>();
      
      state.mealPlans.forEach(plan => {
        const recipe = state.recipes.find(r => r.id === plan.recipeId);
        if (recipe) {
          const scaleFactor = plan.servings / recipe.servings;
          recipe.ingredients.forEach(ingredient => {
            const key = `${ingredient.name}-${ingredient.unit}`;
            const existing = shoppingMap.get(key);
            const scaledAmount = ingredient.amount * scaleFactor;
            
            if (existing) {
              existing.amount += scaledAmount;
              existing.recipes.push(recipe.title);
            } else {
              shoppingMap.set(key, {
                ingredient: ingredient.name,
                amount: scaledAmount,
                unit: ingredient.unit,
                recipes: [recipe.title]
              });
            }
          });
        }
      });
      
      return {
        ...state,
        shoppingList: Array.from(shoppingMap.values())
      };
    default:
      return state;
  }
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}