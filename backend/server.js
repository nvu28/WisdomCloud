import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());

const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

const VALID_SORT_FIELDS = ['name', 'provider', 'price', 'category'];
const ALLOWED_SORT_DIRS = ['asc', 'desc'];
const MAX_SIZE = 100;

app.get('/api/v1/cloud-services/search', (req, res) => {
  try {
    const { q, category, provider, minPrice, maxPrice } = req.query;
    let sort = req.query.sort || 'price:asc';
    let page = parseInt(req.query.page) || 0;
    let size = parseInt(req.query.size) || 20;

    if (page < 0) page = 0;
    if (size < 1) size = 20;
    size = Math.min(size, MAX_SIZE);

    if (minPrice && (isNaN(minPrice) || parseFloat(minPrice) < 0)) {
      return res.status(400).json({ error: 'minPrice phải là số dương' });
    }
    if (maxPrice && (isNaN(maxPrice) || parseFloat(maxPrice) < 0)) {
      return res.status(400).json({ error: 'maxPrice phải là số dương' });
    }

    let filtered = [...services];

    if (q) {
      const kw = q.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(kw) ||
        s.provider.toLowerCase().includes(kw) ||
        s.specs.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw)
      );
    }

    if (category) {
      filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (provider) {
      filtered = filtered.filter(s => s.provider.toLowerCase().includes(provider.toLowerCase()));
    }

    if (minPrice) filtered = filtered.filter(s => s.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter(s => s.price <= parseFloat(maxPrice));

    const [fieldRaw, dirRaw] = sort.split(':');
    const field = VALID_SORT_FIELDS.includes(fieldRaw) ? fieldRaw : 'price';
    const dir = ALLOWED_SORT_DIRS.includes(dirRaw) ? dirRaw : 'asc';

    filtered.sort((a, b) => {
      let va = a[field] ?? '';
      let vb = b[field] ?? '';
      if (field === 'price') return dir === 'desc' ? vb - va : va - vb;
      va = String(va).toLowerCase();
      vb = String(vb).toLowerCase();
      return dir === 'desc' ? vb.localeCompare(va) : va.localeCompare(vb);
    });

    const start = page * size;
    const content = filtered.slice(start, start + size);
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);

    res.json({
      content,
      page,
      size,
      totalElements,
      totalPages,
      last: page >= totalPages - 1,
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

app.get('/api/v1/categories', (req, res) => {
  const cats = [...new Set(services.map(s => s.category))].sort();
  res.json(cats);
});

app.get('/api/v1/providers', (req, res) => {
  const provs = [...new Set(services.map(s => s.provider))].sort();
  res.json(provs);
});

app.get('/api/v1/cloud-services/stats', (req, res) => {
  const cats = {};
  const provs = {};
  services.forEach(s => {
    cats[s.category] = (cats[s.category] || 0) + 1;
    provs[s.provider] = (provs[s.provider] || 0) + 1;
  });
  res.json({ total: services.length, categories: cats, providers: provs });
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cloud Services API running on http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET /api/v1/cloud-services/search`);
  console.log(`  GET /api/v1/categories`);
  console.log(`  GET /api/v1/providers`);
  console.log(`  GET /api/v1/cloud-services/stats`);
});
