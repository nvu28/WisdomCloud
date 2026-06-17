import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCartItem, applyCoupon } from '../api/cloudApi';

const s = {
  container: { minHeight: 'calc(100vh - 200px)', background: '#f8fafc', padding: '40px 20px' },
  inner: { maxWidth: 900, margin: '0 auto' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 24 },
  empty: { textAlign: 'center', padding: 60, color: '#94a3b8', fontSize: 16 },
  emptyBtn: { display: 'inline-block', marginTop: 16, padding: '12px 32px', background: '#2563eb', color: '#fff', borderRadius: 10, textDecoration: 'none', cursor: 'pointer', fontWeight: 600 },
  card: { background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  item: { display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #f1f5f9', gap: 16 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: 600, color: '#1e293b' },
  itemMeta: { fontSize: 13, color: '#94a3b8', marginTop: 2 },
  itemPrice: { fontSize: 16, fontWeight: 700, color: '#2563eb', whiteSpace: 'nowrap' },
  qtyBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { width: 40, textAlign: 'center', fontSize: 14, fontWeight: 600 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 4 },
  delBtn: { color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' },
  summary: { padding: 24, background: '#f8fafc' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 },
  total: { fontSize: 18, fontWeight: 700, color: '#1e293b', borderTop: '2px solid #e2e8f0', paddingTop: 12, marginTop: 8 },
  couponRow: { display: 'flex', gap: 8, marginTop: 12, marginBottom: 16 },
  couponInput: { flex: 1, padding: '10px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, outline: 'none' },
  couponBtn: { padding: '10px 20px', background: '#059669', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 13 },
  checkoutBtn: { display: 'block', width: '100%', padding: 14, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' },
  couponMsg: { fontSize: 12, marginTop: 4 },
  discountRow: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#059669' },
};

function fmtPrice(n) {
  return (n || 0).toLocaleString('vi-VN') + '₫';
}

export default function CartPage({ onNavigate, t }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [appliedCode, setAppliedCode] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch { setCart({ items: [] }); }
    finally { setLoading(false); }
  };

  const handleQty = async (item, delta) => {
    const newQty = Math.max(1, (item.quantity || 1) + delta);
    try {
      const data = await updateCartItem(item.serviceId, { quantity: newQty });
      setCart(data);
    } catch { loadCart(); }
  };

  const handleRemove = async (serviceId) => {
    try {
      const data = await removeFromCart(serviceId);
      setCart(data);
    } catch { loadCart(); }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const data = await applyCoupon(couponCode.trim());
      setCart(data);
      setAppliedCode(couponCode.trim());
      setCouponMsg({ type: 'success', text: 'Áp dụng mã thành công!' });
    } catch (err) {
      setCouponMsg({ type: 'error', text: err.response?.data?.error || 'Mã không hợp lệ' });
    }
  };

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const discount = cart?.discount || 0;
  const total = subtotal - discount;

  if (loading) return <div style={s.container}><div style={s.inner}>Đang tải...</div></div>;

  if (!items.length) {
    return (
      <div style={s.container}>
        <div style={s.inner}>
          <h1 style={s.title}>Giỏ hàng</h1>
          <div style={s.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
            <div>Giỏ hàng trống</div>
            <div style={s.emptyBtn} onClick={() => onNavigate && onNavigate('web-hosting')}>Mua ngay</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <div style={s.inner}>
        <h1 style={s.title}>Giỏ hàng ({items.length} sản phẩm)</h1>
        <div style={s.card}>
          {items.map((item, i) => (
            <div key={item.serviceId || i} style={s.item}>
              <div style={s.itemInfo}>
                <div style={s.itemName}>{item.name}</div>
                <div style={s.itemMeta}>{item.provider} · {item.category}{item.duration ? ` · ${item.duration} tháng` : ''}</div>
              </div>
              <div style={s.qtyRow}>
                <button style={s.qtyBtn} onClick={() => handleQty(item, -1)}>−</button>
                <span style={s.qtyVal}>{item.quantity || 1}</span>
                <button style={s.qtyBtn} onClick={() => handleQty(item, 1)}>+</button>
              </div>
              <div style={s.itemPrice}>{fmtPrice((item.price || 0) * (item.quantity || 1))}</div>
              <div style={s.delBtn} onClick={() => handleRemove(item.serviceId)}>Xóa</div>
            </div>
          ))}
          <div style={s.summary}>
            <div style={s.row}><span>Tạm tính</span><span>{fmtPrice(subtotal)}</span></div>
            <div style={s.couponRow}>
              <input style={s.couponInput} placeholder="Nhập mã giảm giá" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
              <button style={s.couponBtn} onClick={handleApplyCoupon}>Áp dụng</button>
            </div>
            {couponMsg && <div style={{ ...s.couponMsg, color: couponMsg.type === 'success' ? '#059669' : '#dc2626' }}>{couponMsg.text}</div>}
            {discount > 0 && <div style={s.discountRow}><span>Giảm giá</span><span>-{fmtPrice(discount)}</span></div>}
            <div style={{ ...s.total, ...s.row }}><span>Tổng cộng</span><span>{fmtPrice(total)}</span></div>
            <button style={{ ...s.checkoutBtn, marginTop: 16 }} onClick={() => onNavigate && onNavigate('thanh-toan')}>Tiến hành thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}
