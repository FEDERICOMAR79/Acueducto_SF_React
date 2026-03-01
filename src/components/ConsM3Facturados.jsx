import React, { useState } from 'react';
import '../styles/datepicker-custom.scss';
import '../styles/monthSelect.scss';

const ConsM3Facturados = () => {
	// Estado para la fecha y el input
	const [fechaActual, setFechaActual] = useState(() => {
		// Por defecto, mes actual en formato YYYY-MM
		const hoy = new Date();
		return hoy.toISOString().slice(0, 7);
	});
	const [m3Facturados, setM3Facturados] = useState('');

	// Maneja el cambio del input de metros cúbicos
	const handleInputChange = (e) => {
		setM3Facturados(e.target.value);
	};

	// Maneja el submit del formulario principal
	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí iría la lógica para guardar los datos
		alert(`Registrado: ${m3Facturados} m³ para ${fechaActual}`);
	};

	// Cambia el mes mostrado
	const cambiarMes = (delta) => {
		const [year, month] = fechaActual.split('-').map(Number);
		let newMonth = month + delta;
		let newYear = year;
		if (newMonth < 1) {
			newMonth = 12;
			newYear -= 1;
		} else if (newMonth > 12) {
			newMonth = 1;
			newYear += 1;
		}
		setFechaActual(`${newYear}-${String(newMonth).padStart(2, '0')}`);
	};

	return (
		<div>
			{/* Encabezado y selector de mes */}
			<div className="periodo-header">
				<header>
					<h1>Registro de Metros Cúbicos Facturados</h1>
				</header>
				<div className="periodo-actual">
					<span style={{ display: 'inline' }}>Registrando datos para:</span>
					<form id="form-fecha" style={{ display: 'inline' }}>
						<input
							type="text"
							name="fecha"
							id="monthpicker-m3"
							value={fechaActual}
							readOnly
							className="flatpickr-input"
						/>
					</form>
				</div>
			</div>

			{/* Formulario de facturación */}
			<div className="facturacion-container">
				<form onSubmit={handleSubmit}>
					<div className="facturacion-card">
						<h3>
							Metros Cubicos Facturados de:<br /> {fechaActual.slice(5, 7)}-{fechaActual.slice(0, 4)}
						</h3>
						<div className="input-group" id="m3-facturados-group">
							<input
								type="number"
								name="consumo_metros_cubicos_facturados"
								id="m3_facturados"
								placeholder=" "
								value={m3Facturados}
								onChange={handleInputChange}
							/>
							<label htmlFor="m3_facturados">
								Metros Cúbicos Facturados del Mes (m³)
							</label>
						</div>
					</div>
					<div className="form-submit">
						<button type="button" onClick={() => cambiarMes(-1)}>&lt; mes anterior</button>
						<button type="submit" className="registrar-btn">Registrar consumo mensual</button>
						<button type="button" onClick={() => cambiarMes(1)}>mes siguiente &gt;</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ConsM3Facturados;
