import axios from 'axios';

const IS_VERCEL = import.meta.env.VITE_VERCEL === 'true';

const api = axios.create({
  baseURL: IS_VERCEL ? '/_/backend/api/v1' : '/api/v1',
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

export async function getServiceDetail(id) {
  const response = await api.get('/cloud-services/detail', { params: { id } });
  return response.data;
}

export async function getTldList() {
  const response = await api.get('/tlds');
  return response.data;
}

export async function checkDomain(domain) {
  const response = await api.post('/domains/check', { domain });
  return response.data;
}
