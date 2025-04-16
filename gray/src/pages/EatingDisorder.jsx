import React from "react";
import { useNavigate } from "react-router-dom";

const EatingDisorder = () => {
    const navigate = useNavigate();
  return (
    <div className="mental-container">
        <div className="mental-description">
      <h2>Eating Disorder Test</h2>
      <p>Assess your level of Eating Disorder with this quick test.</p>
      <button onClick={() => navigate("/eating-disorder-test")}>Start Test</button>
    </div>
    </div>
  );
};

export default EatingDisorder;
