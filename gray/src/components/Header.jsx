// components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../componentDesign/HeaderFooter.css"; // Import CSS for styling

const Header = ({ onLoginClick }) => {
  return (
    <div className="header">
      <Link to="/" className="home-button">
        <i className="fa fa-home"></i>
      </Link>

      <div className="header-content">
        <h1>Making Mental Health Accessible and Efficient</h1>
        <p>Take the test to assess your mental distress</p>
      </div>

      <button className="login-button" onClick={onLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Header;
