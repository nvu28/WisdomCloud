import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

mailTransporter.verify().then(() => {
  console.log('SMTP connection verified OK');
}).catch(err => {
  console.warn('SMTP verification failed:', err.message);
  console.warn('Emails will be saved locally only (no real sending)');
});
const app = express();
app.use(cors());
app.use(express.json());

const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
const tlds = JSON.parse(fs.readFileSync(path.join(__dirname, 'tlds.json'), 'utf-8'));

const JWT_SECRET = process.env.JWT_SECRET || 'wisdomcloud_jwt_secret_key_2024';
const USERS_PATH = path.join(__dirname, 'users.json');

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
  } catch { return []; }
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
};

const seedAdmin = async () => {
  const users = readUsers();
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
    writeUsers(users);
  }
};
await seedAdmin();

const DATA_PATH = path.join(__dirname, 'data.json');
const TLDS_PATH = path.join(__dirname, 'tlds.json');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const emailPlans = [
  { id: 1, name: 'Email Server 3GB', slug: 'email-server-3gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 24000, unit: 'vnd/tháng', mailboxes: 5, storage: '3GB', features: ['5 Email accounts', '3GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC'], isPopular: false },
  { id: 2, name: 'Email Server 10GB', slug: 'email-server-10gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 49000, unit: 'vnd/tháng', mailboxes: 10, storage: '10GB', features: ['10 Email accounts', '10GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC', 'Backup'], isPopular: true },
  { id: 3, name: 'Email Server 20GB', slug: 'email-server-20gb', provider: 'WisdomCloud', category: 'Cloud Email', price: 99000, unit: 'vnd/tháng', mailboxes: 20, storage: '20GB', features: ['20 Email accounts', '20GB storage', 'AI Anti-Spam', 'SSL/TLS', 'SPF/DKIM/DMARC', 'Backup', 'RBAC'], isPopular: false },
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

const TAKEN_DOMAINS = ['google', 'facebook', 'youtube', 'amazon', 'wisdomcloud', 'wisdom', 'cloud', 'vietnam', 'shop', 'news', 'blog', 'hotel', 'travel', 'bank', 'money', 'game', 'vn', 'hanoi', 'saigon', 'dichvu', 'congnghe', 'thuongmai', 'giaido']; // Mô phỏng domain đã được đăng ký

const carts = {};
const orders = [];
const coupons = { 'WISDOM10': { discount: 0.1, minTotal: 0 }, 'CLOUD20': { discount: 0.2, minTotal: 200000 } };

const distPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));

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

app.get('/api/v1/cloud-services/detail', (req, res) => {
  const { id, slug } = req.query;
  if (!id && !slug) return res.status(400).json({ error: 'Thiếu id hoặc slug' });
  const service = id
    ? services.find(s => s.id === parseInt(id))
    : services.find(s => s.slug === slug);
  if (!service) return res.status(404).json({ error: 'Không tìm thấy dịch vụ' });
  res.json(service);
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

app.get('/api/v1/tlds', (req, res) => {
  res.json(tlds);
});

app.get('/api/v1/hosting/plans', (req, res) => {
  res.json(hostingPlans);
});

app.get('/api/v1/servers/plans', (req, res) => {
  res.json(serverPlans);
});

app.get('/api/v1/email/plans', (req, res) => {
  res.json(emailPlans);
});

app.get('/api/v1/ssl/plans', (req, res) => {
  res.json(sslPlans);
});

app.post('/api/v1/domains/check', express.json(), (req, res) => {
  const { domain } = req.body;
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
  res.json({ domain: name, results, specificTld });
});

app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }
    const users = readUsers();
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email đã được đăng ký' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashed,
      fullName,
      phone: phone || '',
      company: '',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

app.get('/api/v1/auth/profile', authMiddleware, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
  const { password, ...safe } = user;
  res.json(safe);
});

app.put('/api/v1/auth/profile', authMiddleware, async (req, res) => {
  try {
    const users = readUsers();
    const idx = users.findIndex(u => u.id === req.user.id);
    if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    const { fullName, phone, company, address } = req.body;
    if (fullName) users[idx].fullName = fullName;
    if (phone !== undefined) users[idx].phone = phone;
    if (company !== undefined) users[idx].company = company;
    if (address !== undefined) users[idx].address = address;
    users[idx].updatedAt = new Date().toISOString();
    writeUsers(users);
    const { password, ...safe } = users[idx];
    res.json(safe);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

app.post('/api/v1/auth/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
    }
    const users = readUsers();
    const idx = users.findIndex(u => u.id === req.user.id);
    if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    if (!(await bcrypt.compare(currentPassword, users[idx].password))) {
      return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng' });
    }
    users[idx].password = await bcrypt.hash(newPassword, 10);
    users[idx].updatedAt = new Date().toISOString();
    writeUsers(users);
    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

const authenticate = (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  try {
    return jwt.verify(header.split(' ')[1], JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
};

app.post('/api/v1/cart', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const { serviceId, name, provider, category, price, quantity, duration } = req.body;
  if (!carts[user.id]) carts[user.id] = { items: [], couponCode: null, discount: 0 };
  const cart = carts[user.id];
  const existing = cart.items.find(i => i.serviceId === serviceId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (quantity || 1);
  } else {
    cart.items.push({ serviceId, name, provider, category, price, quantity: quantity || 1, duration: duration || 1 });
  }
  cart.couponCode = null;
  cart.discount = 0;
  res.json(cart);
});

app.get('/api/v1/cart', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  res.json(carts[user.id] || { items: [], couponCode: null, discount: 0 });
});

app.delete('/api/v1/cart/item/:serviceId', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const cart = carts[user.id];
  if (!cart) return res.json({ items: [], couponCode: null, discount: 0 });
  cart.items = cart.items.filter(i => i.serviceId !== parseInt(req.params.serviceId));
  cart.couponCode = null;
  cart.discount = 0;
  res.json(cart);
});

app.put('/api/v1/cart/item/:serviceId', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const cart = carts[user.id];
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  const item = cart.items.find(i => i.serviceId === parseInt(req.params.serviceId));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  item.quantity = parseInt(req.body.quantity);
  cart.couponCode = null;
  cart.discount = 0;
  res.json(cart);
});

app.post('/api/v1/cart/coupon', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const { code } = req.body;
  const coupon = coupons[code];
  if (!coupon) return res.status(400).json({ error: 'Mã khuyến mãi không hợp lệ' });
  const cart = carts[user.id];
  if (!cart || !cart.items.length) return res.status(400).json({ error: 'Giỏ hàng trống' });
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (subtotal < coupon.minTotal) return res.status(400).json({ error: `Chưa đạt giá trị tối thiểu ${coupon.minTotal.toLocaleString()}₫` });
  cart.couponCode = code;
  cart.discount = subtotal * coupon.discount;
  res.json(cart);
});

app.post('/api/v1/orders', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const { paymentMethod, note } = req.body;
  const cart = carts[user.id];
  if (!cart || !cart.items.length) return res.status(400).json({ error: 'Giỏ hàng trống' });
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = cart.discount || 0;
  const total = subtotal - discount;
  const order = {
    orderCode: `DH${Date.now()}`,
    userId: user.id,
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
  carts[user.id] = { items: [], couponCode: null, discount: 0 };
  res.status(201).json(order);
});

app.get('/api/v1/orders', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const userOrders = orders.filter(o => o.userId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(userOrders);
});

app.get('/api/v1/orders/:orderCode', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const order = orders.find(o => o.orderCode === req.params.orderCode);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (order.userId !== user.id) return res.status(403).json({ error: 'Forbidden' });
  res.json(order);
});

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

app.get('/api/v1/admin/stats', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const users = readUsers();
  const ordersByStatus = {};
  let totalRevenue = 0;
  orders.forEach(o => {
    ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
    if (o.paymentStatus === 'paid' || o.status === 'completed') {
      totalRevenue += o.total;
    }
  });
  const revenueByMonth = {};
  orders.forEach(o => {
    if (o.paymentStatus === 'paid' || o.status === 'completed') {
      const m = o.createdAt.slice(0, 7);
      revenueByMonth[m] = (revenueByMonth[m] || 0) + o.total;
    }
  });
  res.json({
    totalUsers: users.length,
    totalOrders: orders.length,
    totalServices: services.length,
    totalRevenue,
    ordersByStatus,
    revenueByMonth,
  });
});

app.get('/api/v1/admin/users', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const all = readUsers();
  res.json(all.map(({ password, ...u }) => u));
});

app.get('/api/v1/admin/users/:id', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const all = readUsers();
  const u = all.find(x => x.id === parseInt(req.params.id));
  if (!u) return res.status(404).json({ error: 'User not found' });
  const { password, ...safe } = u;
  res.json(safe);
});

app.put('/api/v1/admin/users/:id', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const all = readUsers();
  const idx = all.findIndex(x => x.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const { fullName, phone, company, address, role } = req.body;
  if (fullName !== undefined) all[idx].fullName = fullName;
  if (phone !== undefined) all[idx].phone = phone;
  if (company !== undefined) all[idx].company = company;
  if (address !== undefined) all[idx].address = address;
  if (role !== undefined) all[idx].role = role;
  all[idx].updatedAt = new Date().toISOString();
  writeUsers(all);
  const { password, ...safe } = all[idx];
  res.json(safe);
});

app.delete('/api/v1/admin/users/:id', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const all = readUsers();
  const idx = all.findIndex(x => x.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  all.splice(idx, 1);
  writeUsers(all);
  res.json({ message: 'User deleted' });
});

app.get('/api/v1/admin/services', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  res.json(services);
});

app.post('/api/v1/admin/services', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const { name, slug, provider, category, price, unit, specs, cores, ram, storage, description } = req.body;
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
  fs.writeFileSync(DATA_PATH, JSON.stringify(services, null, 2));
  res.status(201).json(newService);
});

app.put('/api/v1/admin/services/:id', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const idx = services.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Service not found' });
  const { name, slug, provider, category, price, unit, specs, cores, ram, storage, description } = req.body;
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
  fs.writeFileSync(DATA_PATH, JSON.stringify(services, null, 2));
  res.json(services[idx]);
});

app.delete('/api/v1/admin/services/:id', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const idx = services.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Service not found' });
  services.splice(idx, 1);
  fs.writeFileSync(DATA_PATH, JSON.stringify(services, null, 2));
  res.json({ message: 'Service deleted' });
});

app.get('/api/v1/admin/orders', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  res.json(orders);
});

app.put('/api/v1/admin/orders/:orderCode', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const order = orders.find(o => o.orderCode === req.params.orderCode);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { status, paymentStatus } = req.body;
  if (status !== undefined) order.status = status;
  if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;
  order.updatedAt = new Date().toISOString();
  res.json(order);
});

app.get('/api/v1/admin/coupons', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  res.json(Object.entries(coupons).map(([code, data]) => ({ code, ...data })));
});

app.post('/api/v1/admin/coupons', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const { code, discount, minTotal } = req.body;
  if (!code || discount === undefined) return res.status(400).json({ error: 'Missing code or discount' });
  coupons[code] = { discount: parseFloat(discount), minTotal: parseInt(minTotal) || 0 };
  res.status(201).json({ code, discount: parseFloat(discount), minTotal: parseInt(minTotal) || 0 });
});

app.delete('/api/v1/admin/coupons/:code', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  if (!coupons[req.params.code]) return res.status(404).json({ error: 'Coupon not found' });
  delete coupons[req.params.code];
  res.json({ message: 'Coupon deleted' });
});

app.get('/api/v1/admin/tlds', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  res.json(tlds);
});

app.put('/api/v1/admin/tlds', (req, res) => {
  const user = adminAuth(req, res);
  if (!user) return;
  const { tlds: newTlds } = req.body;
  if (!Array.isArray(newTlds)) return res.status(400).json({ error: 'Invalid tlds array' });
  tlds.length = 0;
  tlds.push(...newTlds);
  fs.writeFileSync(TLDS_PATH, JSON.stringify(tlds, null, 2));
  res.json(tlds);
});

// ── Email / Webmail ──────────────────────────────────────
const EMAILS_PATH = path.join(__dirname, 'emails.json');

const readEmails = () => {
  try {
    return JSON.parse(fs.readFileSync(EMAILS_PATH, 'utf-8'));
  } catch { return []; }
};

const writeEmails = (data) => {
  fs.writeFileSync(EMAILS_PATH, JSON.stringify(data, null, 2));
};

app.get('/api/v1/mail/inbox', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const all = readEmails();
  const inbox = all
    .filter(e => e.to === user.email && !e.deletedBy?.includes(user.email))
    .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  res.json(inbox);
});

app.get('/api/v1/mail/sent', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const all = readEmails();
  const sent = all
    .filter(e => e.from === user.email && !e.deletedBy?.includes(user.email))
    .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  res.json(sent);
});

app.get('/api/v1/mail/:id', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const all = readEmails();
  const email = all.find(e => e.id === parseInt(req.params.id));
  if (!email) return res.status(404).json({ error: 'Email not found' });
  if (email.to !== user.email && email.from !== user.email) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(email);
});

app.post('/api/v1/mail/send', async (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Vui lòng nhập đầy đủ người nhận, tiêu đề và nội dung' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ error: 'Địa chỉ email người nhận không hợp lệ' });
  }
  const all = readEmails();
  const maxId = all.reduce((m, e) => Math.max(m, e.id), 0);
  const newEmail = {
    id: maxId + 1,
    from: user.email,
    fromName: user.fullName || user.email,
    to,
    subject,
    body,
    sentAt: new Date().toISOString(),
    read: false,
    deletedBy: [],
    status: 'sending',
  };
  all.push(newEmail);
  writeEmails(all);

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await mailTransporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME || user.fullName || 'WisdomCloud'}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text: body,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a1a2e; color: white; padding: 16px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">WisdomCloud Webmail</h2>
          </div>
          <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #666; margin: 0 0 8px;"><strong>Từ:</strong> ${user.fullName || user.email} &lt;${user.email}&gt;</p>
            <p style="color: #666; margin: 0 0 16px;"><strong>Đến:</strong> ${to}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">
            <div style="line-height: 1.6; color: #333;">${body.replace(/\n/g, '<br>')}</div>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 16px;">Sent from WisdomCloud Webmail</p>
        </div>`,
      });
      newEmail.status = 'sent';
      console.log(`Email sent successfully: ${subject} -> ${to}`);
    } else {
      newEmail.status = 'local_only';
      console.log(`SMTP not configured. Email saved locally: ${subject} -> ${to}`);
    }
  } catch (err) {
    newEmail.status = 'failed';
    newEmail.error = err.message;
    console.error(`Failed to send email to ${to}:`, err.message);
  }

  writeEmails(all);
  res.status(201).json(newEmail);
});

app.put('/api/v1/mail/:id/read', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const all = readEmails();
  const email = all.find(e => e.id === parseInt(req.params.id));
  if (!email) return res.status(404).json({ error: 'Email not found' });
  if (email.to !== user.email) return res.status(403).json({ error: 'Forbidden' });
  email.read = true;
  writeEmails(all);
  res.json(email);
});

app.delete('/api/v1/mail/:id', (req, res) => {
  const user = authenticate(req, res);
  if (!user) return;
  const all = readEmails();
  const email = all.find(e => e.id === parseInt(req.params.id));
  if (!email) return res.status(404).json({ error: 'Email not found' });
  if (email.to !== user.email && email.from !== user.email) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (!email.deletedBy) email.deletedBy = [];
  email.deletedBy.push(user.email);
  writeEmails(all);
  res.json({ message: 'Email deleted' });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cloud Services API running on http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET /api/v1/cloud-services/search`);
  console.log(`  GET /api/v1/categories`);
  console.log(`  GET /api/v1/providers`);
  console.log(`  GET /api/v1/cloud-services/stats`);
  console.log(`  GET /api/v1/cloud-services/detail`);
  console.log(`  GET /api/v1/tlds`);
  console.log(`  GET /api/v1/hosting/plans`);
  console.log(`  GET /api/v1/servers/plans`);
  console.log(`  GET /api/v1/email/plans`);
  console.log(`  GET /api/v1/ssl/plans`);
  console.log(`  POST /api/v1/domains/check`);
  console.log(`  POST /api/v1/auth/register`);
  console.log(`  POST /api/v1/auth/login`);
  console.log(`  GET /api/v1/auth/profile`);
  console.log(`  PUT /api/v1/auth/profile`);
  console.log(`  POST /api/v1/auth/change-password`);
  console.log(`  POST /api/v1/cart`);
  console.log(`  GET /api/v1/cart`);
  console.log(`  DELETE /api/v1/cart/item/:serviceId`);
  console.log(`  PUT /api/v1/cart/item/:serviceId`);
  console.log(`  POST /api/v1/cart/coupon`);
  console.log(`  POST /api/v1/orders`);
  console.log(`  GET /api/v1/orders`);
  console.log(`  GET /api/v1/admin/stats`);
  console.log(`  GET /api/v1/admin/users`);
  console.log(`  GET /api/v1/admin/services`);
  console.log(`  POST /api/v1/admin/services`);
  console.log(`  PUT /api/v1/admin/services/:id`);
  console.log(`  DELETE /api/v1/admin/services/:id`);
  console.log(`  GET /api/v1/admin/orders`);
  console.log(`  PUT /api/v1/admin/orders/:orderCode`);
  console.log(`  GET /api/v1/admin/coupons`);
  console.log(`  POST /api/v1/admin/coupons`);
  console.log(`  DELETE /api/v1/admin/coupons/:code`);
  console.log(`  GET /api/v1/admin/tlds`);
  console.log(`  PUT /api/v1/admin/tlds`);
  });
