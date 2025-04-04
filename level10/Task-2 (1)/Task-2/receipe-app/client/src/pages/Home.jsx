import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch random recipes on load
  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?number=6&apiKey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then((response) => setRecipes(response.data.recipes))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-success">Welcome to Food World!</h1>
      <p className="text-center">
        Explore Tasty food!
      </p>

      <h2 className="text-center mt-4"> Meet & Eat</h2>
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
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
                  Try and Taste
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
