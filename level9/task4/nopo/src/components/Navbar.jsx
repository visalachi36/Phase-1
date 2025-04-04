import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(() => navigate("/"));
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {auth.isAuthenticated ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
