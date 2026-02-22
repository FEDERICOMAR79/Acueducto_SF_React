// src/components/BaseLayout.jsx
import React from 'react';
import '../styles/global.scss';
import notiIcon from '../assets/noti-normal.svg';

function BaseLayout({ children, user, messages }) {
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
          <div className="logout">| <a href="/logout">Cerrar Sesión</a></div>
        </div>
      </header>

      {/* Menú horizontal */}
        <nav className="main-menu" id="main-menu">
          <a href="/">Resumen</a>
          <a href="/bombas">Bombas</a>
          <a href="/plantas">Plantas</a>
          <a href="/stats">Stats</a>
        </nav>

      <main className="container">
        {/* Aquí va el contenido específico de cada página */}
        {children}
      </main>
    </>
  );
}

export default BaseLayout;