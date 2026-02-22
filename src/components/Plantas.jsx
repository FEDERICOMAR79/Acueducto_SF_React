import React, { useState } from 'react';
import '../styles/consumo.scss';
import Flatpickr from 'react-flatpickr';
/*import 'flatpickr/dist/themes/material_blue.css';*/
import 'flatpickr/dist/flatpickr.css';
import '../styles/datepicker-custom.scss';
import BaseLayout from './BaseLayout';

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
		// Aquí iría la lógica de validación y envío
		setLoading(true);
		setTimeout(() => setLoading(false), 2000); // Simula carga
	};

	return (
        <BaseLayout>
            <>
                <div className="periodo-header">
                    <header>
                        <h1>Registro de Plantas</h1>
                    </header>
                    <div className="periodo-actual">
                        <span>Registrando datos para:</span>
                        <div className="datepicker-wrapper">
                          <Flatpickr
                              value={fechaActual}
                              options={{
                                  locale: 'es',
                                  dateFormat: 'Y-m-d',
                              }}
                              onChange={(selectedDates, dateStr) => {
                                  setFechaActual(selectedDates[0]);
                              }}
                          />
                        </div>
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
        </BaseLayout>
	);
};

export default Plantas;
