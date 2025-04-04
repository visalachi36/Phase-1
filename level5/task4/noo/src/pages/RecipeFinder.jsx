import React, { useState } from "react";
import RecipeList from "../components/RecipeList";
import recipes from "../data/recipes";
import "../styles/styles.css";

const RecipeFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default RecipeFinder;
