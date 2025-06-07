import React from 'react';
import { RecipeCard } from './RecipeCard';
import { SearchAndFilter } from './SearchAndFilter';
import { useRecipes } from '../context/RecipeContext';

export function RecipeList() {
  const { state } = useRecipes();

  const filteredRecipes = state.recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.name.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()));
    
    const matchesCuisine = !state.selectedCuisine || recipe.cuisine === state.selectedCuisine;
    const matchesMealType = !state.selectedMealType || recipe.mealType === state.selectedMealType;
    
    return matchesSearch && matchesCuisine && matchesMealType;
  });

  return (
    <div className="space-y-6">
      <SearchAndFilter />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Recipes
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''})
          </span>
        </h2>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500">
            {state.searchQuery || state.selectedCuisine || state.selectedMealType
              ? 'Try adjusting your search or filters'
              : 'Create your first recipe to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}