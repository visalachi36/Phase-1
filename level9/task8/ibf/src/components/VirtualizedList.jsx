import React from "react";
import { FixedSizeList as List } from "react-window";
import "../styles.css";


const itemCount = 100; // Total number of items
const itemHeight = 50;   // Each item's height

const VirtualizedList = () => {
  // Function to render each row (only visible ones)
  const Row = ({ index, style }) => (
    <div style={{ ...style, padding: "10px", borderBottom: "1px solid #ddd", background: index % 2 ? "#f9f9f9" : "#fff" }}>
      Item #{index + 1}
    </div>
  );

  return (
    <div className="list-container">
      <List
        height={500} // The viewport height
        itemCount={itemCount} // Total number of items
        itemSize={itemHeight} // Height per item
        width={400} // List width
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedList;
