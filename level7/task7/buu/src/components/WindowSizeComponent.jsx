import React from "react";
import useWindowResize from "../hooks/useWindowResize";
import "../styles.css";

const WindowSizeComponent = () => {
  const { width, height } = useWindowResize();

  return (
    <div className="window-size-container">
      <h2>Window Size</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default WindowSizeComponent;
