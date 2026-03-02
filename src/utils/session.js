// src/utils/session.js
export const setCurrentUser = (username) => {
  localStorage.setItem('currentUser', username);
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser') || null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};
export const mesesEspanol = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];