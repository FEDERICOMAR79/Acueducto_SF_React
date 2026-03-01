const BASE_URL = "/api/metros-cubicos-perdidos";

export const getM3Perdidos = async ({ fecha, page }) => {
  const params = new URLSearchParams({
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Error al cargar metros cúbicos perdidos");
  }

  return response.json();
};

export const exportM3Perdidos = (fecha) => {
  window.location.href = `/api/export-metros-cubicos-perdidos?fecha=${fecha}`;
};