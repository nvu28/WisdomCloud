import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());

const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

app.get('/api/v1/cloud-services/search', (req, res) => {
  const { q, category, provider, minPrice, maxPrice, sort = 'price:asc' } = req.query;
  let page = parseInt(req.query.page) || 0;
  let size = parseInt(req.query.size) || 20;
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

  res.json({ content, page, size, totalElements, totalPages, last: page >= totalPages - 1 });
});

app.get('/api/v1/categories', (req, res) => {
  const cats = [...new Set(services.map(s => s.category))].sort();
  res.json(cats);
});

app.get('/api/v1/providers', (req, res) => {
  const provs = [...new Set(services.map(s => s.provider))].sort();
  res.json(provs);
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cloud API running on http://localhost:${PORT}`);
  console.log(`Search: GET /api/v1/cloud-services/search`);
});
