import { useState, useEffect } from "react";
import "./../styles/DataFetcher.css"; // Import CSS

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="data-container">
      <h2>API Data Fetching</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {data && (
        <div className="data-card">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Completed:</strong> {data.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;
