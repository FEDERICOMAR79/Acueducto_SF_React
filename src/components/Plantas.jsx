import React, { useState } from 'react';
import '../styles/consumo.scss';
import Flatpickr from 'react-flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
/*import 'flatpickr/dist/themes/material_blue.css';*/
import 'flatpickr/dist/flatpickr.css';
import '../styles/datepicker-custom.scss';

const plantasEjemplo = [
	{ planta_id: 1, nombre: 'Planta Principal' },
	{ planta_id: 2, nombre: 'Planta Secundaria' },
];

const Plantas = () => {
	const [fechaActual, setFechaActual] = useState(new Date());
	const [valoresInput, setValoresInput] = useState({});
	const [invalidIds, setInvalidIds] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e, plantaId) => {
		setValoresInput({ ...valoresInput, [plantaId]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const submitter = e.nativeEvent.submitter;
        if (submitter?.name === 'dia_anterior' || submitter?.name === 'dia_siguiente') {
            const nuevaFecha = new Date(fechaActual);
            nuevaFecha.setDate(nuevaFecha.getDate() + (submitter.name === 'dia_siguiente' ? 1 : -1));
            setFechaActual(nuevaFecha);
            return;
        }
		if (submitter && submitter.classList.contains('registrar-btn')) {
			const fechaStr = fechaActual.toISOString().split('T')[0]; // formato YYYY-MM-DD
			const datosPlantas = JSON.parse(localStorage.getItem('datosPlantas') || '[]');
			plantasEjemplo.forEach((planta) => {
				if (valoresInput[planta.planta_id]) {
					// Guarda cada registro como un objeto con fecha, planta y valor
					datosPlantas.push({
						fecha: fechaStr,
						planta: planta.nombre,
						planta_id: planta.planta_id,
						valor: valoresInput[planta.planta_id]
					});
				}
			});
			localStorage.setItem('datosPlantas', JSON.stringify(datosPlantas));
		}
		setLoading(true);
		setTimeout(() => setLoading(false), 2000); // Simula carga
	};

	return (
            <>
                <div className="periodo-header">
                    <header>
                        <h1>Registro de Plantas</h1>
                    </header>
                    <div className="periodo-actual plantas-periodo">
                        <span>Registrando datos para:</span>
                        <form id="form-fecha-plantas" style={{ display: 'inline' }}>
                          <Flatpickr
                              id="datepicker-plantas"
                              name="fecha"
                              className="flatpickr-input"
                              value={fechaActual}
                              options={{
                                  locale: Spanish,
                                  dateFormat: 'Y-m-d',
                                  allowInput: false,
                              }}
                              onChange={(selectedDates, dateStr) => {
                                  setFechaActual(selectedDates[0]);
                              }}
                          />
                        </form>
                    </div>
                </div>

                <div className="bombas-grid">
                    <form onSubmit={handleSubmit}>
                        {plantasEjemplo.map((planta) => (
                            <div className="summary-card" key={planta.planta_id}>
                                <h3>{planta.nombre}</h3>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name={`consumo_planta_${planta.planta_id}`}
                                        id={`planta_${planta.planta_id}`}
                                        placeholder=" "
                                        value={valoresInput[planta.planta_id] || ''}
                                        onChange={(e) => handleInputChange(e, planta.planta_id)}
                                        className={`no-wheel-number ${invalidIds.includes(planta.planta_id) ? 'input-error' : ''}`}
                                    />
                                    <label htmlFor={`planta_${planta.planta_id}`}>
                                        Consumo de Energía del Día Actual (kWh)
                                    </label>
                                </div>
                            </div>
                        ))}
                        <div className="form-submit">
                            <button type="submit" name="dia_anterior" value="1">
                                Día anterior
                            </button>
                            <button type="submit" className="registrar-btn">
                                Registrar consumo diario
                            </button>
                            <button type="submit" name="dia_siguiente" value="1">
                                Día siguiente
                            </button>
                        </div>
                    </form>
                </div>

                {/* Eliminar todo lo relacionado con OCR, IA y carga de imágenes */}
            </>
	);
};

export default Plantas;
