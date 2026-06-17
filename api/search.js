import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
const tlds = JSON.parse(fs.readFileSync(path.join(__dirname, 'tlds.json'), 'utf-8'));

const TAKEN_DOMAINS = ['google', 'facebook', 'youtube', 'amazon', 'wisdomcloud', 'wisdom', 'cloud', 'vietnam', 'shop', 'news', 'blog', 'hotel', 'travel', 'bank', 'money', 'game', 'vn', 'hanoi', 'saigon', 'dichvu', 'congnghe', 'thuongmai', 'giaido'];

const VALID_SORT_FIELDS = ['name', 'provider', 'price', 'category'];
const ALLOWED_SORT_DIRS = ['asc', 'desc'];
const MAX_SIZE = 100;

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (pathname === '/api/v1/categories') {
      const cats = [...new Set(services.map(s => s.category))].sort();
      return res.json(cats);
    }

    if (pathname === '/api/v1/providers') {
      const provs = [...new Set(services.map(s => s.provider))].sort();
      return res.json(provs);
    }

    if (pathname === '/api/v1/cloud-services/detail') {
      const id = parseInt(url.searchParams.get('id'));
      const slug = url.searchParams.get('slug');
      if (!id && !slug) return res.status(400).json({ error: 'Thiếu id hoặc slug' });
      const service = id
        ? services.find(s => s.id === id)
        : services.find(s => s.slug === slug);
      if (!service) return res.status(404).json({ error: 'Không tìm thấy dịch vụ' });
      return res.json(service);
    }

    if (pathname === '/api/v1/cloud-services/stats') {
      const cats = {};
      const provs = {};
      services.forEach(s => {
        cats[s.category] = (cats[s.category] || 0) + 1;
        provs[s.provider] = (provs[s.provider] || 0) + 1;
      });
      return res.json({ total: services.length, categories: cats, providers: provs });
    }

    if (pathname === '/api/v1/cloud-services/search') {
      const { q, category, provider, minPrice, maxPrice } = Object.fromEntries(url.searchParams);
      let sort = url.searchParams.get('sort') || 'price:asc';
      let page = parseInt(url.searchParams.get('page')) || 0;
      let size = parseInt(url.searchParams.get('size')) || 20;

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

      return res.json({
        content, page, size, totalElements, totalPages,
        last: page >= totalPages - 1,
      });
    }

    if (pathname === '/api/v1/tlds') {
      return res.json(tlds);
    }

    if (pathname === '/api/v1/domains/check' && req.method === 'POST') {
      let body = '';
      await new Promise((resolve) => {
        req.on('data', chunk => { body += chunk; });
        req.on('end', resolve);
      });
      const { domain } = JSON.parse(body);
      if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/.test(domain)) {
        return res.status(400).json({ error: 'Tên miền không hợp lệ' });
      }
      const name = domain.toLowerCase();
      const results = tlds.map(t => {
        const isTaken = TAKEN_DOMAINS.includes(name) && Math.random() > 0.3;
        return {
          tld: t.tld,
          available: !isTaken,
          priceFirstYear: t.priceFirstYear,
          priceRenew: t.priceRenew,
          color: t.color,
        };
      });
      return res.json({ domain: name, results });
    }

    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}
