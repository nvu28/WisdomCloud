import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/api/v1/categories') {
    const cats = [...new Set(services.map(s => s.category))].sort();
    return res.json(cats);
  }

  if (pathname === '/api/v1/providers') {
    const provs = [...new Set(services.map(s => s.provider))].sort();
    return res.json(provs);
  }

  if (pathname === '/api/v1/cloud-services/search') {
    const { q, category, provider, minPrice, maxPrice, sort = 'price:asc' } = Object.fromEntries(url.searchParams);
    let page = parseInt(url.searchParams.get('page')) || 0;
    let size = parseInt(url.searchParams.get('size')) || 20;
    size = Math.min(size, 100);

    let filtered = [...services];

    if (q) {
      const kw = q.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(kw) ||
        s.provider.toLowerCase().includes(kw) ||
        s.specs.toLowerCase().includes(kw)
      );
    }
    if (category) {
      filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (provider) {
      filtered = filtered.filter(s => s.provider.toLowerCase().includes(provider.toLowerCase()));
    }
    if (minPrice) {
      filtered = filtered.filter(s => s.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(s => s.price <= parseFloat(maxPrice));
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

    return res.json({ content, page, size, totalElements, totalPages, last: page >= totalPages - 1 });
  }

  res.status(404).json({ error: 'Not found' });
}
