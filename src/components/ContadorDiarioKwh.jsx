import { useEffect, useState } from "react";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/creaciones.scss";
import { deleteContadorDiarioEnergiaCascade } from "../services/contadorDiarioKwh";

const ContadorDiarioKwh = () => {
  const [plantas, setPlantas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [plantaId, setPlantaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    // Load plantas from localStorage
    const plantasLS = JSON.parse(localStorage.getItem("plantas") || "[]");
    setPlantas(plantasLS);
    // Filter registros
    let registrosLS = JSON.parse(localStorage.getItem("datosPlantas") || "[]");
    let filtrados = registrosLS;
    if (plantaId) {
      filtrados = filtrados.filter(r => r.planta === plantaId || r.plantaId === plantaId);
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
  }, [plantaId, fecha, page, reloadTick]);

  // Eliminar registro
  const handleEliminar = (registroAEliminar) => {
    deleteContadorDiarioEnergiaCascade(registroAEliminar);
    setReloadTick((prev) => prev + 1);
  };

  return (
    <>
      <div className="graficas-header">
        <header>
          <h1>Contador Diario KWh</h1>
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
                registros.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td>{r.fecha}</td>
                    <td>{r.planta}</td>
                    <td>{r.valor || r.consumo_energia}</td>
                    <td className="acciones">
                      <button className="btn-editar">Editar</button>
                      <button
                        className="btn-eliminar"
                        onClick={() => {
                          if (window.confirm("¿Eliminar registro?")) {
                            handleEliminar(r);
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

export default ContadorDiarioKwh;