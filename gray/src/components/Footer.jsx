// components/Footer.jsx
import React from "react";
import "../componentDesign/HeaderFooter.css"; // Import CSS for styling
const Footer = ({ setShowHelp, setShowAbout, setShowDevs }) => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Mental Health Dashboard. All rights reserved.</p>
       
      </div>
    </div>
  );
};

export default Footer;
