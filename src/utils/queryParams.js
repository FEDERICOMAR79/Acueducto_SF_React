export const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
  );