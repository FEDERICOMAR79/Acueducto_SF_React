import React, { useState } from 'react';
import '../styles/consumo.scss';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import '../styles/datepicker-custom.scss';
import BaseLayout from './BaseLayout';

const bombasEjemplo = [
	{ bomba_id: 1, nombre: 'Bomba Norte' },
	{ bomba_id: 2, nombre: 'Bomba Sur' },
];

const Bombas = () => {
    const [fechaActual, setFechaActual] = useState(new Date());
	const [valoresInput, setValoresInput] = useState({});
	const [invalidIds, setInvalidIds] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e, bombaId) => {
		setValoresInput({ ...valoresInput, [bombaId]: e.target.value });
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
                        <h1>Registro de Bombas</h1>
                    </header>
                    <div className="periodo-actual">
                        <span>Registrando datos para:</span>
                        <div className="datepicker-wrapper bombas">
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
                    <form id="form-bombeo" onSubmit={handleSubmit}>
                        {bombasEjemplo.map((bomba) => (
                            <div className="summary-card" key={bomba.bomba_id}>
                                <h3>{bomba.nombre}</h3>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name={`consumo_bomba_${bomba.bomba_id}`}
                                        id={`bomba_${bomba.bomba_id}`}
                                        placeholder=" "
                                        value={valoresInput[bomba.bomba_id] || ''}
                                        onChange={(e) => handleInputChange(e, bomba.bomba_id)}
                                        className={`no-wheel-number ${invalidIds.includes(bomba.bomba_id) ? 'input-error' : ''}`}
                                    />
                                    <label htmlFor={`bomba_${bomba.bomba_id}`}>
                                        Consumo de Bombeo del Día Actual (m³)
                                    </label>
                                </div>
                            </div>
                        ))}
                        <div className="form-submit">
                            <button type="submit" name="dia_anterior" value="1">
                                Día anterior
                            </button>
                            <button type="submit" className="registrar-btn">
                                Registrar bombeo diario
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

export default Bombas;
