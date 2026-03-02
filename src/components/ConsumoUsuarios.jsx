import React, { useState } from 'react';
import '../styles/monthSelect.scss';
import '../styles/monthpicker-contador.scss';

const ConsumoUsuarios = () => {
	// Estado para la fecha y los usuarios
	const [fecha, setFecha] = useState(() => {
		const hoy = new Date();
		return hoy.toISOString().slice(0, 7);
	});
	// Simulación de datos de usuarios
	const [usuarios, setUsuarios] = useState([
		{ id: 1, fecha: '2026-02', consumo_m3: 12.5 },
		{ id: 2, fecha: '2026-01', consumo_m3: 10.2 },
		// ...más registros
	]);
	// Simulación de paginación
	const [pagina, setPagina] = useState(1);
	const totalPaginas = 2;

	// Maneja el cambio de mes
	const handleFechaChange = (e) => {
		setFecha(e.target.value);
	};

	// Maneja el submit del filtro
	const handleFiltrar = (e) => {
		e.preventDefault();
		// Aquí iría la lógica para filtrar los usuarios por fecha
		alert(`Filtrando por mes: ${fecha}`);
	};

	// Limpiar filtros
	const handleLimpiar = () => {
		setFecha(new Date().toISOString().slice(0, 7));
	};

	// Exportar XLSX (simulado)
	const handleExportar = () => {
		alert('Descargando XLSX...');
	};

	// Eliminar registro (simulado)
	const handleEliminar = (id) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
			setUsuarios(usuarios.filter(u => u.id !== id));
		}
	};

	// Paginación
	const handlePagina = (num) => {
		setPagina(num);
	};

	return (
		<div>
			<div className="graficas-header">
				<header>
					<h1>Consumo Por Usuario</h1>
				</header>
			</div>

			{/* Formulario de Filtros */}
			<section className="filtros-section">
				<form className="filtros-form" onSubmit={handleFiltrar}>
					<div className="filtro-grupo">
						<label htmlFor="fecha">Mes:</label>
						<input
							type="month"
							name="fecha"
							id="monthpicker-contador-bombeo"
							value={fecha}
							onChange={handleFechaChange}
							className="flatpickr-input"
							placeholder="Selecciona un mes"
							readOnly={false}
						/>
					</div>
					<div className="filtro-grupo">
						<button type="button" className="btn-limpiar" onClick={handleLimpiar}>Limpiar Filtros</button>
					</div>
				</form>
			</section>

			<section className="dashboard-latest">
				<div className="tabla-container">
					  <table className="consumo-table">
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Consumo Por Usuario</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{usuarios.length > 0 ? (
								usuarios.map((u, idx) => (
									<tr key={u.id}>
										<td>{u.fecha}</td>
										<td>{u.consumo_m3}</td>
										<td className="acciones">
											<button className="btn-eliminar" onClick={() => handleEliminar(u.id)}>Eliminar</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3" className="tabla-vacia">No hay registros disponibles.</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{/* Controles de paginación */}
				<div className="pagination">
					<span className="page-info">
						Página {pagina} de {totalPaginas}
					</span>
					<nav>
						{pagina > 1 && (
							<button className="btn-paginacion" onClick={() => handlePagina(pagina - 1)}>&#x2039; Anterior</button>
						)}
						{[...Array(totalPaginas)].map((_, num) => (
							pagina === num + 1 ? (
								<span className="page-current" key={num}>{num + 1}</span>
							) : (
								<button className="btn-paginacion" key={num} onClick={() => handlePagina(num + 1)}>{num + 1}</button>
							)
						))}
						{pagina < totalPaginas && (
							<button className="btn-paginacion" onClick={() => handlePagina(pagina + 1)}>Siguiente &#x203A;</button>
						)}
					</nav>
				</div>
			</section>
		</div>
	);
};

export default ConsumoUsuarios;
