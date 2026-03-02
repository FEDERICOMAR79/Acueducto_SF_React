const BASE_URL = "/api/contador-diario-kwh";

export const getContadorDiarioKwh = async ({ planta, fecha, page }) => {
  const params = new URLSearchParams({
    planta,
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error("Error al cargar contador diario kWh");

  return response.json();
};

export const exportContadorDiarioKwh = (fecha) => {
  window.location.href = `/api/export-contador-diario-kwh?fecha=${fecha}`;
};
export const deleteContadorDiarioEnergiaCascade = (registroAEliminar) => {
  const registrosLS = JSON.parse(localStorage.getItem("datosPlantas") || "[]");
  const plantaIdEliminar = registroAEliminar?.planta_id ?? registroAEliminar?.plantaId;
  const valorEliminar = Number(registroAEliminar?.valor);

  let nuevosRegistros = registrosLS;
  if (registroAEliminar?.id !== undefined && registroAEliminar?.id !== null) {
    nuevosRegistros = registrosLS.filter((r) => r.id !== registroAEliminar.id)
  } else {
    const idxReal = registrosLS.findIndex((r) => {
      const plantaIdRegistro = r.planta_id ?? r.plantaId;
      const mismaFecha = r.fecha === registroAEliminar.fecha;
      const mismaPlanta =
        (plantaIdRegistro !== undefined && plantaIdEliminar !== undefined && plantaIdRegistro == plantaIdEliminar) ||
        (r.planta && registroAEliminar.planta && r.planta === registroAEliminar.planta);
      const mismoValor = Number(r.valor) === valorEliminar;

      return mismaFecha && mismaPlanta && mismoValor;
    });

    if (idxReal >= 0) {
      nuevosRegistros = [...registrosLS];
      nuevosRegistros.splice(idxReal, 1);
    } else {
      // Fallback: eliminar el primer registro de la misma fecha y planta
      const idxFallback = registrosLS.findIndex((r) => {
        const plantaIdRegistro = r.planta_id ?? r.plantaId;
        return (
          r.fecha === registroAEliminar.fecha &&
          ((plantaIdRegistro !== undefined && plantaIdEliminar !== undefined && plantaIdRegistro == plantaIdEliminar) ||
            (r.planta && registroAEliminar.planta && r.planta === registroAEliminar.planta))
        );
      });

      if (idxFallback >= 0) {
        nuevosRegistros = [...registrosLS];
        nuevosRegistros.splice(idxFallback, 1);
      }
    }
  }

  localStorage.setItem("datosPlantas", JSON.stringify(nuevosRegistros));

  const consumoLS = JSON.parse(localStorage.getItem("consumo_diario_kwh_registros") || "[]");
  if (Array.isArray(consumoLS) && consumoLS.length > 0) {
    const plantaIdEliminarConsumo = registroAEliminar?.planta_id ?? registroAEliminar?.plantaId;
    const consumoActualizado = consumoLS.filter(
      (r) =>
        !(
          r.fecha === registroAEliminar.fecha &&
          ((r.planta_id ?? r.plantaId) == plantaIdEliminarConsumo || r.planta === registroAEliminar.planta)
        )
    );
    localStorage.setItem("consumo_diario_kwh_registros", JSON.stringify(consumoActualizado));
  }

  return nuevosRegistros;
};