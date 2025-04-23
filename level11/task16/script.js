// Function that returns a closure (inner function)
function createCounter() {
    let count = 0; // Private variable (only accessible inside the closure)

    return function () {
        count++; // Increments count
        return count;
    };
}

// Creating two independent counters
const counter1 = createCounter();
const counter2 = createCounter();

// Incrementing each counter multiple times
console.log("Counter 1:", counter1()); // 1
console.log("Counter 1:", counter1()); // 2
console.log("Counter 2:", counter2()); // 1 (Independent from counter1)
console.log("Counter 1:", counter1()); // 3
console.log("Counter 2:", counter2()); // 2
console.log("Counter 2:", counter2()); // 3
console.log("Counter 1:", counter1()); // 4
