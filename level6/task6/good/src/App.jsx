import { useState } from "react";
import TimerComponent from "./components/TimerComponent";
import "./styles.css"; // Import global styles

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Stop Timer" : "Start Timer"}
      </button>
      {showTimer && <TimerComponent />}
    </div>
  );
}

export default App;
