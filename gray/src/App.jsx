import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anxiety from "./pages/Anxiety";
import Depression from "./pages/Depression";
import WellBeing from "./pages/Wellbeing";
import EatingDisorder from "./pages/EatingDisorder";
import "./Dashboard.css";
import "./pages/anxiety.css";
import AnxietyTest from "./Testpages/AnxietyTest";
import DepressionTest from "./Testpages/DepressionTest";
import EatingTest from "./Testpages/EatingTest";
import WellTest from "./Testpages/WellTest";





const App = () => {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/anxiety" element={<Anxiety />} />
          <Route path="/anxiety-test" element={<AnxietyTest />} />
          <Route path="/depression" element={<Depression />} />
          <Route path="/depression-test" element={<DepressionTest />} />
          <Route path="/well-being" element={<WellBeing />} />
          <Route path="/well-being-test" element={<WellTest />} />
          <Route path="/eating-disorder" element={<EatingDisorder />} />
          <Route path="/eating-disorder-test" element={<EatingTest />} />
        </Routes>
      </Dashboard>
    </Router>
  );
};

export default App;
