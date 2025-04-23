// Variable Declaration using var, let, and const

// Declaring a variable using var (can be redeclared and updated)
var myVar = "Visalachi"; // Name

// Declaring a variable using let (can be updated but not redeclared)3
let myLet = 21; // Age

// Declaring a variable using const (cannot be reassigned)
const myConst = "Blue"; // Favorite color

// Printing values to the console
console.log("Name:", myVar);
console.log("Age:", myLet);
console.log("Favorite Color:", myConst);

// Additional Example: Reassigning Values
myVar = "Visha"; // Works, because var can be reassigned
myLet = 22; // Works, because let can be reassigned
//myConst = "Red"; // ❌ Error! Cannot reassign a const variable

// Printing updated values
console.log("Updated Name:", myVar);
console.log("Updated Age:", myLet);
