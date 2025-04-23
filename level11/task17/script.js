// 🌟 Using the Spread Operator with Arrays

// Creating two arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

// Combining arrays using the spread operator
const combinedArray = [...array1, ...array2];
console.log("Combined Array:", combinedArray);

// Creating a copy of an array and modifying it
const copiedArray = [...array1];
copiedArray.push(99);
console.log("Original Array:", array1);
console.log("Modified Copy:", copiedArray);


// 🌟 Using the Spread Operator with Objects

// Creating two objects
const object1 = { name: "Alice", age: 25 };
const object2 = { city: "New York", country: "USA" };

// Combining objects using the spread operator
const combinedObject = { ...object1, ...object2 };
console.log("Combined Object:", combinedObject);

// Creating a copy of an object and modifying it
const copiedObject = { ...object1 };
copiedObject.age = 30; // Modifying the copy
console.log("Original Object:", object1);
console.log("Modified Copy:", copiedObject);
