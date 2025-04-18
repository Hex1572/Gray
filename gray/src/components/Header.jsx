import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../componentDesign/HeaderFooter.css";
import LoginModal from "./Login";


const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className="header">
        <Link to="/" className="home-button">
          <i className="fa fa-home"></i>
        </Link>

        <div className="header-content">
          <h1>Making Mental Health Accessible and Efficient</h1>
          <p>Take the test to assess your mental distress</p>
        </div>

        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </div>

      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </>
  );
};

export default Header;