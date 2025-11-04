import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const registerRequest = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data.data;
};

export const loginRequest = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data.data;
};

export const currentUserRequest = async () => {
  const { data } = await api.get('/auth/me');
  return data.data.user;
};

export const fetchMenus = async () => {
  const { data } = await api.get('/menus');
  return data.data.menus;
};

export const createMenuRequest = async (payload) => {
  const { data } = await api.post('/menus', payload);
  return data.data.menu;
};

export default api;
