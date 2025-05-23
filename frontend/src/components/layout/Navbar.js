import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = ({ onLogout }) => {
  const handleLogoutClick = async () => {
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          Autores y Libros nivel 3
        </Link>
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <Link to="/libros" className="nav-link">
                Libros
              </Link>
            </li>
            <li>
              <Link to="/autores" className="nav-link">
                Autores
              </Link>
            </li>
            <li>
              <Link to="/generos" className="nav-link">
                Géneros
              </Link>
            </li>
          </ul>
          <button onClick={handleLogoutClick} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
