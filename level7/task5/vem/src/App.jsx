import React from "react";
import DataFetchComponent from "./components/DataFetchComponent";
import "./styles.css"; // Import global styles

function App() {
  return (
    <div className="app-container">
      <h1>Custom Hook - useFetch Example</h1>
      <DataFetchComponent />
    </div>
  );
}

export default App;
