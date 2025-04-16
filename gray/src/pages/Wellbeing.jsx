import React from "react";
import { useNavigate } from "react-router-dom";

const Wellbeing = () => {
    const navigate = useNavigate();

  return (
    <div className="mental-container">
        <div className="mental-description">
      <h2>Well-Being Test</h2>
      <p>Assess your level of Well-Being with this quick test.</p>
      <button onClick={() => navigate("/well-being-test")}>Start Test</button>
    </div>
    </div>
  );
};

export default Wellbeing;
