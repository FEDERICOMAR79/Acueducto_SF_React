import React, { useState } from 'react';
import '../styles/styles.scss';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
	const [form, setForm] = useState({
		username: '',
		email: '',
		password1: '',
		password2: '',
	});
	const [errors, setErrors] = useState({});
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [nonFieldError, setNonFieldError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let errs = {};
		if (!form.username) errs.username = 'Usuario requerido';
		if (!form.email) errs.email = 'Email requerido';
		if (!form.password1) errs.password1 = 'Contraseña requerida';
		if (!form.password2) errs.password2 = 'Confirmación requerida';
		if (form.password1 !== form.password2) errs.password2 = 'Las contraseñas no coinciden';
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errs = validate();
		setErrors(errs);
		if (Object.keys(errs).length === 0) {
			// Save user to localStorage
			const users = JSON.parse(localStorage.getItem('users') || '[]');
			// Check if username or email already exists
			if (users.some(u => u.username === form.username)) {
				setNonFieldError('El usuario ya existe');
				return;
			}
			if (users.some(u => u.email === form.email)) {
				setNonFieldError('El email ya está registrado');
				return;
			}
			users.push({ ...form });
			localStorage.setItem('users', JSON.stringify(users));
			setNonFieldError('Usuario registrado exitosamente');
			setForm({ username: '', email: '', password1: '', password2: '' });
			setErrors({});
			setTimeout(() => {
				setNonFieldError('');
				navigate('/login');
			}, 1200);
		}
	};

	return (
		<div className="auth-container">
			<div className="sign-card">
				<h2 className="form-title">Crear usuario</h2>
				<form onSubmit={handleSubmit}>
					{nonFieldError && (
						<div className="form-errors">{nonFieldError}</div>
					)}
					<div className="double-user-group">
						<div className="form-group">
							<label>Usuario*</label>
							<input
								name="username"
								value={form.username}
								onChange={handleChange}
								type="text"
								autoComplete="username"
								className="form-control"
							/>
							{errors.username && <div className="form-errors">{errors.username}</div>}
						</div>
						<div className="form-group">
							<label>Email*</label>
							<input
								name="email"
								value={form.email}
								onChange={handleChange}
								type="email"
								autoComplete="email"
								className="form-control"
							/>
							{errors.email && <div className="form-errors">{errors.email}</div>}
						</div>
					</div>
					<div className="form-group">
						<label>Contraseña*</label>
						<div className="password-wrapper">
							<input
								name="password1"
								value={form.password1}
								onChange={handleChange}
								type={showPassword1 ? 'text' : 'password'}
								autoComplete="new-password"
								className="form-control"
							/>
							<button
								type="button"
								className="toggle-password"
								onClick={() => setShowPassword1(!showPassword1)}
							>
								<span className="eye-icon">{showPassword1 ? 'ocultar' : 'mostrar'}</span>
							</button>
						</div>
						{errors.password1 && <div className="form-errors">{errors.password1}</div>}
					</div>
					<div className="form-group">
						<label>Confirmar contraseña*</label>
						<div className="password-wrapper">
							<input
								name="password2"
								value={form.password2}
								onChange={handleChange}
								type={showPassword2 ? 'text' : 'password'}
								autoComplete="new-password"
								className="form-control"
							/>
							<button
								type="button"
								className="toggle-password"
								onClick={() => setShowPassword2(!showPassword2)}
							>
								<span className="eye-icon">{showPassword2 ? 'ocultar' : 'mostrar'}</span>
							</button>
						</div>
						{errors.password2 && <div className="form-errors">{errors.password2}</div>}
					</div>
					<button type="submit" className="btn-primary">
						Registrar
					</button>
				</form>
				<Link to="/login" className="signup-link">¿Ya tienes cuenta? Inicia sesión</Link>
			</div>
		</div>
	);
};
export default Signup;
