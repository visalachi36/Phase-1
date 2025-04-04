import React from "react";
import "../styles/styles.css";

const Button = ({ value, onClick }) => {
  return (
    <button className="calc-button" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
