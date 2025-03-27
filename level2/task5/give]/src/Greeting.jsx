import React from 'react';

const Greeting = ({ name = "world", age = "Unknown", city = "Somewhere" }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
};

export default Greeting;
