import React from "react";
import SearchForm from "../components/SearchForm";
import ProductList from "../components/ProductList";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  // Get search parameters from URL
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "1000";

  return (
    <div className="container">
      <h1>Advanced Search</h1>
      <SearchForm />
      <ProductList query={query} category={category} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default SearchPage;
