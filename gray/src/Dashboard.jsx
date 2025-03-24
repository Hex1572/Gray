import React from "react";
import { Link, useLocation } from "react-router-dom";

const Dashboard = ({ children }) => {
  const location = useLocation();

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
      {/* Header Navigation */}
      <header className="header">


        <Link to="/" className="home-button">
          <i className="fa fa-home"></i>
        </Link>


        <div className="header-content">
          <h1>Making Mental Health Accessible and Efficient</h1>
          <p>Take the test to assess your mental distress</p>
          </div>
        <button className="logout-button">Login</button>
      </header>

      {/* Keep the buttons properly positioned */}
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
    </div>
  );
};

export default Dashboard;
