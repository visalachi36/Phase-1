import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "1000");

  // Update URL parameters when submitting
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query, category, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="clothing">Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
      </select>
      <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
