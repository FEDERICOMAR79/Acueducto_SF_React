import { useEffect, useState } from "react";
import "../styles/monthSelect.css";
import "../styles/monthpicker-contador.css";

const ConsumoDiarioKwh = () => {
  const [plantas, setPlantas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [plantaId, setPlantaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [plantaId, fecha, page]);

  const fetchData = async () => {
    const params = new URLSearchParams({
      planta: plantaId,
      fecha,
      page,
    });

    const res = await fetch(`/api/consumo-diario-kwh?${params}`);
    const data = await res.json();

    setPlantas(data.plantas);
    setRegistros(data.registros);
    setTotalPages(data.total_pages);
  };

  return (
    <>
      {/* Header */}
      <div className="graficas-header">
        <header>
          <h1>Consumo Diario KWh</h1>
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
            <label>Planta:</label>
            <select
              value={plantaId}
              onChange={(e) => setPlantaId(e.target.value)}
            >
              <option value="">-- Todas las plantas --</option>
              {plantas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
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
                setPlantaId("");
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
        <a
          className="btn-filtrar"
          href={`/api/export-consumo-diario-kwh?fecha=${fecha}`}
        >
          Descargar XLSX
        </a>
      </div>

      {/* Tabla */}
      <section className="dashboard-latest">
        <div className="tabla-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Planta</th>
                <th>Consumo (kWh)</th>
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
                registros.map((r) => (
                  <tr key={r.id}>
                    <td>{r.fecha}</td>
                    <td>{r.planta}</td>
                    <td>{r.consumo_energia}</td>
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

export default ConsumoDiarioKwh;