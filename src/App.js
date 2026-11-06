import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import IntroDesktop from "./Components/IntroDesktop";
import MainPage from "./Components/MainPage";

// "/"        → the professional landing page
// "/desktop" → boot screen for the retro desktop
// "/main"    → the retro desktop itself
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desktop" element={<IntroDesktop />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
