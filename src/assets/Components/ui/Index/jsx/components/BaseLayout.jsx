import React from 'react';

function BaseLayout({ children }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <span className="org-name">Acueducto el Rosario</span>
        </div>
        <div className="topbar-right">
          {/* Aquí puedes agregar usuario, avatar, logout, etc. */}
        </div>
      </header>
      <main className="container">
        {children}
      </main>
      <footer className="footer">
        {/* Footer opcional */}
      </footer>
    </>
  );
}

export default BaseLayout;
