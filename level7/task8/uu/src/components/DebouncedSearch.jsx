import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import "../styles.css";

const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  return (
    <div className="search-container">
      <h2>Debounced Search</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <p>Debounced Value: <strong>{debouncedSearchTerm}</strong></p>
    </div>
  );
};

export default DebouncedSearch;
