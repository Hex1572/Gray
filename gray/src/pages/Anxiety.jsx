import React from "react";
import { useNavigate } from "react-router-dom";


const Anxiety = () => {
  const navigate = useNavigate();

  return (
    <div className="mental-container">
      <div className="mental-description">
      <h2>Anxiety Test</h2>
      <p>This test is designed to help you evaluate signs of anxiety by responding to a few simple questions. It's not a professional diagnosis, but it can guide you in understanding your mental well-being.</p>
      <button onClick={() => navigate("/anxiety-test")}>Start Test</button>
      </div>
    </div>
  );
};

export default Anxiety;
