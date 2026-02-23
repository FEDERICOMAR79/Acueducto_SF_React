import { useEffect, useState } from "react";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/dashboard.scss";

const ContadorDiarioBombeo = () => {
  const [bombas, setBombas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Load bombas from localStorage
    const bombasLS = JSON.parse(localStorage.getItem("bombas") || "[]");
    setBombas(bombasLS);
    // Filter registros
    let registrosLS = JSON.parse(localStorage.getItem("datosContadores") || "[]");
    let filtrados = registrosLS;
    if (bombaId) {
      filtrados = filtrados.filter(r => r.bomba === bombaId || r.bombaId === bombaId);
    }
    if (fecha) {
      filtrados = filtrados.filter(r => r.fecha && r.fecha.startsWith(fecha));
    }
    // Paginación
    const pageSize = 10;
    const total = filtrados.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    setTotalPages(pages);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setRegistros(filtrados.slice(start, end));
  }, [bombaId, fecha, page]);

  // Eliminar registro
  // ...existing code...

  // Función para eliminar un registro por id o índice
  const handleEliminar = (id, idx) => {
    let nuevosRegistros = [...registros];
    if (id !== undefined && id !== null) {
      nuevosRegistros = nuevosRegistros.filter(r => r.id !== id);
    } else {
      nuevosRegistros.splice(idx, 1);
    }
    setRegistros(nuevosRegistros);
    localStorage.setItem("datosContadores", JSON.stringify(nuevosRegistros));
  };

  return (
    <>
      <div className="graficas-header">
        <header>
          <h1>Consumo de Bombeo Contador</h1>
        </header>
      </div>

      {/* Filtros */}
      <section className="filtros-section">
        <form
          className="filtros-form"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
          }}
        >
          <div className="filtro-grupo">
            <label>Bomba:</label>
            <select value={bombaId} onChange={(e) => setBombaId(e.target.value)}>
              <option value="">-- Todas las bombas --</option>
              {bombas.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Mes:</label>
            <input
              type="month"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="monthpicker-custom"
            />
          </div>

          <div className="filtro-grupo">
            <button className="btn-filtrar">Filtrar</button>
            <button
              type="button"
              className="btn-limpiar"
              onClick={() => {
                setBombaId("");
                setFecha("");
                setPage(1);
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        </form>
      </section>

      {/* Tabla */}
      <section className="dashboard-latest">
        <div className="tabla-container">
          <table className="consumo-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Bomba</th>
                <th>Consumo (m³)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="4" className="tabla-vacia">
                    No hay registros para este día
                  </td>
                </tr>
              ) : (
                registros.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td>{r.fecha}</td>
                    <td>{r.bomba}</td>
                    <td>{r.valor}</td>
                    <td className="acciones">
                      <button className="btn-editar">Editar</button>
                      <button
                        className="btn-eliminar"
                        onClick={() => {
                          if (window.confirm("¿Eliminar registro?")) {
                            handleEliminar(r.id, idx);
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="pagination">
          <span className="page-info">
            Página {page} de {totalPages}
          </span>
          <nav>
            {page > 1 && (
              <button
                className="btn-paginacion"
                onClick={() => setPage(page - 1)}
              >
                ‹ Anterior
              </button>
            )}

            {page < totalPages && (
              <button
                className="btn-paginacion"
                onClick={() => setPage(page + 1)}
              >
                Siguiente ›
              </button>
            )}
          </nav>
        </div>
      </section>
    </>
  );
};

export default ContadorDiarioBombeo;