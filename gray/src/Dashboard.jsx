import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = ({ children }) => {
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showDevs, setShowDevs] = useState(false);

  const hideButtonsOnRoutes = [
    "/anxiety",
    "/depression",
    "/anxiety-test",
    "/depression-test",
    "/well-being-test",
    "/eating-disorder-test",
  ];

  const shouldHideButtons = hideButtonsOnRoutes.includes(location.pathname);

  return (
    <div className="dashboard">
      <header className="header">
        {/* Home Icon */}
        <Link to="/" className="home-button">
          <i className="fa fa-home"></i>
        </Link>

        {/* Title & Description */}
        <div className="header-content">
          <h1>Making Mental Health Accessible and Efficient</h1>
          <p>Take the test to assess your mental distress</p>
          <div className="header-right">
            <span className="help-link" onClick={() => setShowHelp(true)}>Help</span>
            <span className="help-link" onClick={() => setShowAbout(true)}>About System</span>
            <span className="help-link" onClick={() => setShowDevs(true)}>Devs</span> {/* Added Devs link */}
          </div>
        </div>

        <button className="login-button">Login</button>
      </header>

      {/* Test Buttons */}
      {!shouldHideButtons && (
        <div className="test-buttons">
          <Link to="/anxiety" className="test-button">Anxiety Test</Link>
          <Link to="/depression" className="test-button">Depression Test</Link>
          <Link to="/well-being-test" className="test-button">Well-Being Test</Link>
          <Link to="/eating-disorder-test" className="test-button">Eating Disorder Test</Link>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Help Modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Help</h2>
            <p>Click on the test buttons to take a mental health assessment. Each test will ask you a series of questions to help evaluate your current mental state.</p>
            <ul>
              <li><strong>Anxiety Test (GAD-7):</strong> Evaluate anxiety symptoms</li>
              <li><strong>Depression Test (PHQ-9):</strong> Check for signs of depression</li>
              <li><strong>Well-Being Test (WHO-5):</strong> Gauge your general mental wellness</li>
              <li><strong>Eating Disorder Test (BFI-10):</strong> Detect signs of disordered eating</li>
            </ul>
            <button onClick={() => setShowHelp(false)} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* About System Modal */}
      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>About the System</h2>
            <p>
              This system is designed to support individuals who are concerned about their mental health. 
              It provides users with tools to assess and better understand their mental well-being.
            </p>
            <button onClick={() => setShowAbout(false)} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Devs Modal */}
      {showDevs && (
        <div className="modal-overlay" onClick={() => setShowDevs(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>About the Developers</h2>
            <ul>
              <li><strong>Jeffrey Ramirez</strong> </li>
              <li><strong>Gabriella Enriquez</strong> </li>
              <li><strong>Marc Rainier Buitizon</strong></li>
              <li><strong>Jensha Maniflor</strong></li>
            </ul>
            <button onClick={() => setShowDevs(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
