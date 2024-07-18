import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookish.empereur.me/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } 
    else {
      config.headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
