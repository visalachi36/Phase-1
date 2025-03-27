// src/components/ColorBox.jsx
import React from "react";
import "../app.css"; // Import styles

const ColorBox = ({ color }) => {
  return (
    <div className="color-box" style={{ backgroundColor: color || "gray" }}>
      {color}
    </div>
  );
};

export default ColorBox;
