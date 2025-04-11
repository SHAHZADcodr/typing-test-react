import {Routes,Route} from "react-router-dom";
import './App.css';
//pages
import Home  from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";

//components
import Navigation from "./components/Navbar";

function App() {
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/privacy" element={<PrivacyPolicy/>}/>
      <Route path="/game" element={<Game/>}/>
      <Route path="/gameOver" element={<GameOver/>}/>

    </Routes>
    </>
    
  );
}

export default App;
