
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Operacion from './components/Operacion';
import imageCalc from './assets/smiley-calculator.png';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>¡Hoy la calculadora vas a ser tú!</h1>
        <img src={imageCalc} className='img-home' alt='calculator img'></img>
        <Router>
          <div>
            <ul className='nav-links'>
            <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sumas">Practica sumas</Link>
              </li>
              <li>
                <Link to="/restas">Practica restas</Link>
              </li>
              <li>
                <Link to="/multiplicaciones">Practica multiplicaciones</Link>
              </li>
              <li>
                <Link to="/divisiones">Practica divisiones</Link>
              </li>
              
            </ul>
          </div>
          <Routes>
          <Route path="/sumas" element={<  Operacion op="+"/>}   />
          <Route path="/restas" element={<Operacion op="-"/>}   />
          <Route path="/multiplicaciones" element={<Operacion op="*"/>}   />
          <Route path="/divisiones" element={<Operacion op="/"/>}/>
          
          
          </Routes>
        </Router>
      </header>
      
    </div>
  );
}

export default App;
