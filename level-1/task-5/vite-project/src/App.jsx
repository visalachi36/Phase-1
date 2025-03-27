import React from "react";
import "./style.css"; // Ensure the correct path

const Calculation = () => {
  const num1 = 25;
  const num2 = 10;
  const sum = num1 + num2;

  return (
    <div className="container">
      <h1>Simple Calculation</h1>
      <p>{num1} + {num2} = {sum}</p>
    </div>
  );
};

export default Calculation;
