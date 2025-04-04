import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../auth";

const PrivateRoute = () => {
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
