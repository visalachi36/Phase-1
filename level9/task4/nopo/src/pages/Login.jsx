import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(() => navigate("/dashboard"));
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
