import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Recipe from "./pages/Recipe";
import CategoryList from "./pages/CategoryList"; // Import the new category list page
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoryList />} /> {/* New Route */}
        <Route path="/category/:type" element={<Category />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </>
  );
};

export default App;
