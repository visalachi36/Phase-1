import React from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = ({ cartItems }) => {
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-img" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">
        <button className="back-button">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default CartPage;
