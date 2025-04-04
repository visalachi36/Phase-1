import React from "react";
import { Link } from "react-router-dom";
import "../styles/categorylist.css"; // Create a CSS file for styling

const CategoryList = () => {
  const categories = ["Italian", "American"];

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Choose a Category</h1>
      <div className="row">
        {categories.map((category) => (
          <div key={category} className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">{category} Cuisine</h5>
                <Link to={`/category/${category}`} className="btn btn-primary">
                  View Recipes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
