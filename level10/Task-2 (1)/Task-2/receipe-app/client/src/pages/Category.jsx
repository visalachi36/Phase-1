import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/category.css"; // Make sure to add styles

const Category = () => {
  const { type } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Allowed categories
  const allowedCategories = ["Italian", "American"];

  useEffect(() => {
    if (!allowedCategories.includes(type)) {
      setError("Invalid category selected.");
      setLoading(false);
      return;
    }

    const fetchRecipes = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing! Please check your .env file.");
        }

        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&number=5&apiKey=${apiKey}`
        );

        if (response.data.results.length === 0) {
          setError(`No recipes found for ${type}.`);
        } else {
          setRecipes(response.data.results);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [type]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">{type} Recipes</h1>

      {loading && <p className="text-center text-warning">Loading recipes...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <div className="row">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
