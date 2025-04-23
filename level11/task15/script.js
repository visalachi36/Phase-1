// Function to perform division with error handling
function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("❌ Cannot divide by zero!"); // Custom error
    }
    return a / b;
}

// Testing the function with different values
const testCases = [
    { num1: 10, num2: 2 },  // Valid case: 10 ÷ 2
    { num1: 15, num2: 3 },  // Valid case: 15 ÷ 3
    { num1: 8, num2: 8 },   // Error case: division by zero
    { num1: 20, num2: 4 }   // Valid case: 20 ÷ 4
];

// Loop through test cases
testCases.forEach(({ num1, num2 }) => {
    try {
        let result = divideNumbers(num1, num2);
        console.log(`✅ ${num1} ÷ ${num2} = ${result}`);
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("🔄 Operation completed.\n"); // Runs regardless of success or failure
    }
});
