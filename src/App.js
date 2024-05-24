import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Moviespage from "./pages/Moviespage";
import Seriespage from "./pages/Seriespage";
import Movieinfopage from "./pages/Movieinfopage";
import Seriesinfopage from "./pages/Seriesinfopage";

function App() {
  const [theme, setTheme] = useState("dark-mode");

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark-mode" ? "light-mode" : "dark-mode"
    );
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Moviespage />} />
        <Route path="/series" element={<Seriespage />} />
        <Route path="/movies/:id" element={<Movieinfopage />} />
        <Route path="/series/:id" element={<Seriesinfopage />} />
      </Routes>
    </div>
  );
}

export default App;
