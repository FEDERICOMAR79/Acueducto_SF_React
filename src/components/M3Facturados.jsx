import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.css";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/dashboard.scss";
import "../styles/creaciones.scss";
import {
  getM3Facturados,
  exportM3Facturados,
  deleteM3Facturados,
} from "../services/m3Facturados";

const M3Facturados = () => {
  const [registros, setRegistros] = useState([]);
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    fetchData();
  }, [fecha, page, reloadTick]);

  const fetchData = async () => {
    const data = await getM3Facturados({
      fecha,
      page,
    });

    setRegistros(data.registros);
    setTotalPages(data.total_pages);
  };

  const handleEliminar = (r) => {
    deleteM3Facturados(r.id);
    setReloadTick((prev) => prev + 1);
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
            <label>Mes:</label>
            <Flatpickr
              id="monthpicker-m3-facturados"
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
                registros.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td>{r.fecha}</td>
                    <td>{r.metros_cubicos ?? r.m3fact ?? r.valor}</td>
                    <td>{r.usuario ?? "Local"}</td>
                    <td className="acciones">
                      <button className="btn-editar">Editar</button>
                      <button
                        className="btn-eliminar"
                        onClick={() => {
                          if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
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

export default M3Facturados;