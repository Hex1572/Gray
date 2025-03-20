import React from "react";
import { useNavigate } from "react-router-dom";

const Depression = () => {
    const navigate = useNavigate();

  return (
    <div className="mental-container">
      <h2>Depression Test</h2>
      <p>Assess your level of Depression with this quick test.</p>
      <button onClick={() => navigate("/depression-test")}>Start Test</button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Depression;
