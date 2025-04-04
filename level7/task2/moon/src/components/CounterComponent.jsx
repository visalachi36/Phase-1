// src/components/CounterComponent.jsx
import React from "react";
import useCounter from "../hooks/useCounter";
import "../styles.css";

function CounterComponent() {
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div className="counter-container">
            <h2>Counter: {count}</h2>
            <button onClick={increment} className="counter-button">Increment</button>
            <button onClick={decrement} className="counter-button">Decrement</button>
            <button onClick={reset} className="counter-button reset-button">Reset</button>
        </div>
    );
}

export default CounterComponent;
