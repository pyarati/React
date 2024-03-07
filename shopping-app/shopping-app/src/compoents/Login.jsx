import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = () => {
    setUserName("");
    setPassword("");
    setError("");

    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: userName,
        password: password,
      },
    })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        navigate(`/productList`);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login-inputs">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            className="input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
          />
          {error && <small className="small">{error}</small>}
          <button className="button" onClick={loginHandler}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
