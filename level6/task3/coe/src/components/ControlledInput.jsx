import { useState } from "react";
import "./../styles/ControlledInput.css"; // Importing CSS

const ControlledInput = () => {
  // State to manage input value
  const [inputValue, setInputValue] = useState("");

  // Handler to update state on input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
        className="input-box"
      />
      <p className="output-text">You typed: {inputValue}</p>
    </div>
  );
};

export default ControlledInput;
