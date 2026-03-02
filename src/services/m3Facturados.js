export const getM3Facturados = async ({ bomba, fecha, page }) => {
  const pageSize = 10;
  const currentPage = Number(page) || 1;

  const bombasLS = JSON.parse(localStorage.getItem("bombas") || "[]");
  const bombas = bombasLS.map((b) => ({
    id: b.id ?? b.bomba_id,
    nombre: b.nombre,
  }));

  const registrosLS = JSON.parse(localStorage.getItem("M3Facturados") || "[]");
  let filtrados = registrosLS;

  if (bomba) {
    filtrados = filtrados.filter((r) => {
      const bombaRegistro = r.bomba_id ?? r.bombaId;
      return (
        String(bombaRegistro ?? "") === String(bomba) ||
        String(r.bomba ?? "") === String(bomba)
      );
    });
  }

  if (fecha) {
    filtrados = filtrados.filter((r) => r.fecha && r.fecha.startsWith(fecha));
  }

  const totalPages = Math.max(1, Math.ceil(filtrados.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    bombas,
    registros: filtrados.slice(start, end),
    total_pages: totalPages,
  };
};

export const exportM3Facturados = (fecha) => {
  const registrosLS = JSON.parse(localStorage.getItem("M3Facturados") || "[]");
  const filtrados = fecha
    ? registrosLS.filter((r) => r.fecha && r.fecha.startsWith(fecha))
    : registrosLS;

  const encabezado = ["fecha", "metros_cubicos", "usuario"];
  const filas = filtrados.map((r) => [
    r.fecha ?? "",
    r.metros_cubicos ?? r.m3fact ?? "",
    r.usuario ?? "",
  ]);

  const csv = [encabezado, ...filas]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `m3_facturados${fecha ? `_${fecha}` : ""}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const deleteM3Facturados = (id) => {
  const registrosLS = JSON.parse(localStorage.getItem("M3Facturados") || "[]");
  const registrosFiltrados = registrosLS.filter((reg) => reg.id !== id);
  localStorage.setItem("M3Facturados", JSON.stringify(registrosFiltrados));
  return registrosFiltrados;
};