export const bombasEjemplo = [
    { bomba_id: 1, nombre: 'Bomba Norte' },
    { bomba_id: 2, nombre: 'Bomba Sur' },
];

const handleInputChange = (e, bombaId) => {
	setValoresInput({ ...valoresInput, [bombaId]: e.target.value });
};

const handleSubmit = (e) => {
	e.preventDefault();
	const submitter = e.nativeEvent.submitter;
	if (submitter && submitter.classList.contains('registrar-btn')) {
		const fechaStr = fechaActual.toISOString().split('T')[0]; // formato YYYY-MM-DD
		const datosContadores = JSON.parse(localStorage.getItem('datosContadores') || '[]');
		bombasEjemplo.forEach((bomba) => {
			if (valoresInput[bomba.bomba_id]) {
				// Guarda cada registro como un objeto con fecha, bomba y valor
				datosContadores.push({
					fecha: fechaStr,
					bomba: bomba.nombre,
					bomba_id: bomba.bomba_id,
					valor: valoresInput[bomba.bomba_id]
				});
			}
		});
		localStorage.setItem('datosContadores', JSON.stringify(datosContadores));
	}
	setLoading(true);
	setTimeout(() => setLoading(false), 2000); // Simula carga
};