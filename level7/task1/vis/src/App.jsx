// src/App.jsx
import React from "react";
import ToggleComponent from "./component/ToggleComponent";
import "./styles.css";

function App() {
    return (
        <div className="app-container">
            <h1>Custom Toggle Hook</h1>
            <ToggleComponent />
        </div>
    );
}

export default App;
