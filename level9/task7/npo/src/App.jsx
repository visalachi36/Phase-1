import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <div>
      <nav className="navbar">
        <h2>Product Search</h2>
        <Link to="/search">Go to Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome! Click above to search.</h1>} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
