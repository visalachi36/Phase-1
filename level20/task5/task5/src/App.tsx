import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecipeProvider, useRecipes } from './context/RecipeContext';
import { Header } from './components/Header';
import { RecipeList } from './components/RecipeList';
import { RecipeForm } from './components/RecipeForm';
import { MealPlan } from './components/MealPlan';
import { ShoppingList } from './components/ShoppingList';

function AppContent() {
  const { state } = useRecipes();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'recipes':
        return <RecipeList />;
      case 'create':
        return <RecipeForm />;
      case 'meal-plan':
        return <MealPlan />;
      case 'shopping':
        return <ShoppingList />;
      default:
        return <RecipeList />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecipeProvider>
        <AppContent />
      </RecipeProvider>
    </DndProvider>
  );
}

export default App;