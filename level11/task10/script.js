// Variables
const firstName = "NIRANJAN";
const lastName = "NN";
const age = 25;

// 1️⃣ Template Literal for a Sentence
const introduction = `Hello, my name is ${firstName} ${lastName} and I am ${age} years old.`;
console.log(introduction);

// 2️⃣ Multi-line Template Literal with Calculation
const multiLine = `This is a multi-line string.
I can write on multiple lines without using \n.
For example, 5 + 3 = ${5 + 3}`;
console.log(multiLine);

// 3️⃣ Template Literal with Ternary Operator
const ageMessage = `${firstName} is ${age >= 18 ? "minor" : "a adult"}.`;
console.log(ageMessage);
