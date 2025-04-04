import React, { useState, useCallback } from "react";

const Sidebar = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Sidebar Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default React.memo(Sidebar);
