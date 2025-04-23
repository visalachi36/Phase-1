// JavaScript Object Operations

// Step 1: Create an object representing a person
let person = {
    name: "Visal",
    age: 21,
    city: "New York",
    hobbies: ["Reading", "Gaming", "Traveling"]
};

// Step 2: Access and print each property using dot notation
console.log("Name:", person.name);
console.log("Age:", person.age);
console.log("City:", person.city);
console.log("Hobbies:", person.hobbies.join(", "));

// Step 3: Add a new property called "job"
person.job = "Software Developer";
console.log("Job:", person.job);

// Step 4: Change the value of the age property
person.age = 26;
console.log("Updated Age:", person.age);

// Step 5: Add a method called "greet"
person.greet = function() {
    return `Hello, my name is ${this.name} and I live in ${this.city}.`;
};

// Step 6: Call the method and print the result
console.log(person.greet());
