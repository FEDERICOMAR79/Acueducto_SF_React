const BASE_URL = "/api/contador-diario-bombeo";

export const getContadorDiarioBombeo = async ({ bomba, fecha, page }) => {
  const params = new URLSearchParams({
    bomba,
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error("Error al cargar contador diario bombeo");

  return response.json();
};

export const exportContadorDiarioBombeo = (fecha) => {
  window.location.href = `/api/export-contador-diario-bombeo?fecha=${fecha}`;
};

export const deleteContadorDiarioBombeoCascade = (registroAEliminar) => {
  const registrosLS = JSON.parse(localStorage.getItem("datosContadores") || "[]");
  const bombaIdEliminar = registroAEliminar?.bomba_id ?? registroAEliminar?.bombaId;
  const valorEliminar = Number(registroAEliminar?.valor);

  let nuevosRegistros = registrosLS;
  if (registroAEliminar?.id !== undefined && registroAEliminar?.id !== null) {
    nuevosRegistros = registrosLS.filter((r) => r.id !== registroAEliminar.id);
  } else {
    const idxReal = registrosLS.findIndex((r) => {
      const bombaIdRegistro = r.bomba_id ?? r.bombaId;
      const mismaFecha = r.fecha === registroAEliminar.fecha;
      const mismaBomba =
        (bombaIdRegistro !== undefined && bombaIdEliminar !== undefined && bombaIdRegistro == bombaIdEliminar) ||
        (r.bomba && registroAEliminar.bomba && r.bomba === registroAEliminar.bomba);
      const mismoValor = Number(r.valor) === valorEliminar;

      return mismaFecha && mismaBomba && mismoValor;
    });

    if (idxReal >= 0) {
      nuevosRegistros = [...registrosLS];
      nuevosRegistros.splice(idxReal, 1);
    } else {
      // Fallback: eliminar el primer registro de la misma fecha y bomba
      const idxFallback = registrosLS.findIndex((r) => {
        const bombaIdRegistro = r.bomba_id ?? r.bombaId;
        return (
          r.fecha === registroAEliminar.fecha &&
          ((bombaIdRegistro !== undefined && bombaIdEliminar !== undefined && bombaIdRegistro == bombaIdEliminar) ||
            (r.bomba && registroAEliminar.bomba && r.bomba === registroAEliminar.bomba))
        );
      });

      if (idxFallback >= 0) {
        nuevosRegistros = [...registrosLS];
        nuevosRegistros.splice(idxFallback, 1);
      }
    }
  }

  localStorage.setItem("datosContadores", JSON.stringify(nuevosRegistros));

  // Eliminar de consumo_diario_bombeo_registros
  const consumoLS = JSON.parse(localStorage.getItem("consumo_diario_bombeo_registros") || "[]");
  if (Array.isArray(consumoLS) && consumoLS.length > 0) {
    const bombaIdEliminarConsumo = registroAEliminar?.bomba_id ?? registroAEliminar?.bombaId;
    const consumoActualizado = consumoLS.filter(
      (r) =>
        !(
          r.fecha === registroAEliminar.fecha &&
          ((r.bomba_id ?? r.bombaId) == bombaIdEliminarConsumo || r.bomba === registroAEliminar.bomba)
        )
    );
    localStorage.setItem("consumo_diario_bombeo_registros", JSON.stringify(consumoActualizado));
  }

  // Eliminar de datosBombeo (consumo diario calculado)
  const datosBombeoLS = JSON.parse(localStorage.getItem("datosBombeo") || "[]");
  if (Array.isArray(datosBombeoLS) && datosBombeoLS.length > 0) {
    const datosBombeoActualizado = datosBombeoLS.filter(
      (r) =>
        !(
          r.fecha === registroAEliminar.fecha &&
          ((r.bomba_id ?? r.bombaId) == bombaIdEliminar || r.bomba === registroAEliminar.bomba)
        )
    );
    localStorage.setItem("datosBombeo", JSON.stringify(datosBombeoActualizado));
  }

  return nuevosRegistros;
};