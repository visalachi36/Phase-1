import { useState, useCallback } from "react";
import ChildComponent from "./ChildComponent";
import "./../styles/ParentChild.css"; // Import CSS

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Memoized function using useCallback
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div className="parent-container">
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default ParentComponent;
