import React from "react";
import { Link } from "react-router-dom";
import "../componentDesign/TestButtons.css";

const TestButtons = () => {
  return (
    <div className="test-buttons">

      <div className="test-buttons-title">
        <h2>Take a Mental Health Test</h2>
      </div>

      <div className="test-button-group">
        <Link to="/anxiety" className="test-button">Anxiety Test</Link>
        <Link to="/depression" className="test-button">Depression Test</Link>
        <Link to="/well-being" className="test-button">Well-Being Test</Link>
        <Link to="/eating-disorder" className="test-button">Personality Test</Link>
      </div>


      
    </div>
  );
};

export default TestButtons;
