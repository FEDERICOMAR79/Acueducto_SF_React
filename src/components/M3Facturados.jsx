import { useEffect, useState } from "react";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import {
  getM3Facturados,
  exportM3Facturados,
} from "../services/m3Facturados";

const M3Facturados = () => {
  const [bombas, setBombas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [bombaId, fecha, page]);

  const fetchData = async () => {
    const data = await getM3Facturados({
      bomba: bombaId,
      fecha,
      page,
    });

    setBombas(data.bombas);
    setRegistros(data.registros);
    setTotalPages(data.total_pages);
  };

  return (
    <>
      {/* Header */}
      <div className="graficas-header">
        <header>
          <h1>Metros Cúbicos Facturados</h1>
        </header>
      </div>

      {/* Filtros */}
      <section className="filtros-section">
        <form
          className="filtros-form"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            fetchData();
          }}
        >
          <div className="filtro-grupo">
            <label>Bomba:</label>
            <select
              value={bombaId}
              onChange={(e) => setBombaId(e.target.value)}
            >
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

      {/* Exportar */}
      <div className="filtro-grupo">
        <button
          className="btn-filtrar"
          onClick={() => exportM3Facturados(fecha)}
        >
          Descargar XLSX
        </button>
      </div>

      {/* Tabla */}
      <section className="dashboard-latest">
        <div className="tabla-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Metros Cúbicos (m³)</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="4" className="tabla-vacia">
                    No hay registros disponibles.
                  </td>
                </tr>
              ) : (
                registros.map((r) => (
                  <tr key={r.id}>
                    <td>{r.fecha}</td>
                    <td>{r.metros_cubicos}</td>
                    <td>{r.usuario}</td>
                    <td className="acciones">
                      <button className="btn-editar">Editar</button>
                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          window.confirm(
                            "¿Estás seguro de que deseas eliminar este registro?"
                          )
                        }
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

export default M3Facturados;