// 3x3 Multiplication Table using Nested Loops
console.log("3x3 Multiplication Table:");
console.log("-------------------------");

// Outer loop iterates from 1 to 3 (rows)
for (let i = 1; i <= 3; i++) {
    let row = ""; // Initialize an empty string for each row

    // Inner loop iterates from 1 to 3 (columns)
    for (let j = 1; j <= 3; j++) {
        let product = i * j; // Calculate the product
        row += product.toString().padStart(4, " "); // Format spacing
    }

    console.log(row); // Print each row
}

console.log("-------------------------");
