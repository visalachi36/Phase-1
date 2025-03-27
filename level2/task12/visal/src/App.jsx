import React from 'react';
import './App.css';

const App = ({ isLoggedIn }) => {
  return (
    <div>
      <h1 className="h1">{isLoggedIn ? "Welcome back!" : "can you log in"}</h1>
    </div>
  );
};


export default App;
