import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Moviespage from "./pages/Moviespage";
import Seriespage from "./pages/Seriespage";
import Movieinfopage from "./pages/Movieinfopage";
import Seriesinfopage from "./pages/Seriesinfopage";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies" element={<Moviespage />}/>
      <Route path="/series" element={<Seriespage />}/>
      <Route path="/movies/:id" element={<Movieinfopage />} />
      <Route path="/series/:id" element={<Seriesinfopage />} />
    </Routes>
  </div>;
}

export default App;
