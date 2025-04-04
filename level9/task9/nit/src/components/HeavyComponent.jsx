import React from "react";

const HeavyComponent = () => {
  return <div>I'm a heavy component!</div>;
};

export default React.memo(HeavyComponent);
