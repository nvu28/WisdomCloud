import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 3000,
});

const MOCK_PRODUCTS = [
  { id: 1, name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max', description: 'Apple iPhone 16 Pro Max 256GB', price: 34990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 2, name: 'iPhone 16 Pro', slug: 'iphone-16-pro', description: 'Apple iPhone 16 Pro 128GB', price: 28990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 3, name: 'iPhone 16', slug: 'iphone-16', description: 'Apple iPhone 16 128GB', price: 22990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 4, name: 'Samsung Galaxy S25 Ultra', slug: 'samsung-galaxy-s25-ultra', description: 'Samsung Galaxy S25 Ultra 512GB', price: 32990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 5, name: 'Samsung Galaxy S25', slug: 'samsung-galaxy-s25', description: 'Samsung Galaxy S25 256GB', price: 21990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 6, name: 'Xiaomi 15 Pro', slug: 'xiaomi-15-pro', description: 'Xiaomi 15 Pro 512GB', price: 15990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 7, name: 'MacBook Pro 16 M4', slug: 'macbook-pro-16-m4', description: 'Apple MacBook Pro 16 M4 Pro 512GB', price: 59990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 8, name: 'MacBook Air M4', slug: 'macbook-air-m4', description: 'Apple MacBook Air M4 256GB', price: 28990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 9, name: 'Dell XPS 16', slug: 'dell-xps-16', description: 'Dell XPS 16 Intel Core Ultra 9 32GB', price: 45990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 10, name: 'Lenovo ThinkPad X1', slug: 'lenovo-thinkpad-x1', description: 'Lenovo ThinkPad X1 Carbon Gen 12', price: 42990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 11, name: 'ASUS ROG Zephyrus G16', slug: 'asus-rog-zephyrus-g16', description: 'ASUS ROG Zephyrus G16 RTX 4070', price: 52990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 12, name: 'HP Spectre x360', slug: 'hp-spectre-x360', description: 'HP Spectre x360 2-in-1 16GB', price: 35990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 13, name: 'AirPods Pro 2', slug: 'airpods-pro-2', description: 'Apple AirPods Pro 2 USB-C', price: 6990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 14, name: 'Samsung Galaxy Buds3 Pro', slug: 'samsung-galaxy-buds3-pro', description: 'Samsung Galaxy Buds3 Pro ANC', price: 4990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 15, name: 'Sony WH-1000XM6', slug: 'sony-wh-1000xm6', description: 'Sony WH-1000XM6 Wireless ANC', price: 8990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 16, name: 'Apple Watch Ultra 3', slug: 'apple-watch-ultra-3', description: 'Apple Watch Ultra 3 49mm', price: 21990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 17, name: 'Apple Watch Series 10', slug: 'apple-watch-series-10', description: 'Apple Watch Series 10 45mm', price: 12990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 18, name: 'Samsung Galaxy Watch7', slug: 'samsung-galaxy-watch7', description: 'Samsung Galaxy Watch7 44mm', price: 8990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 19, name: 'Op lung iPhone 16', slug: 'op-lung-iphone-16', description: 'Op lung silicon chinh hang iPhone 16', price: 499000, categoryName: 'Phu kien', categorySlug: 'phu-kien', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
  { id: 20, name: 'Cap sac USB-C 2m', slug: 'cap-sac-usb-c-2m', description: 'Cap sac USB-C to USB-C 2m', price: 299000, categoryName: 'Phu kien', categorySlug: 'phu-kien', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00' },
];

function filterMock({ q, category, minPrice, maxPrice, page = 0, size = 20, sort = 'name:asc' }) {
  let filtered = [...MOCK_PRODUCTS];

  if (q) {
    const kw = q.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw)
    );
  }
  if (category) {
    filtered = filtered.filter(p => p.categorySlug === category);
  }
  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  // sort
  const [field, dir] = sort.split(':');
  filtered.sort((a, b) => {
    const va = a[field] ?? '';
    const vb = b[field] ?? '';
    if (typeof va === 'string') {
      return dir === 'desc' ? vb.localeCompare(va) : va.localeCompare(vb);
    }
    return dir === 'desc' ? vb - va : va - vb;
  });

  const validatedSize = Math.min(size, 100);
  const start = page * validatedSize;
  const content = filtered.slice(start, start + validatedSize);
  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / validatedSize);

  return {
    content,
    page,
    size: validatedSize,
    totalElements,
    totalPages,
    last: page >= totalPages - 1,
  };
}

export async function searchProducts(params) {
  try {
    const response = await api.get('/products/search', { params });
    return response.data;
  } catch {
    // fallback to mock when backend is not available
    await new Promise(r => setTimeout(r, 300));
    return filterMock(params);
  }
}
