let token = localStorage.getItem('token') || null;

export const API_URL = "http://localhost:3000/api";
export const getToken = () => token;
export const setToken = (newToken) => {
  token = newToken;
  newToken ? 
    localStorage.setItem('token', newToken) : 
    localStorage.removeItem('token');
};