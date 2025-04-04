import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import "./styles/App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const products = [
    { id: 1, name: " Headphones", imageUrl: "/wireless ph.jpg", price: "$59.99" },
    { id: 2, name: " IPhone", imageUrl: "/ip.jpg", price: "$99.99" },
    { id: 3, name: "Laptop", imageUrl: "/download.jpg", price: "$9.99" },
  ];

  return (
    <Router>
      <div className="app">
        <Cart cartItems={cart} />
        <Routes>
          <Route path="/" element={<ProductList products={products} addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
