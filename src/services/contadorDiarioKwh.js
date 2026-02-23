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