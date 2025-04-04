import React from "react";
import useInput from "../hooks/useInput";

function InputComponent() {
  const input = useInput("");

  return (
    <div>
      <input
        type="text"
        {...input} // Spreads value, onChange, and ref
        placeholder="Type something..."
      />
      <p>Entered Text: {input.value}</p>
    </div>
  );
}

export default InputComponent;
