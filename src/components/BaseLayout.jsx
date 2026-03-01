// src/components/BaseLayout.jsx
import React from 'react';
import '../styles/global.scss';
import '../styles/dashboard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import notiIcon from '../assets/noti-normal.svg';
import Bombas from '../components/Bombas';
import Plantas from '../components/Plantas';
import Stats from '../components/Stats';
import M3Facturados from '../components/ConsM3Facturados';

function BaseLayout({ children, user, messages, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setMenuOpen((open) => !open);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen((open) => !open);
  };

  const handleUserMenuClose = () => {
    setUserMenuOpen(false);
  };

  // Cierra el menú si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <span className="org-name">Acueducto el Rosario</span>
        </div>
        <div className="topbar-right">
          <a href="/notificaciones" className="notificaciones-icon">
            <img src={notiIcon} alt="Notificaciones" />
          </a>
          <span className="user-name"></span>
          <div className="user-avatar">👤</div>
          <div className="logout">| <a href="#" onClick={handleLogout} className="logout-link">Cerrar Sesión</a></div>
          <div className="user-avatar user-avatar-menu" onClick={handleUserMenuToggle} tabIndex={0} ref={userMenuRef} aria-label="Menú usuario" role="button">
            👤
            {userMenuOpen && (
              <div className="user-dropdown">
                <Link to="/perfil" className="user-dropdown-link" onClick={handleUserMenuClose}>Mi perfil</Link>
                <button className="user-dropdown-link logout-btn" onClick={() => { handleLogout(); handleUserMenuClose(); }}>Cerrar Sesión</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Botón hamburguesa solo en móvil */}
      <button className="menu-hamburger" onClick={handleMenuToggle} aria-label="Abrir menú">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Menú horizontal en desktop, vertical en móvil */}
      <nav className={`main-menu${menuOpen ? ' open' : ''}`} id="main-menu">
        <Link to="/" onClick={handleMenuLinkClick}>Resumen</Link>
        <Link to="/bombas" onClick={handleMenuLinkClick}>Bombas</Link>
        <Link to="/plantas" onClick={handleMenuLinkClick}>Plantas</Link>
        <Link to="/stats" onClick={handleMenuLinkClick}>Stats</Link>
      </nav>
      <main className="container">
        {children}
      </main>
    </>
  );
}

export default BaseLayout;