import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.css";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";
import "../styles/dashboard.scss";
import "../styles/creaciones.scss";
import { bombasEjemplo } from "../services/Bombas";

const ConsumoDiarioBombeo = () => {
  const [registros, setRegistros] = useState(JSON.parse(localStorage.getItem("datosContadores") || "[]"));
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");

  // Filtrar registros por bomba y fecha PRIMERO
  const registrosFiltrados = registros.filter((reg) =>
    (bombaId === "" || reg.bomba_id == bombaId) &&
    (fecha === "" || reg.fecha.startsWith(fecha))
  );

  // Calcular diferencias por bomba usando los registros YA FILTRADOS
  const diferenciasPorBomba = (() => {
    // Agrupar registros por bomba
    const agrupados = {};
    registrosFiltrados.forEach((r) => {
      if (!agrupados[r.bomba_id]) agrupados[r.bomba_id] = [];
      agrupados[r.bomba_id].push(r);
    });
    // Para cada bomba, si hay al menos dos registros, tomar el último y el anterior, restar valores
    const resultado = [];
    Object.entries(agrupados).forEach(([bomba_id, regs]) => {
      if (regs.length < 2) return;
      // Ordenar por fecha ascendente
      const ordenados = regs.slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
      const penultimo = ordenados[ordenados.length - 2];
      const ultimo = ordenados[ordenados.length - 1];
      // Buscar el campo numérico correcto
      const getValor = (r) => {
        if (typeof r.valor !== 'undefined') return Number(r.valor);
        if (typeof r.consumo !== 'undefined') return Number(r.consumo);
        if (typeof r.consumo_energia !== 'undefined') return Number(r.consumo_energia);
        return 0;
      };
      resultado.push({
        fecha: ultimo.fecha,
        bomba: ultimo.bomba,
        bomba_id: ultimo.bomba_id,
        valor: getValor(ultimo) - getValor(penultimo),
      });
    });
    return resultado;
  })();

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
            <Flatpickr
              id="monthpicker-consumo-bombeo"
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
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="3" className="tabla-vacia">
                    No hay registros para este día
                  </td>
                </tr>
              ) : (
                diferenciasPorBomba.map((d, idx) => (
                  <tr key={d.bomba + d.fecha + idx}>
                    <td>{d.fecha}</td>
                    <td>{d.bomba}</td>
                    <td>{d.valor}</td>
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