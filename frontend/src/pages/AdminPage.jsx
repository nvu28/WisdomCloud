import React, { useState, useEffect } from 'react';
import { getProfile } from '../api/cloudApi';

const BASE = '/api/v1';

async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem('wc_token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers };
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (!res.ok) { const e = await res.json().catch(() => ({ error: 'Request failed' })); throw new Error(e.error || 'Request failed'); }
  return res.json();
}

const s = {
  container: { minHeight: 'calc(100vh - 200px)', background: '#f1f5f9', padding: '40px 20px' },
  inner: { maxWidth: 1200, margin: '0 auto' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 24 },
  tabs: { display: 'flex', gap: 4, marginBottom: 24, background: '#fff', borderRadius: 12, padding: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  tab: { padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', background: 'transparent', color: '#64748b' },
  tabActive: { background: '#2563eb', color: '#fff' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 24 },
  statCard: { background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  statVal: { fontSize: 32, fontWeight: 800, color: '#1e293b', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#94a3b8' },
  statIcon: { fontSize: 24, marginBottom: 8 },
  card: { background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 24, overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' },
  td: { padding: '10px 12px', borderBottom: '1px solid #f1f5f9', color: '#475569' },
  badge: { display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 },
  badgeGreen: { background: '#d1fae5', color: '#059669' },
  badgeYellow: { background: '#fef3c7', color: '#d97706' },
  badgeRed: { background: '#fee2e2', color: '#dc2626' },
  badgeBlue: { background: '#dbeafe', color: '#2563eb' },
  input: { padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' },
  select: { padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, outline: 'none', background: '#fff' },
  btn: { padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
  btnPrimary: { background: '#2563eb', color: '#fff' },
  btnDanger: { background: '#ef4444', color: '#fff' },
  btnSuccess: { background: '#059669', color: '#fff' },
  btnSm: { padding: '4px 10px', fontSize: 12, marginRight: 4 },
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: '#fff', borderRadius: 16, padding: 32, width: '90%', maxWidth: 600, maxHeight: '80vh', overflow: 'auto' },
  modalTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16 },
  formRow: { display: 'flex', gap: 12, marginBottom: 12 },
  formField: { flex: 1 },
  formLabel: { fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4, display: 'block' },
};

const statusColors = { pending: s.badgeYellow, confirmed: s.badgeBlue, processing: s.badgeBlue, completed: s.badgeGreen, cancelled: s.badgeRed };
const payStatusColors = { unpaid: s.badgeYellow, paid: s.badgeGreen, refunded: s.badgeRed };
const statusLabels = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', processing: 'Đang xử lý', completed: 'Hoàn thành', cancelled: 'Đã hủy' };

function fmtPrice(n) { return (n || 0).toLocaleString('vi-VN') + '₫'; }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('vi-VN') : ''; }

export default function AdminPage({ onNavigate, onLogout }) {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [tlds, setTlds] = useState([]);
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('wc_token');
    if (!token) { onLogout && onLogout(); return; }
    getProfile(token).then(u => {
      if (u.role !== 'admin') { onLogout(); return; }
      setUser(u);
      loadData('dashboard');
    }).catch(() => onLogout && onLogout());
  }, []);

  const loadData = async (t) => {
    try {
      if (t === 'dashboard') setStats(await apiFetch('/admin/stats'));
      if (t === 'users') setUsers(await apiFetch('/admin/users'));
      if (t === 'services') setServices(await apiFetch('/admin/services'));
      if (t === 'orders') setOrders(await apiFetch('/admin/orders'));
      if (t === 'coupons') setCoupons(await apiFetch('/admin/coupons'));
      if (t === 'tlds') setTlds(await apiFetch('/admin/tlds'));
    } catch {}
  };

  const handleTab = (t) => { setTab(t); setModal(null); loadData(t); };

  if (!user) return null;

  const tabs = ['dashboard', 'users', 'services', 'orders', 'coupons', 'tlds'];
  const tabLabels = { dashboard: '📊 Tổng quan', users: '👥 Người dùng', services: '☁️ Dịch vụ', orders: '📦 Đơn hàng', coupons: '🎫 Mã giảm giá', tlds: '🌐 TLD' };

  return (
    <div style={s.container}>
      <div style={s.inner}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={s.title}>Admin Dashboard</h1>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{user.fullName} · {user.email}</span>
        </div>
        <div style={s.tabs}>
          {tabs.map(t => (
            <button key={t} style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }} onClick={() => handleTab(t)}>{tabLabels[t]}</button>
          ))}
        </div>

        {tab === 'dashboard' && stats && <DashboardTab stats={stats} />}
        {tab === 'users' && <UsersTab users={users} loadData={() => loadData('users')} />}
        {tab === 'services' && <ServicesTab services={services} loadData={() => loadData('services')} />}
        {tab === 'orders' && <OrdersTab orders={orders} loadData={() => loadData('orders')} />}
        {tab === 'coupons' && <CouponsTab coupons={coupons} loadData={() => loadData('coupons')} />}
        {tab === 'tlds' && <TldsTab tlds={tlds} loadData={() => loadData('tlds')} />}
      </div>
    </div>
  );
}

function DashboardTab({ stats }) {
  const cards = [
    { icon: '👥', label: 'Người dùng', value: stats.totalUsers, color: '#2563eb' },
    { icon: '☁️', label: 'Dịch vụ', value: stats.totalServices, color: '#059669' },
    { icon: '📦', label: 'Đơn hàng', value: stats.totalOrders, color: '#d97706' },
    { icon: '💰', label: 'Doanh thu', value: fmtPrice(stats.totalRevenue || 0), color: '#7c3aed' },
  ];
  return (
    <>
      <div style={s.statsRow}>{cards.map((c, i) => (
        <div key={i} style={s.statCard}>
          <div style={s.statIcon}>{c.icon}</div>
          <div style={s.statVal}>{c.value}</div>
          <div style={s.statLabel}>{c.label}</div>
        </div>
      ))}</div>
      <div style={{ ...s.card, display: 'flex', gap: 40 }}>
        {stats.ordersByStatus && <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Đơn hàng theo trạng thái</h3>
          {Object.entries(stats.ordersByStatus).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
              <span>{statusLabels[k] || k}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>}
        {stats.revenueByMonth && <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Doanh thu theo tháng</h3>
          {Object.entries(stats.revenueByMonth).slice(-6).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
              <span>{k}</span><span style={{ fontWeight: 600 }}>{fmtPrice(v)}</span>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
}

function UsersTab({ users, loadData }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const openEdit = (u) => { setEditing(u.id); setForm({ fullName: u.fullName, phone: u.phone || '', company: u.company || '', address: u.address || '', role: u.role }); };
  const save = async () => { await apiFetch(`/admin/users/${editing}`, { method: 'PUT', body: JSON.stringify(form) }); setEditing(null); loadData(); };
  const del = async (id) => { if (confirm('Xóa người dùng này?')) { await apiFetch(`/admin/users/${id}`, { method: 'DELETE' }); loadData(); } };
  return (
    <div style={s.card}>
      <table style={s.table}>
        <thead><tr>{['ID', 'Họ tên', 'Email', 'SĐT', 'Công ty', 'Vai trò', 'Ngày tạo', ''].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>{users.map(u => (
          <tr key={u.id}>
            <td style={s.td}>{u.id}</td>
            <td style={s.td}>{editing === u.id ? <input style={s.input} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} /> : u.fullName}</td>
            <td style={s.td}>{u.email}</td>
            <td style={s.td}>{editing === u.id ? <input style={s.input} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /> : u.phone}</td>
            <td style={s.td}>{editing === u.id ? <input style={s.input} value={form.company} onChange={e => setForm({...form, company: e.target.value})} /> : u.company}</td>
            <td style={s.td}>{editing === u.id ? <select style={s.select} value={form.role} onChange={e => setForm({...form, role: e.target.value})}><option value="customer">Customer</option><option value="admin">Admin</option></select> : <span style={{ ...s.badge, ...(u.role === 'admin' ? s.badgeBlue : s.badgeGreen) }}>{u.role}</span>}</td>
            <td style={s.td}>{fmtDate(u.createdAt)}</td>
            <td style={s.td}>{editing === u.id ? <><button style={{...s.btn, ...s.btnSuccess, ...s.btnSm}} onClick={save}>Save</button><button style={{...s.btn, ...s.btnDanger, ...s.btnSm}} onClick={() => setEditing(null)}>Hủy</button></> : <><button style={{...s.btn, ...s.btnPrimary, ...s.btnSm}} onClick={() => openEdit(u)}>Sửa</button><button style={{...s.btn, ...s.btnDanger, ...s.btnSm}} onClick={() => del(u.id)}>Xóa</button></>}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function ServicesTab({ services, loadData }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const openNew = () => { setEditing('new'); setForm({ name: '', slug: '', provider: '', category: '', price: 0, unit: 'vnd/tháng', specs: '', cores: '', ram: '', storage: '', description: '' }); };
  const openEdit = (s) => { setEditing(s.id); setForm({ name: s.name, slug: s.slug, provider: s.provider, category: s.category, price: s.price, unit: s.unit, specs: s.specs || '', cores: s.cores || '', ram: s.ram || '', storage: s.storage || '', description: s.description || '' }); };
  const save = async () => {
    const isNew = editing === 'new';
    await apiFetch(isNew ? '/admin/services' : `/admin/services/${editing}`, { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(form) });
    setEditing(null); loadData();
  };
  const del = async (id) => { if (confirm('Xóa dịch vụ này?')) { await apiFetch(`/admin/services/${id}`, { method: 'DELETE' }); loadData(); } };
  return (
    <div style={s.card}>
      <div style={{ marginBottom: 16 }}><button style={{...s.btn, ...s.btnPrimary}} onClick={openNew}>+ Thêm dịch vụ</button></div>
      {editing && (
        <div style={s.modal}>
          <div style={s.modalContent}>
            <h3 style={s.modalTitle}>{editing === 'new' ? 'Thêm dịch vụ' : 'Sửa dịch vụ'}</h3>
            <div style={s.formRow}><div style={s.formField}><label style={s.formLabel}>Tên</label><input style={s.input} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div><div style={s.formField}><label style={s.formLabel}>Slug</label><input style={s.input} value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} /></div></div>
            <div style={s.formRow}><div style={s.formField}><label style={s.formLabel}>Nhà cung cấp</label><input style={s.input} value={form.provider} onChange={e => setForm({...form, provider: e.target.value})} /></div><div style={s.formField}><label style={s.formLabel}>Danh mục</label><input style={s.input} value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div></div>
            <div style={s.formRow}><div style={s.formField}><label style={s.formLabel}>Giá</label><input style={s.input} type="number" value={form.price} onChange={e => setForm({...form, price: parseInt(e.target.value) || 0})} /></div><div style={s.formField}><label style={s.formLabel}>Đơn vị</label><input style={s.input} value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} /></div></div>
            <div style={s.formRow}><div style={s.formField}><label style={s.formLabel}>Cores</label><input style={s.input} value={form.cores} onChange={e => setForm({...form, cores: e.target.value})} /></div><div style={s.formField}><label style={s.formLabel}>RAM</label><input style={s.input} value={form.ram} onChange={e => setForm({...form, ram: e.target.value})} /></div></div>
            <div style={s.formField}><label style={s.formLabel}>Storage</label><input style={s.input} value={form.storage} onChange={e => setForm({...form, storage: e.target.value})} /></div>
            <div style={s.formField}><label style={s.formLabel}>Specs</label><textarea style={{...s.input, minHeight: 60}} value={form.specs} onChange={e => setForm({...form, specs: e.target.value})} /></div>
            <div style={s.formField}><label style={s.formLabel}>Mô tả</label><textarea style={{...s.input, minHeight: 60}} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}><button style={{...s.btn, ...s.btnPrimary}} onClick={save}>Lưu</button><button style={{...s.btn, ...s.btnDanger}} onClick={() => setEditing(null)}>Hủy</button></div>
          </div>
        </div>
      )}
      <table style={s.table}>
        <thead><tr><th style={s.th}>ID</th><th style={s.th}>Tên</th><th style={s.th}>Nhà cung cấp</th><th style={s.th}>Danh mục</th><th style={s.th}>Giá</th><th style={s.th}>SLug</th><th style={s.th}></th></tr></thead>
        <tbody>{services.map(s => (
          <tr key={s.id}><td style={s.td}>{s.id}</td><td style={s.td}>{s.name}</td><td style={s.td}>{s.provider}</td><td style={s.td}>{s.category}</td><td style={s.td}>{fmtPrice(s.price)}</td><td style={s.td}>{s.slug}</td>
            <td style={s.td}><button style={{...s.btn, ...s.btnPrimary, ...s.btnSm}} onClick={() => openEdit(s)}>Sửa</button><button style={{...s.btn, ...s.btnDanger, ...s.btnSm}} onClick={() => del(s.id)}>Xóa</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function OrdersTab({ orders, loadData }) {
  const [editing, setEditing] = useState(null);
  const saveStatus = async (code, status, paymentStatus) => {
    await apiFetch(`/admin/orders/${code}`, { method: 'PUT', body: JSON.stringify({ status, paymentStatus }) });
    setEditing(null); loadData();
  };
  return (
    <div style={s.card}>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Mã ĐH</th><th style={s.th}>Khách hàng</th><th style={s.th}>Tổng</th><th style={s.th}>Trạng thái</th><th style={s.th}>Thanh toán</th><th style={s.th}>Ngày</th><th style={s.th}></th></tr></thead>
        <tbody>{orders.map(o => (
            <tr key={o.orderCode}>
              <td style={{...s.td, fontWeight: 600}}>{o.orderCode}</td>
            <td style={s.td}>{o.userId}</td>
            <td style={s.td}>{fmtPrice(o.total)}</td>
            <td style={s.td}>{editing === o.orderCode ? <select style={s.select} defaultValue={o.status} onChange={e => { const ps = document.getElementById(`ps-${o.orderCode}`)?.value; saveStatus(o.orderCode, e.target.value, ps || o.paymentStatus); }}>{Object.entries(statusLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}</select> : <span style={{...s.badge, ...(statusColors[o.status] || s.badgeYellow)}}>{statusLabels[o.status] || o.status}</span>}</td>
            <td style={s.td}>{editing === o.orderCode ? <select id={`ps-${o.orderCode}`} style={s.select} defaultValue={o.paymentStatus} onChange={e => { const st = document.getElementById(`st-${o.orderCode}`)?.value; saveStatus(o.orderCode, st || o.status, e.target.value); }}><option value="unpaid">Chưa thanh toán</option><option value="paid">Đã thanh toán</option><option value="refunded">Đã hoàn tiền</option></select> : <span style={{...s.badge, ...(payStatusColors[o.paymentStatus] || s.badgeYellow)}}>{o.paymentStatus}</span>}</td>
            <td style={s.td}>{fmtDate(o.createdAt)}</td>
            <td style={s.td}><button style={{...s.btn, ...s.btnPrimary, ...s.btnSm}} onClick={() => setEditing(editing === o.orderCode ? null : o.orderCode)}>{editing === o.orderCode ? 'Đóng' : 'Sửa'}</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function CouponsTab({ coupons, loadData }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', discount: 0, minTotal: 0 });
  const add = async () => { await apiFetch('/admin/coupons', { method: 'POST', body: JSON.stringify(form) }); setShowForm(false); setForm({ code: '', discount: 0, minTotal: 0 }); loadData(); };
  const del = async (code) => { if (confirm(`Xóa mã ${code}?`)) { await apiFetch(`/admin/coupons/${code}`, { method: 'DELETE' }); loadData(); } };
  return (
    <div style={s.card}>
      <div style={{ marginBottom: 16 }}><button style={{...s.btn, ...s.btnPrimary}} onClick={() => setShowForm(!showForm)}>{showForm ? 'Đóng' : '+ Thêm mã'}</button></div>
      {showForm && <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 16, padding: 16, background: '#f8fafc', borderRadius: 12 }}>
        <div style={{flex:1}}><label style={s.formLabel}>Mã</label><input style={s.input} value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} /></div>
        <div style={{flex:1}}><label style={s.formLabel}>Giảm (%)</label><input style={s.input} type="number" value={form.discount} onChange={e => setForm({...form, discount: parseFloat(e.target.value) || 0})} /></div>
        <div style={{flex:1}}><label style={s.formLabel}>Tối thiểu</label><input style={s.input} type="number" value={form.minTotal} onChange={e => setForm({...form, minTotal: parseInt(e.target.value) || 0})} /></div>
        <button style={{...s.btn, ...s.btnSuccess}} onClick={add}>Thêm</button>
      </div>}
      <table style={s.table}>
        <thead><tr><th style={s.th}>Mã</th><th style={s.th}>Giảm</th><th style={s.th}>Tối thiểu</th><th style={s.th}></th></tr></thead>
        <tbody>{coupons.map(c => (
            <tr key={c.code}><td style={{...s.td, fontWeight: 700, color: '#2563eb'}}>{c.code}</td><td style={s.td}>{(c.discount * 100)}%</td><td style={s.td}>{fmtPrice(c.minTotal)}</td>
            <td style={s.td}><button style={{...s.btn, ...s.btnDanger, ...s.btnSm}} onClick={() => del(c.code)}>Xóa</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function TldsTab({ tlds, loadData }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const editTld = (t) => { setEditing(t.tld); setForm({ ...t }); };
  const save = async () => {
    const updated = tlds.map(t => t.tld === editing ? form : t);
    await apiFetch('/admin/tlds', { method: 'PUT', body: JSON.stringify({ tlds: updated }) });
    setEditing(null); loadData();
  };
  return (
    <div style={s.card}>
      <table style={s.table}>
        <thead><tr><th style={s.th}>TLD</th><th style={s.th}>Giá năm đầu</th><th style={s.th}>Gia hạn</th><th style={s.th}>Chuyển đổi</th><th style={s.th}>WHOIS</th><th style={s.th}></th></tr></thead>
        <tbody>{tlds.map(t => (
          <tr key={t.tld}>
            <td style={{...s.td, fontWeight: 600}}>{t.tld}</td>
            {editing === t.tld ? <>
              <td style={s.td}><input style={{...s.input, width: 80}} type="number" value={form.priceFirstYear} onChange={e => setForm({...form, priceFirstYear: parseInt(e.target.value) || 0})} /></td>
              <td style={s.td}><input style={{...s.input, width: 80}} type="number" value={form.priceRenew} onChange={e => setForm({...form, priceRenew: parseInt(e.target.value) || 0})} /></td>
              <td style={s.td}>{t.priceTransfer}</td>
              <td style={s.td}>{t.whoisProtection}</td>
              <td style={s.td}><button style={{...s.btn, ...s.btnSuccess, ...s.btnSm}} onClick={save}>Save</button><button style={{...s.btn, ...s.btnDanger, ...s.btnSm}} onClick={() => setEditing(null)}>Hủy</button></td>
            </> : <>
              <td style={s.td}>{fmtPrice(t.priceFirstYear)}</td>
              <td style={s.td}>{fmtPrice(t.priceRenew)}</td>
              <td style={s.td}>{t.priceTransfer}</td>
              <td style={s.td}>{t.whoisProtection}</td>
              <td style={s.td}><button style={{...s.btn, ...s.btnPrimary, ...s.btnSm}} onClick={() => editTld(t)}>Sửa</button></td>
            </>}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
