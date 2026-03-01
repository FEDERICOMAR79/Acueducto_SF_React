const BASE_URL = "/api/eficiencia-bombeo";

export const getEficienciaBombeo = async ({ fecha, page }) => {
  const params = new URLSearchParams({
    fecha,
    page,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Error al cargar eficiencia de bombeo");
  }

  return response.json();
};

export const exportEficienciaBombeo = (fecha) => {
  window.location.href = `/api/export-eficiencia-bombeo?fecha=${fecha}`;
};