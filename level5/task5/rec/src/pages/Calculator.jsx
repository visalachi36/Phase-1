import React, { useState } from "react";
import Button from "../components/Button";
import Display from "../components/Display";
import "../styles/styles.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
      return;
    }

    if (value === "=") {
      try {
        const evalResult = eval(input);
        setResult(evalResult);
      } catch (error) {
        setResult("Error");
      }
      return;
    }

    setInput((prev) => prev + value);
  };

  return (
    <div className="calculator-container">
      <Display value={result || input || "0"} />
      <div className="button-grid">
        {["7", "8", "9", "/"].map((val) => (
          <Button key={val} value={val} onClick={handleClick} />
        ))}
        {["4", "5", "6", "*"].map((val) => (
          <Button key={val} value={val} onClick={handleClick} />
        ))}
        {["1", "2", "3", "-"].map((val) => (
          <Button key={val} value={val} onClick={handleClick} />
        ))}
        {["0", ".", "C", "+"].map((val) => (
          <Button key={val} value={val} onClick={handleClick} />
        ))}
        <Button value="=" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Calculator;
