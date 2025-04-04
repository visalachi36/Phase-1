import React from "react";

// Memoized button to prevent unnecessary re-renders
const Button = React.memo(({ onClick, children }) => {
  console.log(`Button Rendered: ${children}`);
  return <button onClick={onClick} style={{ margin: "5px", padding: "10px" }}>{children}</button>;
});

export default Button;
