import React from "react";
import VirtualizedList from "./components/VirtualizedList";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Virtual Scrolling List</h2>
      <VirtualizedList />
    </div>
  );
};

export default App;
