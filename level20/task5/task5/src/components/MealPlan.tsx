import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Users } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { MealPlan as MealPlanType } from '../types/Recipe';

export function MealPlan() {
  const { state, dispatch } = useRecipes();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [servings, setServings] = useState(4);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return weekDays.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date.toISOString().split('T')[0];
    });
  };

  const weekDates = getWeekDates();

  const addMealPlan = () => {
    if (!selectedDate || !selectedRecipe) {
      alert('Please select a date and recipe');
      return;
    }

    const recipe = state.recipes.find(r => r.id === selectedRecipe);
    if (!recipe) return;

    const newMealPlan: MealPlanType = {
      id: Date.now().toString(),
      date: selectedDate,
      meal: selectedMeal,
      recipeId: selectedRecipe,
      recipe,
      servings
    };

    dispatch({ type: 'ADD_MEAL_PLAN', payload: newMealPlan });
    setSelectedDate('');
    setSelectedRecipe('');
  };

  const removeMealPlan = (id: string) => {
    dispatch({ type: 'REMOVE_MEAL_PLAN', payload: id });
  };

  const getMealPlansForDate = (date: string, meal: string) => {
    return state.mealPlans.filter(plan => plan.date === date && plan.meal === meal);
  };

  const generateShoppingList = () => {
    dispatch({ type: 'GENERATE_SHOPPING_LIST' });
    dispatch({ type: 'SET_CURRENT_VIEW', payload: 'shopping' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-orange-600" />
          Weekly Meal Plan
        </h2>

        {/* Add Meal Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meal</label>
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              {mealTypes.map(meal => (
                <option key={meal} value={meal}>
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe</label>
            <select
              value={selectedRecipe}
              onChange={(e) => setSelectedRecipe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="">Select a recipe</option>
              {state.recipes.map(recipe => (
                <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={addMealPlan}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 gap-2">
              {/* Header */}
              <div className="p-3 text-center font-medium text-gray-700">Meal</div>
              {weekDays.map((day, index) => (
                <div key={day} className="p-3 text-center font-medium text-gray-700">
                  <div>{day}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(weekDates[index]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}

              {/* Meal Rows */}
              {mealTypes.map(meal => (
                <React.Fragment key={meal}>
                  <div className="p-3 font-medium text-gray-700 bg-gray-50 rounded-lg capitalize flex items-center">
                    {meal}
                  </div>
                  {weekDates.map(date => (
                    <div key={`${meal}-${date}`} className="p-2 min-h-[100px] border border-gray-200 rounded-lg">
                      {getMealPlansForDate(date, meal).map(plan => (
                        <div
                          key={plan.id}
                          className="bg-orange-100 text-orange-800 p-2 rounded-lg mb-2 text-sm group relative"
                        >
                          <div className="font-medium line-clamp-2">{plan.recipe.title}</div>
                          <div className="text-xs flex items-center gap-1 mt-1">
                            <Users className="w-3 h-3" />
                            {plan.servings} servings
                          </div>
                          <button
                            onClick={() => removeMealPlan(plan.id)}
                            className="absolute top-1 right-1 p-1 text-orange-600 hover:bg-orange-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {state.mealPlans.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <button
              onClick={generateShoppingList}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Generate Shopping List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}