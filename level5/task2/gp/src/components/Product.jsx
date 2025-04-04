import React from "react";
import "../styles/Product.css";

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-price">{product.price}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
