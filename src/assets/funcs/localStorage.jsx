export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const readAllLocalStorage = () => {
  return { ...localStorage };
};
export const readLocalStorageItem = (name) => {
  return localStorage.getItem(name);
};
export const removeFromStorage = (name) => {
  localStorage.removeItem(name);
};
export const clearLocalStorage = () => {
  localStorage.clear();
};
