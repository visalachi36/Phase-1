import React from "react";
import LocalStorageComponent from "./components/LocalStorageComponent";
import "./styles.css"; // Import CSS file

function App() {
  return (
    <div>
      <h1>Custom Hook: useLocalStorage</h1>
      <LocalStorageComponent />
    </div>
  );
}

export default App;
