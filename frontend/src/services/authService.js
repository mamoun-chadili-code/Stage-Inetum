import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token'); 