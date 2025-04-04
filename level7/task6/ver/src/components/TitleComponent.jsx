import React, { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

function TitleComponent() {
  const [count, setCount] = useState(0);

  // Use custom hook to update document title
  useDocumentTitle(`Count: ${count}`);

  return (
    <div className="title-container">
      <h2>Dynamic Document Title</h2>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default TitleComponent;
