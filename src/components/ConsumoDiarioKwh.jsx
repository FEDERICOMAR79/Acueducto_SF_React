
import { useEffect, useState } from "react";
import "../styles/monthSelect.scss";
import "../styles/monthpicker-contador.scss";

const ConsumoDiarioKwh = () => {
  const [plantas, setPlantas] = useState([]);
  const [registros, setRegistros] = useState(JSON.parse(localStorage.getItem("contador_diario_kwh_registros") || "[]"));
  const [plantaId, setPlantaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  }, [plantaId, fecha, page]);

  // Calcular diferencias por planta (idéntico a ConsumoDiarioBombeo pero para plantas)
  const diferenciasPorPlanta = (() => {
    // Agrupar registros por planta
    const agrupados = {};
    registros.forEach((r) => {
      const plantaKey = r.plantaId || r.planta;
      if (!agrupados[plantaKey]) agrupados[plantaKey] = [];
      agrupados[plantaKey].push(r);
    });
    // Para cada planta, si hay al menos dos registros, tomar el último y el anterior, restar valores
    const resultado = [];
    Object.entries(agrupados).forEach(([plantaKey, regs]) => {
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
        planta: ultimo.planta,
        planta_id: ultimo.plantaId || ultimo.planta,
        valor: getValor(ultimo) - getValor(penultimo),
      });
    });
    return resultado;
  })();

  // Eliminar registro
  const handleEliminar = (id, idx) => {
    let registrosLS = JSON.parse(localStorage.getItem("contador_diario_kwh_registros") || "[]");
    if (id !== undefined && id !== null) {
      registrosLS = registrosLS.filter(r => r.id !== id);
    } else {
      registrosLS.splice(idx, 1);
    }
    localStorage.setItem("contador_diario_kwh_registros", JSON.stringify(registrosLS));
    // Actualizar vista
    setPage(1);
    setPlantaId("");
    setFecha("");
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
          <table className="consumo-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Planta</th>
                <th>Consumo (kWh)</th>
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
                diferenciasPorPlanta.map((d, idx) => (
                  <tr key={d.planta + d.fecha + idx}>
                    <td>{d.fecha}</td>
                    <td>{d.planta}</td>
                    <td>{d.valor}</td>
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