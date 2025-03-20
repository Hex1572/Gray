import React from "react";
import { useNavigate } from "react-router-dom";
import "./Anxiety.css";

const Anxiety = () => {
  const navigate = useNavigate();

  return (
    <div className="mental-container">
      <h2>Anxiety Test</h2>
      <p>Assess your level of anxiety with this quick test.</p>
      <button onClick={() => navigate("/anxiety-test")}>Start Test</button>
    </div>
  );
};

export default Anxiety;
