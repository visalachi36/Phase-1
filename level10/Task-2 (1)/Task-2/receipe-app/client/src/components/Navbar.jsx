import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css"; // Import custom styles

const Navbar = () => {
  return (
    
    <nav className="navbar">
      <div className="nav-container">
        <NavLink className="navbar-brand" to="/">
          FoOD World!
        </NavLink>
        <div className="nav-links">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/categories">
            Categories
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
