// JavaScript For Loop: Counting, Filtering Even Numbers, and Summation

let sumEvenNumbers = 0; // Counter variable to store sum of even numbers

console.log("Even numbers from 1 to 10:");

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) { // Check if number is even
        console.log(i); // Print even number
        sumEvenNumbers += i; // Add even number to sum
    }
}

// Print final sum of even numbers
console.log("Sum of even numbers from 1 to 10:", sumEvenNumbers);
