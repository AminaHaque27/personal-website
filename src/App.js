import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroDesktop from "./Components/IntroDesktop";
import MainPage from "./Components/MainPage"; // ← your main/desktop page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroDesktop />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
