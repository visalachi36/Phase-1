import React from "react";
import TitleComponent from "./components/TitleComponent";
import "./styles.css"; // Import global styles

function App() {
  return (
    <div className="app-container">
      <h1>Custom Hook - useDocumentTitle Example</h1>
      <TitleComponent />
    </div>
  );
}

export default App;
