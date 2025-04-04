import React from "react";

const products = [
  { id: 1, name: "T-Shirt", category: "clothing", price: 25 },
  { id: 2, name: "Laptop", category: "electronics", price: 900 },
  { id: 3, name: "Headphones", category: "electronics", price: 150 },
  { id: 4, name: "Novel", category: "books", price: 15 },
];

const ProductList = ({ query, category, minPrice, maxPrice }) => {
  const min = Number(minPrice);
  const max = Number(maxPrice);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      (category ? product.category === category : true) &&
      product.price >= min &&
      product.price <= max
    );
  });

  return (
    <div className="product-list">
      <h2>Results:</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} ({product.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
