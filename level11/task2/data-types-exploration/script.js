// JavaScript Data Types Exploration

// Declaring variables of different data types
let myString = "Hello, JavaScript!"; // String
let myNumber = 42; // Number
let myBoolean = true; // Boolean
let myNull = null; // Null
let myUndefined; // Undefined (default value if not assigned)
let myObject = { name: "Alice", age: 25 }; // Object

// Using typeof operator to check the data types
console.log("Type of myString:", typeof myString); // "string"
console.log("Type of myNumber:", typeof myNumber); // "number"
console.log("Type of myBoolean:", typeof myBoolean); // "boolean"
console.log("Type of myNull:", typeof myNull); // "object" (special case in JavaScript)
console.log("Type of myUndefined:", typeof myUndefined); // "undefined"
console.log("Type of myObject:", typeof myObject); // "object"

// Converting a string to a number using parseInt()
let strToNumber = "123";
let convertedNumber = parseInt(strToNumber);

console.log("Original String:", strToNumber); // "123"
console.log("Converted to Number:", convertedNumber); // 123
console.log("Type of convertedNumber:", typeof convertedNumber); // "number"

// Testing conversion of a non-numeric string
let invalidConversion = parseInt("Hello123"); 
console.log("Invalid Conversion Result:", invalidConversion); // NaN (Not a Number)
console.log("Type of Invalid Conversion:", typeof invalidConversion); // "number" (but it’s NaN)
