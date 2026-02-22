// src/components/BaseLayout.jsx
import React from 'react';
import '../styles/global.scss';
import { Link, useNavigate } from 'react-router-dom';
import notiIcon from '../assets/noti-normal.svg';
import Bombas from '../components/Bombas';
import Plantas from '../components/Plantas';
import Stats from '../components/Stats';

function BaseLayout({ children, user, messages, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

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
          <div className="logout">| <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></div>
        </div>
      </header>

      {/* Menú horizontal */}
      <nav className="main-menu" id="main-menu">
        <Link to="/">Resumen</Link>
        <Link to="/bombas">Bombas</Link>
        <Link to="/plantas">Plantas</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <main className="container">
        {/* Aquí va el contenido específico de cada página */}
        {children}
      </main>
    </>
  );
}

export default BaseLayout;