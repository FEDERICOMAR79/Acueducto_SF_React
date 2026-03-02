
const handleSubmit = (e) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;
    if (submitter && submitter.classList.contains('registrar-btn')) {
        const fechaStr = fechaActual.toISOString().split('T')[0].slice(0, 7); // formato YYYY-MM
        const M3Facturados = JSON.parse(localStorage.getItem('M3Facturados') || '[]');
            if (valoresInput) {
                // Guarda cada registro como un objeto con fecha, bomba y valor
                M3Facturados.push({
                    fecha: fechaStr,
                    m3fact: valoresInput,
                });
            }
        localStorage.setItem('M3Facturados', JSON.stringify(M3Facturados));
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simula carga
};