// Function Declarations in JavaScript

// 1️⃣ Regular Function Declaration
function multiply(a, b) {
    return a * b;
}

// 2️⃣ Function Expression
const divide = function(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return a / b;
};

// 3️⃣ Arrow Function
const power = (base, exponent) => base ** exponent;

// Calling each function with different arguments and printing results
console.log("Multiply 6 * 3 =", multiply(6, 3));   // Output: 18
console.log("Divide 10 / 2 =", divide(10, 2));     // Output: 5
console.log("Divide 10 / 0 =", divide(10, 0));     // Output: Error message
console.log("Power 2 ^ 4 =", power(2, 4));         // Output: 16
