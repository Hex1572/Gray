import React from "react";
import "../componentDesign/HeaderFooter.css";

const Footer = ({ setShowHelp, setShowAbout, setShowDevs }) => {
  return (
    <div className="footer">
      <div className="help-signup">
        <h2>Sign Up for Help</h2>
        <p style={{ color: "var(--text-dark)" }}>
          Learn about opportunities to help change the conversation around mental health.
        </p>
        <form className="help-form">
          <label>FIRST NAME</label>
          <input type="text" />

          <label>LAST NAME</label>
          <input type="text" />

          <label>EMAIL</label>
          <input type="email" />

          <label>PHONE NUMBER (OPTIONAL)</label>
          <input type="tel" />

          <button type="submit" className="submit-button-help">
            SUBMIT
          </button>
        </form>
      </div>

      <div className="footer-content">
        <div className="footer-links">
          <div>
            <h4>Learn about Mental Health Conditions</h4>
            <ul>
              
              
              <li>Depression</li>
              <li>Anxiety</li>
              <li>Eating Disorders</li>
              <li>Big Five Inventory</li>
              <li>Well-being</li>
              
            </ul>
          </div>
        </div>
      </div>
      <p>&copy; 2025 Mental Health Dashboard. All rights reserved.</p>
    </div>
  );
};

export default Footer;
