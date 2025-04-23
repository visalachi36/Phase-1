// JavaScript Array Operations

// Step 1: Create an array of favorite foods
let favoriteFoods = ["Pizza", "Burger", "Sushi", "Pasta", "Ice Cream"];

console.log("Original Array:", favoriteFoods);

// Step 2: Add an item to the end
favoriteFoods.push("Tacos");
console.log("After Adding 'Tacos':", favoriteFoods);

// Step 3: Remove the first item
favoriteFoods.shift();
console.log("After Removing First Item:", favoriteFoods);

// Step 4: Find the length of the array
console.log("Array Length:", favoriteFoods.length);

// Step 5: Find the position of a specific food (e.g., "Pasta")
let position = favoriteFoods.indexOf("Pasta");
console.log("Position of 'Pasta':", position);

// Step 6: Slice the array from index 1 to 3
let slicedArray = favoriteFoods.slice(1, 4);
console.log("Sliced Array (Index 1 to 3):", slicedArray);
