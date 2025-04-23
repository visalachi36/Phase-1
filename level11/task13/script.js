// Product object with properties
const product = {
    name: "Wireless Mouse",
    price: 25.99,
    category: "Electronics",
    inStock: true
};

// ✅ Object Destructuring
const { name, price, category, inStock } = product;

// ✅ Print destructured values
console.log("Destructured Values:");
console.log(`Name: ${name}`);
console.log(`Price: $${price}`);
console.log(`Category: ${category}`);
console.log(`In Stock: ${inStock ? "Yes" : "No"}`);

// ✅ Function with Destructuring in Parameter List
function displayProductDetails({ name, price, category, inStock }) {
    return `📦 Product: ${name}\n💰 Price: $${price}\n🛒 Category: ${category}\n✅ Available: ${inStock ? "In Stock" : "Out of Stock"}`;
}

// ✅ Call function and print the result
console.log("\nFormatted Product Details:");
console.log(displayProductDetails(product));
