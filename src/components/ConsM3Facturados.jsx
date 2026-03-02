import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import '../styles/consumo.scss';
import 'flatpickr/dist/flatpickr.css';
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

		const valor = Number(m3Facturados);
		if (!m3Facturados || Number.isNaN(valor) || valor < 0) {
			alert('Ingresa un valor válido de metros cúbicos.');
			return;
		}

		const registrosM3 = JSON.parse(localStorage.getItem('M3Facturados') || '[]');
		registrosM3.push({
			fecha: fechaActual, // YYYY-MM
			metros_cubicos: valor,
			m3fact: valor,
			usuario: "mayito",
		});

		localStorage.setItem('M3Facturados', JSON.stringify(registrosM3));
		alert(`Registrado: ${valor} m³ para ${fechaActual}`);
		setM3Facturados('');
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
				<div className="periodo-actual m3fact-periodo">
					<span style={{ display: 'inline' }}>Registrando datos para:</span>
					<form id="form-fecha-m3" style={{ display: 'inline' }}>
						<Flatpickr
							id="monthpicker-m3"
							name="fecha"
							className="flatpickr-input"
							value={fechaActual}
							options={{
								locale: Spanish,
								dateFormat: 'Y-m',
								allowInput: false,
								plugins: [
									new monthSelectPlugin({
										shorthand: true,
										dateFormat: 'Y-m',
										altFormat: 'F Y',
									}),
								],
							}}
							onChange={(_selectedDates, dateStr) => {
								if (dateStr) setFechaActual(dateStr);
							}}
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
