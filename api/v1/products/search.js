const products = [
  { id: 1, name: 'iPhone 16 Pro Max', slug: 'iphone-16-pro-max', description: 'Apple iPhone 16 Pro Max 256GB', price: 34990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 2, name: 'iPhone 16 Pro', slug: 'iphone-16-pro', description: 'Apple iPhone 16 Pro 128GB', price: 28990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 3, name: 'iPhone 16', slug: 'iphone-16', description: 'Apple iPhone 16 128GB', price: 22990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 4, name: 'Samsung Galaxy S25 Ultra', slug: 'samsung-galaxy-s25-ultra', description: 'Samsung Galaxy S25 Ultra 512GB', price: 32990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 5, name: 'Samsung Galaxy S25', slug: 'samsung-galaxy-s25', description: 'Samsung Galaxy S25 256GB', price: 21990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 6, name: 'Xiaomi 15 Pro', slug: 'xiaomi-15-pro', description: 'Xiaomi 15 Pro 512GB', price: 15990000, categoryName: 'Dien thoai', categorySlug: 'dien-thoai', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 7, name: 'MacBook Pro 16 M4', slug: 'macbook-pro-16-m4', description: 'Apple MacBook Pro 16 M4 Pro 512GB', price: 59990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 8, name: 'MacBook Air M4', slug: 'macbook-air-m4', description: 'Apple MacBook Air M4 256GB', price: 28990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 9, name: 'Dell XPS 16', slug: 'dell-xps-16', description: 'Dell XPS 16 Intel Core Ultra 9 32GB', price: 45990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 10, name: 'Lenovo ThinkPad X1', slug: 'lenovo-thinkpad-x1', description: 'Lenovo ThinkPad X1 Carbon Gen 12', price: 42990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 11, name: 'ASUS ROG Zephyrus G16', slug: 'asus-rog-zephyrus-g16', description: 'ASUS ROG Zephyrus G16 RTX 4070', price: 52990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 12, name: 'HP Spectre x360', slug: 'hp-spectre-x360', description: 'HP Spectre x360 2-in-1 16GB', price: 35990000, categoryName: 'Laptop', categorySlug: 'laptop', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 13, name: 'AirPods Pro 2', slug: 'airpods-pro-2', description: 'Apple AirPods Pro 2 USB-C', price: 6990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 14, name: 'Samsung Galaxy Buds3 Pro', slug: 'samsung-galaxy-buds3-pro', description: 'Samsung Galaxy Buds3 Pro ANC', price: 4990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 15, name: 'Sony WH-1000XM6', slug: 'sony-wh-1000xm6', description: 'Sony WH-1000XM6 Wireless ANC', price: 8990000, categoryName: 'Tai nghe', categorySlug: 'tai-nghe', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 16, name: 'Apple Watch Ultra 3', slug: 'apple-watch-ultra-3', description: 'Apple Watch Ultra 3 49mm', price: 21990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 17, name: 'Apple Watch Series 10', slug: 'apple-watch-series-10', description: 'Apple Watch Series 10 45mm', price: 12990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 18, name: 'Samsung Galaxy Watch7', slug: 'samsung-galaxy-watch7', description: 'Samsung Galaxy Watch7 44mm', price: 8990000, categoryName: 'Dong ho thong minh', categorySlug: 'dong-ho-thong-minh', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 19, name: 'Op lung iPhone 16', slug: 'op-lung-iphone-16', description: 'Op lung silicon chinh hang iPhone 16', price: 499000, categoryName: 'Phu kien', categorySlug: 'phu-kien', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
  { id: 20, name: 'Cap sac USB-C 2m', slug: 'cap-sac-usb-c-2m', description: 'Cap sac USB-C to USB-C 2m', price: 299000, categoryName: 'Phu kien', categorySlug: 'phu-kien', imageUrl: '', status: 'ACTIVE', createdAt: '2026-05-01T00:00:00Z' },
];

export default function handler(req, res) {
  const { q, category, minPrice, maxPrice, sort = 'name:asc' } = req.query;
  let page = parseInt(req.query.page) || 0;
  let size = parseInt(req.query.size) || 20;
  size = Math.min(size, 100);

  let filtered = [...products];

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
    filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  }

  const [field, dir] = sort.split(':');
  filtered.sort((a, b) => {
    const va = a[field] ?? '';
    const vb = b[field] ?? '';
    if (typeof va === 'string') {
      return dir === 'desc' ? vb.localeCompare(va) : va.localeCompare(vb);
    }
    return dir === 'desc' ? vb - va : va - vb;
  });

  const start = page * size;
  const content = filtered.slice(start, start + size);
  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / size);

  res.json({ content, page, size, totalElements, totalPages, last: page >= totalPages - 1 });
}
