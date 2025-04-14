import {Routes,Route} from "react-router-dom";
import './App.css';
import { initGA, logPageView } from "./analytics";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
//pages
import Home  from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import PrivacyPolicy from "./pages/PrivacyPolicy";

//components
import Navigation from "./components/Navbar";

function App() {
   const location = useLocation();

   useEffect(() => {
     // Disable Right Click
     document.addEventListener("contextmenu", (e) => e.preventDefault());

     // Disable Keyboard Shortcuts
     const blockDevTools = (e) => {
       if (
         e.key === "F12" ||
         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
         (e.ctrlKey && e.key === "U")
       ) {
         e.preventDefault();
       }
     };

     document.addEventListener("keydown", blockDevTools);

     return () => {
       document.removeEventListener("contextmenu", (e) => e.preventDefault());
       document.removeEventListener("keydown", blockDevTools);
     };
   }, []);

  return (
    <>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="/game" element={<Game/>}/>
      <Route path="/gameOver" element={<GameOver/>}/>

    </Routes>
    </>
    
  );
}

export default App;
