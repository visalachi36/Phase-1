// 🌟 Higher-Order Function: Takes an array and a callback function
function operateOnArray(arr, operation) {
    return arr.map(operation); // Apply the function to each element
}

// 🌟 Callback Functions
const doubleNumber = num => num * 2;
const squareNumber = num => num * num;
const numberToString = num => num.toString();

// 🌟 Test Array
const numbers = [1, 2, 3, 4, 5];

// 🌟 Applying the higher-order function with different callbacks
const doubledArray = operateOnArray(numbers, doubleNumber);
const squaredArray = operateOnArray(numbers, squareNumber);
const stringArray = operateOnArray(numbers, numberToString);

// 🌟 Printing Results
console.log("Original Array:", numbers);
console.log("Doubled Array:", doubledArray);
console.log("Squared Array:", squaredArray);
console.log("String Array:", stringArray);
