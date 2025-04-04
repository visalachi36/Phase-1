import React, { useState, useMemo, useCallback } from "react";
import PrimeCalculator from "./components/PrimeCalculator";
import Button from "./components/Button";

const App = () => {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(1000); // Default limit for prime numbers

  // Memoize expensive calculation
  const primeNumbers = useMemo(() => {
    console.log("Calculating prime numbers...");
    return findPrimes(limit);
  }, [limit]);

  // Memoized event handlers
  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const updateLimit = useCallback(() => setLimit(limit + 5000), [limit]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Optimized App with useMemo & useCallback</h1>
      <h2>Counter: {count}</h2>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <h3>Prime Numbers Up to: {limit}</h3>
      <Button onClick={updateLimit}>Increase Limit</Button>
      <PrimeCalculator primes={primeNumbers} />
    </div>
  );
};

// Function to find prime numbers (Expensive Calculation)
const findPrimes = (limit) => {
  let primes = [];
  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) primes.push(num);
  }
  return primes;
};

// Prime number checker
const isPrime = (num) => {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export default App;
