import React from "react";
import useFetch from "../hooks/useFetch";
import "../styles.css"; // Import the styles

const DataFetchComponent = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="container">
      <h2>Fetched Data</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <ul>
          {data.slice(0, 5).map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetchComponent;
