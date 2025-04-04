import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-img" />
      <h3><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3>
    </div>
  );
};

export default RecipeCard;
