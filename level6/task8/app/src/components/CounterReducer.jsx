import { useReducer } from "react";
import "./../styles/CounterReducer.css"; // Import CSS

// Reducer function to handle counter actions
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

const CounterReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="counter-container">
      <h2>Counter: {state.count}</h2>
      <div className="button-group">
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>
    </div>
  );
};

export default CounterReducer;
