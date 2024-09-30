import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Catalogo</Link>
        <div className="container-fluid" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/peliculas">ADM-Películas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/personas">Actores/Directores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/personas/nueva">ADM-Agregar Persona</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/peliculas/nueva">ADM-Agregar Película</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
