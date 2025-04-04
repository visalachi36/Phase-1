import { useState } from "react";
import "./Counter.css"; // Import Global CSS

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <div className="counter-box">
        <h1 className="counter-heading">Counter: {count}</h1>
        <div className="button-container">
          <button onClick={() => setCount(count + 1)} className="button increment">
            Increment
          </button>
          <button onClick={() => setCount(count - 1)} className="button decrement">
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
