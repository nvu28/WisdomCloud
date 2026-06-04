import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export async function searchProducts({ q, category, minPrice, maxPrice, page, size, sort }) {
  const params = {};
  if (q) params.q = q;
  if (category) params.category = category;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  params.page = page ?? 0;
  params.size = size ?? 20;
  params.sort = sort ?? 'name:asc';

  const response = await api.get('/products/search', { params });
  return response.data;
}
