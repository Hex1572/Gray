import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardView from "./pages/DashboardView";

import Header from "./components/Header";
import Footer from "./components/Footer";

const Dashboard = ({ children }) => {
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showDevs, setShowDevs] = useState(false);

  const hideButtonsOnRoutes = [
    "/anxiety",
    "/depression",
    "/well-being",
    "/eating-disorder",
    "/anxiety-test",
    "/depression-test",
    "/well-being-test",
    "/eating-disorder-test"
  ];

  const shouldHideButtons = hideButtonsOnRoutes.includes(location.pathname);

  return (
    <div className="dashboard">
      {/* Header is no longer fixed; it will now scroll with the page */}
      <Header onLoginClick={() => console.log("Login clicked")} />
      {/* Conditionally render TestButtons and DashboardView */}
      {!shouldHideButtons && (
        <>
          <DashboardView />
        </>
        
      )}

      <main className="main-content">{children}</main>

      
          

      {/* Footer Component */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
