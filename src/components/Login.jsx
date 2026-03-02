import React, { useState } from 'react';
import '../styles/styles.scss';
import { Link } from 'react-router';
import { setCurrentUser } from '../utils/session';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Usuario y contraseña requeridos');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);
    if (!user) {
      setError('Usuario no encontrado');
      return;
    }
    if (user.password1 !== password) {
      setError('Contraseña incorrecta');
      return;
    }
    setError('');
    setCurrentUser(username); // Guarda el nombre de usuario en localStorage
    setIsAuthenticated(true); // Cambia el estado global para redirigir
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Iniciar Sesión</h2>
          {error && <div className="form-errors">{error}</div>}
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                id="id_password"
                className="form-control"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="eye-icon">{showPassword ? 'ocultar' : 'mostrar'}</span>
              </button>
            </div>
          </div>
          <button className="btn-primary" type="submit">Entrar</button>
        </form>
        <Link to="/signup" className="signup-link">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;
