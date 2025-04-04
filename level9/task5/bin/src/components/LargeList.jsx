import React from "react";

// React.memo prevents unnecessary re-renders
const LargeList = React.memo(({ items }) => {
  console.log("LargeList Rendered"); // Check renders in console

  return (
    <div style={{ height: "300px", overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

// Optional: Custom comparison function for deep comparison
export default React.memo(LargeList, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
});
