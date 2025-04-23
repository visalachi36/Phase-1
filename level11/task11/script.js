// Create an array of numbers from 1 to 10
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1️⃣ map(): Create a new array with each number squared
const squaredNumbers = numbers.map(num => num ** 2);
console.log("Squared Numbers:", squaredNumbers);

// 2️⃣ filter(): Create a new array with only odd numbers
const oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log("Odd Numbers:", oddNumbers);

// 3️⃣ reduce(): Calculate the sum of all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of all numbers:", sum);

// 4️⃣ forEach(): Print each number and its square root
console.log("Numbers and their square roots:");
numbers.forEach(num => {
    console.log(`Number: ${num}, Square Root: ${Math.sqrt(num).toFixed(2)}`);
});
