const BASE_URL = "/api/metros-cubicos-facturados";

export const getM3Facturados = async ({ bomba, fecha, page }) => {
  const params = new URLSearchParams({
    bomba,
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Error al cargar metros cúbicos facturados");
  }

  return response.json();
};

export const exportM3Facturados = (fecha) => {
  window.location.href = `/api/export-metros-cubicos-facturados?fecha=${fecha}`;
};