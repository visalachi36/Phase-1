import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LargeComponent from "./components/LargeComponent";
import OptimizedList from "./components/OptimizedList";
import "./styles/Global.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <LargeComponent />
        <OptimizedList />
      </div>
    </Router>
  );
};

export default App;
