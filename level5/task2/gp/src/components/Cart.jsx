import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <Link to="/cart">
        <button className="cart-button">
          🛒 View Cart ({cartItems.length})
        </button>
      </Link>
    </div>
  );
};

export default Cart;
