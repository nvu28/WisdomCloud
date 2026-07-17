import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
const tlds = JSON.parse(fs.readFileSync(path.join(__dirname, 'tlds.json'), 'utf-8'));

const JWT_SECRET = process.env.JWT_SECRET || 'wisdomcloud_jwt_secret_key_2024';
const users = [];
const seedAdmin = async () => {
  if (!users.find(u => u.email === 'admin@wisdomcloud.vn')) {
    const hashed = await bcrypt.hash('Admin123!', 10);
    users.push({
      id: users.length + 1,
      email: 'admin@wisdomcloud.vn',
      password: hashed,
      fullName: 'Admin',
      phone: '',
      company: 'WisdomCloud',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
  }
};
await seedAdmin();

const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const TAKEN_DOMAINS = ['google', 'facebook', 'youtube', 'amazon', 'wisdomcloud', 'wisdom', 'cloud', 'vietnam', 'shop', 'news', 'blog', 'hotel', 'travel', 'bank', 'money', 'game', 'vn', 'hanoi', 'saigon', 'dichvu', 'congnghe', 'thuongmai', 'giaido'];

const carts = {};
const orders = [];
const coupons = { 'WISDOM10': { discount: 0.1, minTotal: 0 }, 'CLOUD20': { discount: 0.2, minTotal: 200000 } };

const emailPlans = [
  { id: 1, name: 'Email Server 3GB', slug: 'email-server-3gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 24000, unit: 'vnd/tháng', mailboxes: 5, storage: '3GB', features: ['5 Email accounts', '3GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC'], isPopular: false },
  { id: 2, name: 'Email Server 10GB', slug: 'email-server-10gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 49000, unit: 'vnd/tháng', mailboxes: 10, storage: '10GB', features: ['10 Email accounts', '10GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC', 'Backup'], isPopular: true },
  { id: 3, name: 'Email Server 20GB', slug: 'email-server-20gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 99000, unit: 'vnd/tháng', mailboxes: 20, storage: '20GB', features: ['20 Email accounts', '20GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC', 'Backup', 'RBAC'], isPopular: false },
];

let nextMailId = 3;
const emails = [
  { id: 1, from: 'admin@wisdomcloud.vn', fromName: 'Admin WisdomCloud', to: 'admin@wisdomcloud.vn', subject: 'Chào mừng đến với WisdomCloud Webmail', body: 'Chào bạn,\n\nĐây là email đầu tiên từ hệ thống Webmail WisdomCloud.\n\nBạn có thể:\n- Gửi và nhận email trực tiếp từ giao diện web\n- Quản lý hộp thư đến và thư đã gửi\n- Soạn thư với định dạng văn bản\n\nMọi thắc mắc vui lòng liên hệ support@wisdomcloud.vn\n\nTrân trọng,\nWisdomCloud Team', sentAt: '2026-06-24T08:00:00.000Z', read: false, deletedBy: [], status: 'sent' },
  { id: 2, from: 'admin@wisdomcloud.vn', fromName: 'admin@wisdomcloud.vn', to: 'admin@wisdomcloud.vn', subject: 'Test Email', body: 'This is a test', sentAt: '2026-06-24T07:50:28.852Z', read: false, deletedBy: [], status: 'sent' },
];

const sslPlans = [
  { id: 1, name: 'Sectigo DV', slug: 'sectigo-dv', brand: 'sectigo', type: 'dv', price: 299000, unit: 'vnd/năm', validation: 'Domain', warranty: '$10,000', features: ['Domain validation', 'Issued in 5-10 minutes', '256-bit encryption', 'Free unlimited server license'], isPopular: false },
  { id: 2, name: 'Sectigo OV', slug: 'sectigo-ov', brand: 'sectigo', type: 'ov', price: 1200000, unit: 'vnd/năm', validation: 'Organization', warranty: '$1,000,000', features: ['Organization validation', 'Issued in 1-3 days', '256-bit encryption', 'Free unlimited server license'], isPopular: true },
  { id: 3, name: 'Sectigo EV', slug: 'sectigo-ev', brand: 'sectigo', type: 'ev', price: 4500000, unit: 'vnd/năm', validation: 'Extended', warranty: '$2,000,000', features: ['Extended validation', 'Green address bar', '256-bit encryption', 'Free unlimited server license'], isPopular: false },
];

const serverPlans = [
  { id: 1, name: 'VPS Lite', slug: 'vps-lite', type: 'vps', price: 175000, unit: 'vnd/tháng', features: ['1 vCPU', '2GB RAM', '50GB SSD NVMe', '1Tbps bandwidth', 'IPv4 + IPv6'], cores: '1 vCPU', ram: '2GB', storage: '50GB SSD NVMe', isPopular: false, color: '#2563eb' },
  { id: 2, name: 'Cloud Pro', slug: 'cloud-pro', type: 'vps', price: 499000, unit: 'vnd/tháng', features: ['2 vCPU', '4GB RAM', '100GB SSD NVMe', 'Unlimited bandwidth', 'IPv4 + IPv6', 'Auto scaling'], cores: '2 vCPU', ram: '4GB', storage: '100GB SSD NVMe', isPopular: true, color: '#2563eb' },
  { id: 3, name: 'Cloud Enterprise', slug: 'cloud-enterprise', type: 'vps', price: 1200000, unit: 'vnd/tháng', features: ['4 vCPU', '8GB RAM', '200GB SSD NVMe', 'Unlimited bandwidth', 'IPv4 + IPv6', 'Auto scaling', 'VIP support'], cores: '4 vCPU', ram: '8GB', storage: '200GB SSD NVMe', isPopular: false, color: '#2563eb' },
];

const hostingPlans = [
  { id: 1, name: 'Starter', slug: 'starter', type: 'shared', price: 33000, unit: 'vnd/tháng', features: ['1GB RAM', '10GB SSD', '1 Website', 'cPanel', 'SSL miễn phí'], ram: '1GB', storage: '10GB', bandwidth: '100GB', websites: 1, isPopular: false, color: '#059669' },
  { id: 2, name: 'Business', slug: 'business', type: 'shared', price: 99000, unit: 'vnd/tháng', features: ['2GB RAM', '30GB SSD', '10 Website', 'cPanel', 'SSL miễn phí', 'Backup hàng ngày'], ram: '2GB', storage: '30GB', bandwidth: '300GB', websites: 10, isPopular: true, color: '#059669' },
  { id: 3, name: 'Enterprise', slug: 'enterprise', type: 'shared', price: 249000, unit: 'vnd/tháng', features: ['4GB RAM', '80GB SSD', 'Không giới hạn Website', 'cPanel', 'SSL miễn phí', 'Backup hàng ngày', 'Hỗ trợ VIP'], ram: '4GB', storage: '80GB', bandwidth: '1TB', websites: -1, isPopular: false, color: '#059669' },
];

const VALID_SORT_FIELDS = ['name', 'provider', 'price', 'category'];
const ALLOWED_SORT_DIRS = ['asc', 'desc'];
const MAX_SIZE = 100;

const adminAuth = (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return null;
    }
    return decoded;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
};

const readBody = (req) => new Promise((resolve) => {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => resolve(JSON.parse(body)));
});

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (pathname === '/api/v1/debug') {
      let bodyVal;
      try { bodyVal = JSON.stringify(req.body); } catch(e) { bodyVal = 'ERR:' + e.message; }
      try {
        const rawBody = await new Promise((resolve) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => resolve(data));
          setTimeout(() => resolve('TIMEOUT_' + data), 3000);
        });
        return res.json({
          method: req.method,
          pathname,
          ct: req.headers['content-type'],
          cl: req.headers['content-length'],
          bodyJson: bodyVal,
          rawBody: rawBody || '(empty)',
          keys: Object.keys(req).filter(k => !k.startsWith('_'))
        });
      } catch(e) {
        return res.json({ error: e.message, stack: e.stack });
      }
    }
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

    if (pathname === '/api/v1/hosting/plans') {
      return res.json(hostingPlans);
    }

    if (pathname === '/api/v1/servers/plans') {
      return res.json(serverPlans);
    }

    if (pathname === '/api/v1/email/plans') {
      return res.json(emailPlans);
    }

    if (pathname === '/api/v1/ssl/plans') {
      return res.json(sslPlans);
    }

    if (pathname === '/api/v1/auth/register' && req.method === 'POST') {
      let body = '';
      await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
      const { email, password, fullName, phone } = JSON.parse(body);
      if (!email || !password || !fullName) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
      }
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email đã được đăng ký' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const newUser = {
        id: users.length + 1, email, password: hashed, fullName,
        phone: phone || '', company: '', role: 'customer',
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role } });
    }

    if (pathname === '/api/v1/auth/login' && req.method === 'POST') {
      let body = '';
      await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
      const { email, password } = JSON.parse(body);
      if (!email || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });
      }
      const user = users.find(u => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
    }

    if (pathname === '/api/v1/auth/profile' && req.method === 'GET') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        const { password, ...safe } = user;
        return res.json(safe);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/auth/profile' && req.method === 'PUT') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { fullName, phone, company, address } = JSON.parse(body);
        const idx = users.findIndex(u => u.id === decoded.id);
        if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        if (fullName) users[idx].fullName = fullName;
        if (phone !== undefined) users[idx].phone = phone;
        if (company !== undefined) users[idx].company = company;
        if (address !== undefined) users[idx].address = address;
        users[idx].updatedAt = new Date().toISOString();
        const { password, ...safe } = users[idx];
        return res.json(safe);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/auth/change-password' && req.method === 'POST') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { currentPassword, newPassword } = JSON.parse(body);
        if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
        if (newPassword.length < 6) return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        const idx = users.findIndex(u => u.id === decoded.id);
        if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        if (!(await bcrypt.compare(currentPassword, users[idx].password))) return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
        users[idx].password = await bcrypt.hash(newPassword, 10);
        users[idx].updatedAt = new Date().toISOString();
        return res.json({ message: 'Đổi mật khẩu thành công' });
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/domains/check' && req.method === 'POST') {
      let body = '';
      await new Promise((resolve) => {
        req.on('data', chunk => { body += chunk; });
        req.on('end', resolve);
      });
      const { domain } = JSON.parse(body);
      if (!domain) {
        return res.status(400).json({ error: 'Tên miền không hợp lệ' });
      }
      const input = domain.toLowerCase().trim();
      let name = input;
      let specificTld = null;
      const sorted = [...tlds].sort((a, b) => b.tld.length - a.tld.length);
      for (const t of sorted) {
        if (input.endsWith(t.tld)) {
          const p = input.slice(0, -t.tld.length);
          if (/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/.test(p)) {
            name = p;
            specificTld = t.tld;
            break;
          }
        }
      }
      if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/.test(name)) {
        return res.status(400).json({ error: 'Tên miền không hợp lệ' });
      }
      const results = tlds
        .filter(t => !specificTld || t.tld === specificTld)
        .map(t => {
          const isTaken = TAKEN_DOMAINS.includes(name) && Math.random() > 0.3;
          return {
            tld: t.tld,
            available: !isTaken,
            priceFirstYear: t.priceFirstYear,
            priceRenew: t.priceRenew,
            color: t.color,
          };
        });
      return res.json({ domain: name, results, specificTld });
    }

    if (pathname === '/api/v1/cart' && req.method === 'POST') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { serviceId, name, provider, category, price, quantity, duration } = JSON.parse(body);
        if (!carts[decoded.id]) carts[decoded.id] = { items: [], couponCode: null, discount: 0 };
        const cart = carts[decoded.id];
        const existing = cart.items.find(i => i.serviceId === serviceId);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + (quantity || 1);
        } else {
          cart.items.push({ serviceId, name, provider, category, price, quantity: quantity || 1, duration: duration || 1 });
        }
        cart.couponCode = null;
        cart.discount = 0;
        return res.json(cart);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/cart' && req.method === 'GET') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        return res.json(carts[decoded.id] || { items: [], couponCode: null, discount: 0 });
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/cart/item' && req.method === 'DELETE') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const serviceId = parseInt(url.searchParams.get('serviceId'));
        const cart = carts[decoded.id];
        if (!cart) return res.json({ items: [], couponCode: null, discount: 0 });
        cart.items = cart.items.filter(i => i.serviceId !== serviceId);
        cart.couponCode = null;
        cart.discount = 0;
        return res.json(cart);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/cart/item' && req.method === 'PUT') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const serviceId = parseInt(url.searchParams.get('serviceId'));
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { quantity } = JSON.parse(body);
        const cart = carts[decoded.id];
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        const item = cart.items.find(i => i.serviceId === serviceId);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        item.quantity = parseInt(quantity);
        cart.couponCode = null;
        cart.discount = 0;
        return res.json(cart);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/cart/coupon' && req.method === 'POST') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { code } = JSON.parse(body);
        const coupon = coupons[code];
        if (!coupon) return res.status(400).json({ error: 'Mã khuyến mãi không hợp lệ' });
        const cart = carts[decoded.id];
        if (!cart || !cart.items.length) return res.status(400).json({ error: 'Giỏ hàng trống' });
        const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        if (subtotal < coupon.minTotal) return res.status(400).json({ error: `Chưa đạt giá trị tối thiểu ${coupon.minTotal.toLocaleString()}₫` });
        cart.couponCode = code;
        cart.discount = subtotal * coupon.discount;
        return res.json(cart);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/orders' && req.method === 'POST') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        let body = '';
        await new Promise((resolve) => { req.on('data', chunk => { body += chunk; }); req.on('end', resolve); });
        const { paymentMethod, note } = JSON.parse(body);
        const cart = carts[decoded.id];
        if (!cart || !cart.items.length) return res.status(400).json({ error: 'Giỏ hàng trống' });
        const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const discount = cart.discount || 0;
        const total = subtotal - discount;
        const order = {
          orderCode: `DH${Date.now()}`,
          userId: decoded.id,
          items: [...cart.items],
          couponCode: cart.couponCode,
          discount,
          subtotal,
          total,
          paymentMethod: paymentMethod || 'manual',
          paymentStatus: 'unpaid',
          status: 'pending',
          note: note || '',
          createdAt: new Date().toISOString(),
        };
        orders.push(order);
        carts[decoded.id] = { items: [], couponCode: null, discount: 0 };
        return res.status(201).json(order);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/orders' && req.method === 'GET') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const userOrders = orders.filter(o => o.userId === decoded.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.json(userOrders);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname.startsWith('/api/v1/orders/') && req.method === 'GET') {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const orderCode = pathname.replace('/api/v1/orders/', '');
        const order = orders.find(o => o.orderCode === orderCode);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        if (order.userId !== decoded.id) return res.status(403).json({ error: 'Forbidden' });
        return res.json(order);
      } catch { return res.status(401).json({ error: 'Invalid token' }); }
    }

    if (pathname === '/api/v1/admin/stats') {
      const user = adminAuth(req, res);
      if (!user) return;
      const ordersByStatus = {};
      let totalRevenue = 0;
      orders.forEach(o => {
        ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
        if (o.paymentStatus === 'paid' || o.status === 'completed') totalRevenue += o.total;
      });
      const revenueByMonth = {};
      orders.forEach(o => {
        if (o.paymentStatus === 'paid' || o.status === 'completed') {
          const m = o.createdAt.slice(0, 7);
          revenueByMonth[m] = (revenueByMonth[m] || 0) + o.total;
        }
      });
      return res.json({
        totalUsers: users.length,
        totalOrders: orders.length,
        totalServices: services.length,
        totalRevenue,
        ordersByStatus,
        revenueByMonth,
      });
    }

    if (pathname === '/api/v1/admin/users' && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      return res.json(users.map(({ password, ...u }) => u));
    }

    if (pathname.startsWith('/api/v1/admin/users/') && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      const id = parseInt(pathname.replace('/api/v1/admin/users/', ''));
      const u = users.find(x => x.id === id);
      if (!u) return res.status(404).json({ error: 'User not found' });
      const { password, ...safe } = u;
      return res.json(safe);
    }

    if (pathname.startsWith('/api/v1/admin/users/') && req.method === 'PUT') {
      const user = adminAuth(req, res);
      if (!user) return;
      const id = parseInt(pathname.replace('/api/v1/admin/users/', ''));
      const idx = users.findIndex(x => x.id === id);
      if (idx === -1) return res.status(404).json({ error: 'User not found' });
      const body = await readBody(req);
      const { fullName, phone, company, address, role } = body;
      if (fullName !== undefined) users[idx].fullName = fullName;
      if (phone !== undefined) users[idx].phone = phone;
      if (company !== undefined) users[idx].company = company;
      if (address !== undefined) users[idx].address = address;
      if (role !== undefined) users[idx].role = role;
      users[idx].updatedAt = new Date().toISOString();
      const { password, ...safe } = users[idx];
      return res.json(safe);
    }

    if (pathname.startsWith('/api/v1/admin/users/') && req.method === 'DELETE') {
      const user = adminAuth(req, res);
      if (!user) return;
      const id = parseInt(pathname.replace('/api/v1/admin/users/', ''));
      const idx = users.findIndex(x => x.id === id);
      if (idx === -1) return res.status(404).json({ error: 'User not found' });
      users.splice(idx, 1);
      return res.json({ message: 'User deleted' });
    }

    if (pathname === '/api/v1/admin/services' && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      return res.json(services);
    }

    if (pathname === '/api/v1/admin/services' && req.method === 'POST') {
      const user = adminAuth(req, res);
      if (!user) return;
      const body = await readBody(req);
      const { name, slug, provider, category, price, unit, specs, cores, ram, storage, description } = body;
      const maxId = services.reduce((m, s) => Math.max(m, s.id), 0);
      const newService = {
        id: maxId + 1,
        name,
        slug,
        provider,
        category,
        price: parseInt(price),
        unit,
        specs: specs || '',
        cores: cores || '',
        ram: ram || '',
        storage: storage || '',
        description: description || '',
      };
      services.push(newService);
      return res.status(201).json(newService);
    }

    if (pathname.startsWith('/api/v1/admin/services/') && req.method === 'PUT') {
      const user = adminAuth(req, res);
      if (!user) return;
      const id = parseInt(pathname.replace('/api/v1/admin/services/', ''));
      const idx = services.findIndex(s => s.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Service not found' });
      const body = await readBody(req);
      const { name, slug, provider, category, price, unit, specs, cores, ram, storage, description } = body;
      if (name !== undefined) services[idx].name = name;
      if (slug !== undefined) services[idx].slug = slug;
      if (provider !== undefined) services[idx].provider = provider;
      if (category !== undefined) services[idx].category = category;
      if (price !== undefined) services[idx].price = parseInt(price);
      if (unit !== undefined) services[idx].unit = unit;
      if (specs !== undefined) services[idx].specs = specs;
      if (cores !== undefined) services[idx].cores = cores;
      if (ram !== undefined) services[idx].ram = ram;
      if (storage !== undefined) services[idx].storage = storage;
      if (description !== undefined) services[idx].description = description;
      return res.json(services[idx]);
    }

    if (pathname.startsWith('/api/v1/admin/services/') && req.method === 'DELETE') {
      const user = adminAuth(req, res);
      if (!user) return;
      const id = parseInt(pathname.replace('/api/v1/admin/services/', ''));
      const idx = services.findIndex(s => s.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Service not found' });
      services.splice(idx, 1);
      return res.json({ message: 'Service deleted' });
    }

    if (pathname === '/api/v1/admin/orders' && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      return res.json(orders);
    }

    if (pathname.startsWith('/api/v1/admin/orders/') && req.method === 'PUT') {
      const user = adminAuth(req, res);
      if (!user) return;
      const orderCode = pathname.replace('/api/v1/admin/orders/', '');
      const order = orders.find(o => o.orderCode === orderCode);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      const body = await readBody(req);
      const { status, paymentStatus } = body;
      if (status !== undefined) order.status = status;
      if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;
      order.updatedAt = new Date().toISOString();
      return res.json(order);
    }

    if (pathname === '/api/v1/admin/coupons' && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      return res.json(Object.entries(coupons).map(([code, data]) => ({ code, ...data })));
    }

    if (pathname === '/api/v1/admin/coupons' && req.method === 'POST') {
      const user = adminAuth(req, res);
      if (!user) return;
      const body = await readBody(req);
      const { code, discount, minTotal } = body;
      if (!code || discount === undefined) return res.status(400).json({ error: 'Missing code or discount' });
      coupons[code] = { discount: parseFloat(discount), minTotal: parseInt(minTotal) || 0 };
      return res.status(201).json({ code, discount: parseFloat(discount), minTotal: parseInt(minTotal) || 0 });
    }

    if (pathname.startsWith('/api/v1/admin/coupons/') && req.method === 'DELETE') {
      const user = adminAuth(req, res);
      if (!user) return;
      const code = pathname.replace('/api/v1/admin/coupons/', '');
      if (!coupons[code]) return res.status(404).json({ error: 'Coupon not found' });
      delete coupons[code];
      return res.json({ message: 'Coupon deleted' });
    }

    if (pathname === '/api/v1/admin/tlds' && req.method === 'GET') {
      const user = adminAuth(req, res);
      if (!user) return;
      return res.json(tlds);
    }

    if (pathname === '/api/v1/admin/tlds' && req.method === 'PUT') {
      const user = adminAuth(req, res);
      if (!user) return;
      const body = await readBody(req);
      const { tlds: newTlds } = body;
      if (!Array.isArray(newTlds)) return res.status(400).json({ error: 'Invalid tlds array' });
      tlds.length = 0;
      tlds.push(...newTlds);
      return res.json(tlds);
    }

    // ── Webmail ──────────────────────────────────────
    const userAuth = (req, res) => {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) { res.status(401).json({ error: 'Unauthorized' }); return null; }
      try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        if (!user) { res.status(401).json({ error: 'User not found' }); return null; }
        return user;
      } catch { res.status(401).json({ error: 'Invalid token' }); return null; }
    };

    if (pathname === '/api/v1/mail/inbox' && req.method === 'GET') {
      const user = userAuth(req, res);
      if (!user) return;
      return res.json(emails.filter(e => e.to === user.email && !e.deletedBy.includes(user.email)));
    }

    if (pathname === '/api/v1/mail/sent' && req.method === 'GET') {
      const user = userAuth(req, res);
      if (!user) return;
      return res.json(emails.filter(e => e.from === user.email && !e.deletedBy.includes(user.email)));
    }

    const mailMatch = pathname.match(/^\/api\/v1\/mail\/(\d+)$/);
    if (mailMatch && req.method === 'GET') {
      const user = userAuth(req, res);
      if (!user) return;
      const email = emails.find(e => e.id === parseInt(mailMatch[1]));
      if (!email) return res.status(404).json({ error: 'Email not found' });
      return res.json(email);
    }

    if (pathname === '/api/v1/mail/send' && req.method === 'POST') {
      const user = userAuth(req, res);
      if (!user) return;
      const body = await readBody(req);
      if (!body.to || !body.subject || !body.body) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.to)) {
        return res.status(400).json({ error: 'Địa chỉ email người nhận không hợp lệ' });
      }
      const newEmail = {
        id: nextMailId++,
        from: user.email,
        fromName: user.fullName || user.email,
        to: body.to,
        subject: body.subject,
        body: body.body,
        sentAt: new Date().toISOString(),
        read: false,
        deletedBy: [],
        status: 'sending',
      };
      emails.push(newEmail);

      try {
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
          await mailTransporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME || user.fullName || 'WisdomCloud'}" <${process.env.SMTP_USER}>`,
            to: body.to,
            subject: body.subject,
            text: body.body,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1a1a2e; color: white; padding: 16px 24px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">WisdomCloud Webmail</h2>
              </div>
              <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
                <p style="color: #666; margin: 0 0 8px;"><strong>Từ:</strong> ${user.fullName || user.email} &lt;${user.email}&gt;</p>
                <p style="color: #666; margin: 0 0 16px;"><strong>Đến:</strong> ${body.to}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
                <div style="line-height: 1.6; color: #333;">${body.body.replace(/\n/g, '<br>')}</div>
              </div>
              <p style="color: #999; font-size: 12px; text-align: center; margin-top: 16px;">Sent from WisdomCloud Webmail</p>
            </div>`,
          });
          newEmail.status = 'sent';
        } else {
          newEmail.status = 'local_only';
        }
      } catch (err) {
        newEmail.status = 'failed';
        newEmail.error = err.message;
      }

      return res.status(201).json(newEmail);
    }

    const mailReadMatch = pathname.match(/^\/api\/v1\/mail\/(\d+)\/read$/);
    if (mailReadMatch && req.method === 'PUT') {
      const user = userAuth(req, res);
      if (!user) return;
      const email = emails.find(e => e.id === parseInt(mailReadMatch[1]));
      if (!email) return res.status(404).json({ error: 'Email not found' });
      email.read = true;
      return res.json({ message: 'Marked as read' });
    }

    if (mailMatch && req.method === 'DELETE') {
      const user = userAuth(req, res);
      if (!user) return;
      const email = emails.find(e => e.id === parseInt(mailMatch[1]));
      if (!email) return res.status(404).json({ error: 'Email not found' });
      if (!email.deletedBy.includes(user.email)) email.deletedBy.push(user.email);
      return res.json({ message: 'Email deleted' });
    }

    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}
