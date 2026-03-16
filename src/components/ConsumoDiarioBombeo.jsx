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
import { deleteContadorDiarioBombeoCascade } from "../services/contadorDiarioBombeo";

const ConsumoDiarioBombeo = () => {
  const [registros, setRegistros] = useState(JSON.parse(localStorage.getItem("datosContadores") || "[]"));
  const [datosBombeo, setDatosBombeo] = useState(JSON.parse(localStorage.getItem("datosBombeo") || "[]"));
  const [bombaId, setBombaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  // Función para recalcular diferencias
  const recalcularDiferencias = () => {
    const registrosLS = JSON.parse(localStorage.getItem("datosContadores") || "[]");
    
    // Agrupar registros por bomba
    const agrupados = {};
    registrosLS.forEach((r) => {
      if (!agrupados[r.bomba_id]) agrupados[r.bomba_id] = [];
      agrupados[r.bomba_id].push(r);
    });
    
    // Calcular diferencias por bomba
    const resultado = [];
    Object.entries(agrupados).forEach(([bomba_id, regs]) => {
      if (regs.length < 2) return;
      
      // Ordenar por fecha ascendente
      const ordenados = regs.slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
      
      // Calcular diferencias entre cada par consecutivo
      for (let i = 1; i < ordenados.length; i++) {
        const anterior = ordenados[i - 1];
        const actual = ordenados[i];
        
        const getValor = (r) => {
          if (typeof r.valor !== 'undefined') return Number(r.valor);
          return 0;
        };
        
        resultado.push({
          id: actual.id || `${actual.fecha}-${actual.bomba_id}`,
          fecha: actual.fecha,
          bomba: actual.bomba,
          bomba_id: actual.bomba_id,
          valor: getValor(actual) - getValor(anterior),
        });
      }
    });
    
    localStorage.setItem('datosBombeo', JSON.stringify(resultado));
    setDatosBombeo(resultado);
    setRegistros(registrosLS);
  };

  // Recalcular al montar y cuando cambie reloadTick
  useEffect(() => {
    recalcularDiferencias();
  }, [reloadTick]);

  // Detectar cambios en localStorage desde otras pestañas/componentes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'datosContadores') {
        recalcularDiferencias();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También recalcular cuando la ventana vuelve a tener foco
    const handleFocus = () => {
      recalcularDiferencias();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Filtrar datos de bombeo por bomba y fecha
  const datosFiltrados = datosBombeo.filter((d) =>
    (bombaId === "" || d.bomba_id == bombaId) &&
    (fecha === "" || d.fecha.startsWith(fecha))
  );

  // Eliminar registro
  const handleEliminar = (registro) => {
    if (window.confirm("¿Eliminar este registro?")) {
      deleteContadorDiarioBombeoCascade(registro);
      setReloadTick((prev) => prev + 1);
    }
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
              {datosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="3" className="tabla-vacia">
                    No hay registros
                  </td>
                </tr>
              ) : (
                datosFiltrados.map((d, idx) => (
                  <tr key={d.id || d.bomba + d.fecha + idx}>
                    <td>{d.fecha}</td>
                    <td>{d.bomba}</td>
                    <td>{d.valor.toFixed(2)} m³</td>
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