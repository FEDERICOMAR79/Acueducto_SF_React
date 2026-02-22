// src/components/BaseLayout.jsx
import React from 'react';
import '../../global.scss';

function BaseLayout({ children, user, messages }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <span className="org-name">Acueducto el Rosario</span>
        </div>
        <div className="topbar-right">
          {user?.isAuthenticated && (
            <>
              <span className="user-name">{user.username}</span>
              <div className="user-avatar">👤</div>
              <div className="logout">| <a href="/logout">Cerrar Sesión</a></div>
            </>
          )}
        </div>
      </header>

      {/* Menú horizontal */}
      {user?.isAuthenticated && (
        <nav className="main-menu" id="main-menu">
          <a href="/">Resumen</a>
          <a href="/bombas">Bombas</a>
          <a href="/plantas">Plantas</a>
          <a href="/stats">Stats</a>
        </nav>
      )}

      <main className="container">
        {/* Notificaciones */}
        {messages && messages.length > 0 && (
          <section className="notifications">
            {messages.map((msg, idx) => (
              <div className="notification" key={idx}>
                <span className="notification-text">{msg}</span>
                <button type="button" className="notification-close" aria-label="Cerrar">×</button>
              </div>
            ))}
          </section>
        )}
        {/* Aquí va el contenido específico de cada página */}
        {children}
      </main>
    </>
  );
}

export default BaseLayout;