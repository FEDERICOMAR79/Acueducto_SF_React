const BASE_URL = "/api/consumo-diario-kwh";

export const getConsumoDiarioKwh = async ({ planta, fecha, page }) => {
  const params = new URLSearchParams({
    planta,
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error("Error al cargar consumo diario kWh");

  return response.json();
};

export const exportConsumoDiarioKwh = (fecha) => {
  window.location.href = `/api/export-consumo-diario-kwh?fecha=${fecha}`;
};