import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><NavLink to="/dashboard/overview" className={({ isActive }) => isActive ? "active" : ""}>Overview</NavLink></li>
          <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink></li>
          <li><NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
