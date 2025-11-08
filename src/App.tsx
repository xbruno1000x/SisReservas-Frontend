import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Reservas from './pages/Reservas';
import Profissionais from './pages/Profissionais';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/profissionais" element={<Profissionais />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
