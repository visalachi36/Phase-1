// JavaScript String Manipulation

// Declare a string variable with your full name
let fullName = "Visalachi N";

// Convert to uppercase
let upperCaseName = fullName.toUpperCase();

// Find the length of the string
let nameLength = fullName.length;

// Extract the first name
let firstName = fullName.split(" ")[0]; // Splitting by space and taking the first part

// Declare another string with your hometown
let hometown = "Coimbatore";

// Concatenate both strings using the + operator
let introduction = "Hello, my name is " + fullName + " and I am from " + hometown + ".";

// Print results to the console
console.log("String Manipulation:");
console.log("--------------------");
console.log(`Full Name: ${fullName}`);
console.log(`Uppercase Name: ${upperCaseName}`);
console.log(`Name Length: ${nameLength}`);
console.log(`First Name: ${firstName}`);
console.log(`Hometown: ${hometown}`);
console.log(`Concatenated String: ${introduction}`);
