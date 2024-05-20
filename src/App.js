import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Moviespage from "./pages/Moviespage";
import Seriespage from "./pages/Seriespage";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies" element={<Moviespage />}/>
      <Route path="/series" element={<Seriespage />}/>
    </Routes>
  </div>;
}

export default App;
