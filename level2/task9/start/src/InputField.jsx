import { useState } from "react";
import PropTypes from "prop-types";

const InputField = ({ placeholder }) => {
  const [text, setText] = useState("");

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-2 text-gray-700">You typed: {text}</p>
    </div>
  );
};

// 🔹 PropTypes for validation
InputField.propTypes = {
  placeholder: PropTypes.string,
};

// 🔹 Default Props
InputField.defaultProps = {
  placeholder: "Type something...",
};

export default InputField;
