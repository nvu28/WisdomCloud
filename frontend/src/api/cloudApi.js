import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

export async function searchServices(params) {
  const response = await api.get('/cloud-services/search', { params });
  return response.data;
}

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data;
}

export async function getProviders() {
  const response = await api.get('/providers');
  return response.data;
}
