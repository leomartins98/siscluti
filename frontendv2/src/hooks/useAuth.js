export const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Exemplo com localStorage
};