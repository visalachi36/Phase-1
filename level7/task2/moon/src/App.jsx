// src/App.jsx
import React from "react";
import CounterComponent from "./components/CounterComponent";
import "./styles.css";

function App() {
    return (
        <div className="app-container">
            <h1>Custom Counter Hook Example</h1>
            <CounterComponent />
        </div>
    );
}

export default App;
