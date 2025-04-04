import React from "react";
import "../styles/OptimizedList.css";

const OptimizedList = () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="list-container">
      {items.slice(0, 20).map((item, index) => (
        <div key={index} className="list-item">{item}</div>
      ))}
    </div>
  );
};

export default OptimizedList;
