import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://mini-saas-task-app-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (email, password) => api.post('/auth/signup', { email, password });

// Task services
export const getTasks = () => api.get('/tasks');
export const createTask = (title) => api.post('/tasks', { title });
export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
