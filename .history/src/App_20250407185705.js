import {Routes,Route} from "react-router-dom";
import './App.css';
//pages
import Home  from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
      <Route path="/about" element={<About/>}/>

    </Routes>
    </>
    
  );
}

export default App;
