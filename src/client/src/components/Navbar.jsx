import React from "react";
import "./Navbar.css";
import logo from "../assets/vyv.png"

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Verde y Vital Logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/categories">Categorías</Link></li>
        <li><Link to="/create-product">Crear Producto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
