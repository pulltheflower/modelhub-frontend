export const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8080';

export const API_ENDPOINTS = {
  tags: `${API_HOST}/api/v1/tags`,
  models: `${API_HOST}/api/v1/models`,
  datasets: `${API_HOST}/api/v1/datasets`,
}; 