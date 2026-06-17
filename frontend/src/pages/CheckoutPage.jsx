import React, { useState, useEffect } from 'react';
import { getCart, getOrders, createOrder, applyCoupon } from '../api/cloudApi';

const s = {
  container: { minHeight: 'calc(100vh - 200px)', background: '#f8fafc', padding: '40px 20px' },
  inner: { maxWidth: 700, margin: '0 auto' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 24 },
  card: { background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 16 },
  row: { display: 'flex', gap: 16, marginBottom: 16 },
  field: { flex: 1, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: '11px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  select: { width: '100%', padding: '11px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 15, outline: 'none', background: '#fff', boxSizing: 'border-box' },
  itemRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 },
  totalRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 15 },
  grandTotal: { fontSize: 18, fontWeight: 700, color: '#1e293b', borderTop: '2px solid #e2e8f0', paddingTop: 12, marginTop: 8 },
  btn: { width: '100%', padding: 14, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 16 },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13, textAlign: 'center' },
  success: { background: '#f0fdf4', color: '#16a34a', padding: 16, borderRadius: 12, textAlign: 'center', marginBottom: 16 },
  successIcon: { fontSize: 48, marginBottom: 12 },
  successTitle: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  successCode: { fontSize: 14, color: '#64748b', marginBottom: 4 },
  payInfo: { background: '#f8fafc', borderRadius: 12, padding: 20, marginTop: 16, fontSize: 13, lineHeight: 1.8 },
};

function fmtPrice(n) { return (n || 0).toLocaleString('vi-VN') + '₫'; }

export default function CheckoutPage({ onNavigate, t }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ paymentMethod: 'bank_transfer', note: '' });

  useEffect(() => {
    getCart().then(setCart).catch(() => setCart({ items: [] })).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart?.items?.length) { setError('Giỏ hàng trống'); return; }
    setSubmitting(true);
    setError('');
    try {
      const result = await createOrder({ paymentMethod: form.paymentMethod, note: form.note });
      setOrderResult(result);
    } catch (err) {
      setError(err.response?.data?.error || 'Đặt hàng thất bại');
    } finally { setSubmitting(false); }
  };

  if (orderResult) {
    const isBank = form.paymentMethod === 'bank_transfer';
    return (
      <div style={s.container}>
        <div style={s.inner}>
          <div style={s.card}>
            <div style={s.success}>
              <div style={s.successIcon}>✅</div>
              <div style={s.successTitle}>Đặt hàng thành công!</div>
              <div style={s.successCode}>Mã đơn hàng: <strong>{orderResult.orderCode}</strong></div>
              <div style={s.successCode}>Tổng tiền: <strong>{fmtPrice(orderResult.total)}</strong></div>
            </div>
            {isBank && (
              <div style={s.payInfo}>
                <strong>Thông tin chuyển khoản:</strong><br />
                Ngân hàng: <strong>Vietcombank</strong><br />
                Số tài khoản: <strong>1234567890</strong><br />
                Chủ tài khoản: <strong>CÔNG TY WISDOMCLOUD</strong><br />
                Nội dung: <strong style={{ color: '#2563eb' }}>{orderResult.orderCode}</strong>
              </div>
            )}
            {!isBank && (
              <div style={s.payInfo}>
                {form.paymentMethod === 'vnpay' ? 'Cổng thanh toán VNPay đang được kết nối...' : ''}
                {form.paymentMethod === 'momo' ? 'Cổng thanh toán MoMo đang được kết nối...' : ''}
                {form.paymentMethod === 'manual' ? 'Nhân viên sẽ liên hệ bạn trong 24h để xác nhận đơn hàng.' : ''}
              </div>
            )}
            <button style={s.btn} onClick={() => onNavigate && onNavigate('don-hang')}>Xem đơn hàng</button>
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const discount = cart?.discount || 0;
  const total = subtotal - discount;

  if (loading) return <div style={s.container}><div style={s.inner}>Đang tải...</div></div>;

  if (!items.length) {
    return (
      <div style={s.container}>
        <div style={s.inner}>
          <h1 style={s.title}>Thanh toán</h1>
          <div style={s.card}>Giỏ hàng trống. <span style={{ color: '#2563eb', cursor: 'pointer' }} onClick={() => onNavigate('web-hosting')}>Mua ngay</span></div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <div style={s.inner}>
        <h1 style={s.title}>Thanh toán</h1>
        {error && <div style={s.error}>{error}</div>}
        <div style={s.card}>
          <h2 style={s.sectionTitle}>Đơn hàng</h2>
          {items.map((item, i) => (
            <div key={i} style={s.itemRow}>
              <span>{item.name} × {item.quantity || 1}</span>
              <span style={{ fontWeight: 600 }}>{fmtPrice((item.price || 0) * (item.quantity || 1))}</span>
            </div>
          ))}
          <div style={s.totalRow}><span>Tạm tính</span><span>{fmtPrice(subtotal)}</span></div>
          {discount > 0 && <div style={{ ...s.totalRow, color: '#059669' }}><span>Giảm giá</span><span>-{fmtPrice(discount)}</span></div>}
          <div style={s.grandTotal}><span>Tổng cộng</span><span>{fmtPrice(total)}</span></div>
        </div>
        <div style={s.card}>
          <h2 style={s.sectionTitle}>Phương thức thanh toán</h2>
          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <select style={s.select} value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })}>
                <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                <option value="vnpay">VNPay</option>
                <option value="momo">Ví MoMo</option>
                <option value="manual">Thanh toán sau</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Ghi chú</label>
              <input style={s.input} placeholder="Ghi chú cho đơn hàng..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            </div>
            <button type="submit" disabled={submitting} style={{ ...s.btn, ...(submitting ? s.btnDisabled : {}) }}>
              {submitting ? 'Đang xử lý...' : `Xác nhận đặt hàng - ${fmtPrice(total)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
