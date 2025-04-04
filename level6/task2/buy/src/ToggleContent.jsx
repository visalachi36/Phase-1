import { useState } from "react";

const ToggleContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isVisible ? "Hide Content" : "Touch Me"}
      </button>

      {isVisible && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <p>Hiii i'm visal.</p>
        </div>
      )}
    </div>
  );
};

export default ToggleContent;
