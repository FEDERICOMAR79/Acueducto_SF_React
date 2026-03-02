import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.css";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/creaciones.scss";
import { deleteContadorDiarioEnergiaCascade } from "../services/contadorDiarioKwh";
import { plantasEjemplo } from '../services/Plantas';

const ContadorDiarioKwh = () => {
  const [plantas, setPlantas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [plantaId, setPlantaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    // Load plantas from service
    setPlantas(plantasEjemplo);
    // Filter registros
    let registrosLS = JSON.parse(localStorage.getItem("datosPlantas") || "[]");
    let filtrados = registrosLS;
    if (plantaId) {
      filtrados = filtrados.filter(r => r.planta_id == plantaId || r.plantaId == plantaId || r.planta == plantaId);
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
                <option key={p.planta_id} value={p.planta_id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Mes:</label>
            <Flatpickr
              id="monthpicker-contador-kwh"
              className="flatpickr-input"
              value={fecha}
              onChange={(selectedDates, dateStr) => setFecha(dateStr)}
              options={{
                locale: Spanish,
                dateFormat: "Y-m",
                allowInput: false,
                disableMobile: true,
                plugins: [
                  monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "Y-m",
                    altFormat: "F Y",
                  }),
                ],
              }}
              placeholder="Selecciona un mes"
            />
          </div>

          <div className="filtro-grupo">
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