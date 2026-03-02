import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.css";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/dashboard.scss";
import "../styles/creaciones.scss";
import { deleteContadorDiarioBombeoCascade } from "../services/contadorDiarioBombeo";
import { bombasEjemplo } from '../services/Bombas';

const ContadorDiarioBombeo = () => {
  const [bombas, setBombas] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    // Load bombas from service
    setBombas(bombasEjemplo);
    // Filter registros
    let registrosLS = JSON.parse(localStorage.getItem("datosContadores") || "[]");
    let filtrados = registrosLS;
    if (bombaId) {
      filtrados = filtrados.filter(r => r.bomba_id == bombaId || r.bombaId == bombaId || r.bomba == bombaId);
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
  }, [bombaId, fecha, page, reloadTick]);

  // Eliminar registro
  // ...existing code...

  const handleEliminar = (registroAEliminar) => {
    deleteContadorDiarioBombeoCascade(registroAEliminar);

    // Refrescar vista
    setPage(1);
    setBombaId("");
    setFecha("");
    setReloadTick((prev) => prev + 1);
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
                <option key={b.bomba_id} value={b.bomba_id}>
                  {b.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Mes:</label>
            <Flatpickr
              id="monthpicker-unico-por-componente"  // ID único para evitar conflictos
              className="flatpickr-input"             // ← MISMA CLASE para que use los estilos
              value={fecha}
              onChange={(selectedDates, dateStr) => setFecha(dateStr)}
              options={{
                locale: Spanish,
                dateFormat: "Y-m",
                allowInput: false,
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
          <table className="data-table">
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

export default ContadorDiarioBombeo;