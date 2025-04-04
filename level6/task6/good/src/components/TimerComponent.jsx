import { useEffect, useState } from "react";
import "./../styles/TimerComponent.css"; // Import CSS

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Timer started");

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      console.log(`Timer running: ${seconds + 1} seconds`);
    }, 1000);

    // Cleanup function to stop the timer when unmounting
    return () => {
      clearInterval(interval);
      console.log("Timer stopped");
    };
  }, []);

  return (
    <div className="timer-container">
      <h2>Timer Running: {seconds} seconds</h2>
      <p>Check the console to see logs.</p>
    </div>
  );
};

export default TimerComponent;
