import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:3000',
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
