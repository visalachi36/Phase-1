// 🌟 Recursive function to calculate factorial
function factorial(n) {
    // 🔴 Error handling for negative numbers
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    
    // 🟢 Base case: If n is 0 or 1, return 1
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // 🔄 Recursive case: n * factorial(n-1)
    return n * factorial(n - 1);
}

// 🌟 Testing the function with various inputs
const testNumbers = [5, 0, 1, 7, 3]; // Includes a negative number for error handling

testNumbers.forEach(num => {
    try {
        console.log(`Factorial of ${num}:`, factorial(num));
    } catch (error) {
        console.error(`Error for ${num}: ${error.message}`);
    }
});
