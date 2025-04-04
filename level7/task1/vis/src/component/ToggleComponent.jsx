// src/components/ToggleComponent.jsx
import React from "react";
import useToggle from "../hooks/useToggle";
import "../styles.css";

function ToggleComponent() {
    const [isVisible, toggle] = useToggle(false);

    return (
        <div className="toggle-container">
            <button onClick={toggle} className="toggle-button">
                {isVisible ? "Hide Content" : "Show Content"}
            </button>
            {isVisible && <p className="toggle-content">Kaviya is Gay!</p>}
        </div>
    );
}

export default ToggleComponent;
