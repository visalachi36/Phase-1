import React from "react";

const HeavyComponent = () => {
  return (
    <div>
      <h3>This is a heavy component loaded lazily!</h3>
      <p>It loads only when needed to improve performance.</p>
    </div>
  );
};

export default HeavyComponent;
