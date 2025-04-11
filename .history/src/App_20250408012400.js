import {Routes,Route} from "react-router-dom";
import './App.css';
//pages
import Home  from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Game from "./pages/Game";

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
      <Route path="/game" element={<Game/>}/>

    </Routes>
    </>
    
  );
}

export default App;
