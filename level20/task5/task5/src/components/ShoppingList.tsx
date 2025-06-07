import React from 'react';
import { ShoppingCart, Printer, Download } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export function ShoppingList() {
  const { state } = useRecipes();

  const printList = () => {
    const printContent = document.getElementById('shopping-list-content');
    if (printContent) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Shopping List - RecipeBox</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #ea580c; margin-bottom: 20px; }
                .item { margin: 10px 0; padding: 8px; border-bottom: 1px solid #eee; }
                .amount { font-weight: bold; }
                .recipes { font-size: 0.9em; color: #666; margin-top: 4px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
      }
    }
  };

  const downloadList = () => {
    const listText = state.shoppingList.map(item => 
      `${item.amount} ${item.unit} ${item.ingredient} (for: ${item.recipes.join(', ')})`
    ).join('\n');

    const blob = new Blob([
      `Shopping List - Generated from RecipeBox\n`,
      `Generated on: ${new Date().toLocaleDateString()}\n\n`,
      listText
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const groupedItems = state.shoppingList.reduce((acc, item) => {
    const category = getCategoryForIngredient(item.ingredient);
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof state.shoppingList>);

  function getCategoryForIngredient(ingredient: string): string {
    const lower = ingredient.toLowerCase();
    
    if (['chicken', 'beef', 'pork', 'fish', 'turkey', 'lamb', 'pancetta'].some(meat => lower.includes(meat))) {
      return 'Meat & Seafood';
    }
    if (['milk', 'cheese', 'yogurt', 'butter', 'cream', 'parmesan'].some(dairy => lower.includes(dairy))) {
      return 'Dairy';
    }
    if (['apple', 'banana', 'lemon', 'lime', 'orange', 'berry', 'grape'].some(fruit => lower.includes(fruit))) {
      return 'Fruits';
    }
    if (['carrot', 'onion', 'garlic', 'tomato', 'potato', 'pepper', 'lettuce', 'spinach', 'eggplant', 'basil'].some(veg => lower.includes(veg))) {
      return 'Vegetables';
    }
    if (['bread', 'pasta', 'rice', 'flour', 'spaghetti', 'noodle'].some(grain => lower.includes(grain))) {
      return 'Grains & Bakery';
    }
    if (['oil', 'salt', 'pepper', 'sugar', 'spice', 'sauce', 'paste', 'vinegar'].some(pantry => lower.includes(pantry))) {
      return 'Pantry';
    }
    
    return 'Other';
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-green-600" />
            Shopping List
          </h2>
          
          <div className="flex gap-3">
            <button
              onClick={printList}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={downloadList}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div id="shopping-list-content">
          <h1 style={{ display: 'none' }}>Shopping List</h1>
          
          {state.shoppingList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items in shopping list</h3>
              <p className="text-gray-500">
                Add some recipes to your meal plan and generate a shopping list
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  Generated from your meal plan • {state.shoppingList.length} items • 
                  For {new Set(state.shoppingList.flatMap(item => item.recipes)).size} recipes
                </p>
              </div>

              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    {category}
                  </h3>
                  <div className="grid gap-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                            />
                            <span className="font-medium text-gray-900">
                              {Math.round(item.amount * 100) / 100} {item.unit} {item.ingredient}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1 ml-7">
                            For: {item.recipes.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}