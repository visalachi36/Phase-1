import React, { useState, useEffect } from "react";
import LargeList from "./components/LargeList";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(generateData(10)); // Simulated list data

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // Updates every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <LargeList items={data} />
    </div>
  );
};

// Generates an array of 1000 items
function generateData(size) {
  return Array.from({ length: size }, (_, i) => `Item ${i + 1}`);
}

export default App;
