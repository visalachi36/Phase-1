// src/App.jsx
import React from "react";
import ColorBox from "./components/ColorBox";
import "./app.css"; // Import CSS file

const App = () => {
  const colors = [
    "red", "blue", "green", "orange", "purple", "pink", "yellow", "cyan",
    "magenta", "teal", "brown", "gold", "lime", "navy", "violet"
  ];

  return (
    <div className="container">
      {colors.map((color, index) => (
        <ColorBox key={index} color={color} />
      ))}
    </div>
  );
};

export default App;
