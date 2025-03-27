import React from 'react';

const Greeting = ({ name = "World" }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
};

export default Greeting;