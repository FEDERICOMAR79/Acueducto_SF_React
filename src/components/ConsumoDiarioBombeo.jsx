import { useEffect, useState } from "react";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";

const bombasEjemplo = [
  { bomba_id: 1, nombre: "Bomba Norte" },
  { bomba_id: 2, nombre: "Bomba Sur" },
];

const ConsumoDiarioBombeo = () => {
  const [registros, setRegistros] = useState(JSON.parse(localStorage.getItem("datosContadores") || "[]"));
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");

  // Filtrar registros por bomba y fecha
  const registrosFiltrados = registros.filter((reg) =>
    (bombaId === "" || reg.bomba_id == bombaId) &&
    (fecha === "" || reg.fecha.startsWith(fecha))
  );

  // Eliminar registro
  const handleEliminar = (id, idx) => {
    let nuevosRegistros = [...registros];
    if (id !== undefined && id !== null) {
      nuevosRegistros = nuevosRegistros.filter((r) => r.id !== id);
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
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="filtro-grupo">
            <label>Bomba:</label>
            <select
              value={bombaId}
              onChange={(e) => setBombaId(e.target.value)}
            >
              <option value="">-- Todas las bombas --</option>
              {bombasEjemplo.map((b) => (
                <option key={b.bomba_id} value={b.bomba_id}>
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
            <button className="btn-filtrar" type="button">Filtrar</button>
            <button
              type="button"
              className="btn-limpiar"
              onClick={() => {
                setBombaId("");
                setFecha("");
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
              {registrosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="4" className="tabla-vacia">
                    No hay registros para este día
                  </td>
                </tr>
              ) : (
                registrosFiltrados.map((r, idx) => (
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
      </section>
    </>
  );
};

export default ConsumoDiarioBombeo;