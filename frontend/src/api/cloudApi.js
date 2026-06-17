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

export async function registerUser(data) {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export async function loginUser(data) {
  const response = await api.post('/auth/login', data);
  return response.data;
}

export async function getProfile(token) {
  const response = await api.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function updateProfile(token, data) {
  const response = await api.put('/auth/profile', data, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

export async function changePassword(token, data) {
  const response = await api.post('/auth/change-password', data, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
}

function authHeaders() {
  const token = localStorage.getItem('wc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCart() {
  const response = await api.get('/cart', { headers: authHeaders() });
  return response.data;
}

export async function addToCart(data) {
  const response = await api.post('/cart', data, { headers: authHeaders() });
  return response.data;
}

export async function removeFromCart(serviceId) {
  const response = await api.delete(`/cart/item/${serviceId}`, { headers: authHeaders() });
  return response.data;
}

export async function updateCartItem(serviceId, data) {
  const response = await api.put(`/cart/item/${serviceId}`, data, { headers: authHeaders() });
  return response.data;
}

export async function applyCoupon(code) {
  const response = await api.post('/cart/coupon', { code }, { headers: authHeaders() });
  return response.data;
}

export async function createOrder(data) {
  const response = await api.post('/orders', data, { headers: authHeaders() });
  return response.data;
}

export async function getOrders() {
  const response = await api.get('/orders', { headers: authHeaders() });
  return response.data;
}

export async function getOrderDetail(orderCode) {
  const response = await api.get(`/orders/${orderCode}`, { headers: authHeaders() });
  return response.data;
}
