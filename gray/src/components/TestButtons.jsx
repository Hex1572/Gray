import React from "react";
import { Link } from "react-router-dom";
import "../componentDesign/TestButtons.css"; // Import CSS for styling


const TestButtons = () => {
  return (
    <div className="test-buttons">
      <Link to="/anxiety" className="test-button">Anxiety Test</Link>
      <Link to="/depression" className="test-button">Depression Test</Link>
      <Link to="/well-being" className="test-button">Well-Being Test</Link>
      <Link to="/eating-disorder" className="test-button">Personal Test</Link>
    </div>
  );
};

export default TestButtons;
