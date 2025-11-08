import axios from 'axios';

// URL base da API Spring Boot (pode ser configurada via .env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Instância do axios com configurações padrão
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

export default api;
