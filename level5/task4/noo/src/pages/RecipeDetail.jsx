import React from "react";
import { useParams, Link } from "react-router-dom";
import recipes from "../data/recipes";
import "../styles/styles.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <div className="container">
      <h1>{recipe.title}</h1>
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img-large" />
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <Link to="/" className="back-btn">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetail;
