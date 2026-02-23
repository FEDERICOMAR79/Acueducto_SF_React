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