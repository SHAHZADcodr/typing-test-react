import {Routes,Route} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Home/>}/>
      <Route path="/about" element{<}

    </Routes>
    
  );
}

export default App;
