import React from "react";
import Product from "./Product";
import "../styles/ProductList.css";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
