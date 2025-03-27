import React from "react";
import ComplexForm from "./ComplexForm";

const App = () => {
  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Complex Form with Validation</h2>
      <ComplexForm />
    </div>
  );
};

export default App;
