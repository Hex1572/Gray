// components/LoginModal.jsx
import React, { useState } from "react";
import "../componentDesign/Login.css";

const Login = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === registerData.email);

    if (emailExists) {
      alert("Email already registered.");
      return;
    }

    users.push(registerData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    setIsLogin(true);
    setRegisterData({ name: "", email: "", phone: "", password: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (found) {
      alert(`Welcome back, ${found.name}!`);
      onClose();
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="modal-overlay fullscreen">
      <div className="modal-content modal-fullscreen">
      <button className="close-button" onClick={onClose}>×</button>

<h2 className="modal-title">Mental Health </h2>

<div className="modal-toggle">
  <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
    Login
  </button>
  <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
    Sign Up
  </button>
        </div>

        {isLogin ? (
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;