const BASE_URL = "/api/consumo-diario-bombeo";

export const getConsumoDiarioBombeo = async ({ bomba, fecha, page }) => {
  const params = new URLSearchParams({
    bomba,
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error("Error al cargar consumo diario bombeo");

  return response.json();
};

export const exportConsumoDiarioBombeo = (fecha) => {
  window.location.href = `/api/export-consumo-diario-bombeo?fecha=${fecha}`;
};