import { useEffect, useState } from "react";
import "../../styles/monthSelect.css";
import "../../styles/monthpicker-contador.css";
import {
  getEficienciaBombeo,
  exportEficienciaBombeo,
} from "../../services/eficienciaBombeo";

const EficienciaBombeo = () => {
  const [fecha, setFecha] = useState("");
  const [registros, setRegistros] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [fecha, page]);

  const fetchData = async () => {
    const data = await getEficienciaBombeo({ fecha, page });
    setRegistros(data.registros);
    setTotalPages(data.total_pages);
  };

  return (
    <>
      {/* Header */}
      <div className="graficas-header">
        <header>
          <h1>Eficiencia de Bombeo</h1>
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
          onClick={() => exportEficienciaBombeo(fecha)}
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
                <th>Eficiencia de Bombeo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="3" className="tabla-vacia">
                    No hay registros disponibles.
                  </td>
                </tr>
              ) : (
                registros.map((e) => (
                  <tr key={e.id}>
                    <td>{e.fecha}</td>
                    <td>{e.eficiencia_bombeo}</td>
                    <td className="acciones">
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

export default EficienciaBombeo;