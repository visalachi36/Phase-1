export const scaleIngredients = (ingredients, originalServings, newServings) => {
  const scaleFactor = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    amount: Math.round((ingredient.amount * scaleFactor) * 100) / 100
  }));
};

export const consolidateIngredients = (ingredientsList) => {
  const consolidated = new Map();
  
  ingredientsList.forEach(ingredients => {
    ingredients.forEach(ingredient => {
      const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
      
      if (consolidated.has(key)) {
        const existing = consolidated.get(key);
        existing.amount += ingredient.amount;
        existing.recipes = [...new Set([...existing.recipes, ...ingredient.recipes])];
      } else {
        consolidated.set(key, {
          ingredient: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          recipes: ingredient.recipes || [],
          category: categorizeIngredient(ingredient.name)
        });
      }
    });
  });
  
  return Array.from(consolidated.values());
};

export const categorizeIngredient = (ingredientName) => {
  const name = ingredientName.toLowerCase();
  
  const categories = {
    'Meat & Seafood': ['chicken', 'beef', 'pork', 'fish', 'turkey', 'lamb', 'salmon', 'shrimp', 'bacon'],
    'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'parmesan', 'mozzarella', 'cheddar'],
    'Fruits': ['apple', 'banana', 'lemon', 'lime', 'orange', 'berry', 'grape', 'strawberry', 'blueberry'],
    'Vegetables': ['carrot', 'onion', 'garlic', 'tomato', 'potato', 'pepper', 'lettuce', 'spinach', 'broccoli'],
    'Grains & Bakery': ['bread', 'pasta', 'rice', 'flour', 'spaghetti', 'noodle', 'quinoa', 'oats'],
    'Pantry': ['oil', 'salt', 'pepper', 'sugar', 'spice', 'sauce', 'vinegar', 'honey', 'vanilla']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
};