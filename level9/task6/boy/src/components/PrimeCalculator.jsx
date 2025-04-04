import React from "react";

// Memoized component to avoid unnecessary renders
const PrimeCalculator = React.memo(({ primes }) => {
  console.log("PrimeCalculator Rendered");

  return (
    <div style={{ height: "200px", overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
      <ul>
        {primes.map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
    </div>
  );
});

export default PrimeCalculator;
