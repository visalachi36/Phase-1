import React from 'react';
import { ChefHat, BookOpen, Calendar, ShoppingCart, Plus } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export function Header() {
  const { state, dispatch } = useRecipes();

  const navItems = [
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'create', label: 'Create Recipe', icon: Plus },
    { id: 'meal-plan', label: 'Meal Plan', icon: Calendar },
    { id: 'shopping', label: 'Shopping List', icon: ShoppingCart }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RecipeBox</h1>
              <p className="text-sm text-gray-500">Your Personal Recipe Manager</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = state.currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: item.id as any })}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-100 text-orange-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}