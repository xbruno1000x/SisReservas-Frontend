import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SisReservas
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/clientes" className="navbar-link">
              Clientes
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/reservas" className="navbar-link">
              Reservas
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profissionais" className="navbar-link">
              Profissionais
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
