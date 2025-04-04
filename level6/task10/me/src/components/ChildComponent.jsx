import { memo } from "react";

const ChildComponent = ({ handleClick }) => {
  console.log("ChildComponent re-rendered!");

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(ChildComponent);
