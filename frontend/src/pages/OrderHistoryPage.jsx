import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/cloudApi';

const s = {
  container: { minHeight: 'calc(100vh - 200px)', background: '#f8fafc', padding: '40px 20px' },
  inner: { maxWidth: 900, margin: '0 auto' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 24 },
  empty: { textAlign: 'center', padding: 60, color: '#94a3b8', fontSize: 16 },
  card: { background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 16, cursor: 'pointer' },
  cardBody: { padding: '20px 24px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderCode: { fontSize: 15, fontWeight: 700, color: '#1e293b' },
  status: { fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 },
  statusPending: { background: '#fef3c7', color: '#d97706' },
  statusConfirmed: { background: '#dbeafe', color: '#2563eb' },
  statusProcessing: { background: '#e0e7ff', color: '#4f46e5' },
  statusCompleted: { background: '#d1fae5', color: '#059669' },
  statusCancelled: { background: '#fee2e2', color: '#dc2626' },
  meta: { fontSize: 13, color: '#94a3b8', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 700, color: '#2563eb' },
  itemList: { fontSize: 13, color: '#64748b', marginTop: 8 },
  payStatus: { fontSize: 12, padding: '2px 8px', borderRadius: 12, fontWeight: 500 },
  payUnpaid: { background: '#fef3c7', color: '#d97706' },
  payPaid: { background: '#d1fae5', color: '#059669' },
  payRefunded: { background: '#fee2e2', color: '#dc2626' },
};

const statusStyles = {
  pending: s.statusPending, confirmed: s.statusConfirmed,
  processing: s.statusProcessing, completed: s.statusCompleted, cancelled: s.statusCancelled,
};
const statusLabels = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', processing: 'Đang xử lý', completed: 'Hoàn thành', cancelled: 'Đã hủy' };
const payLabels = { unpaid: 'Chưa thanh toán', paid: 'Đã thanh toán', refunded: 'Đã hoàn tiền' };

function fmtPrice(n) { return (n || 0).toLocaleString('vi-VN') + '₫'; }
function fmtDate(d) { return new Date(d).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }

export default function OrderHistoryPage({ onNavigate, t }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    getOrders().then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const showDetail = async (order) => {
    setSelectedOrder(order);
  };

  if (selectedOrder) {
    const o = selectedOrder;
    return (
      <div style={s.container}>
        <div style={s.inner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ color: '#2563eb', cursor: 'pointer', fontSize: 14, fontWeight: 500 }} onClick={() => setSelectedOrder(null)}>← Quay lại</span>
            <h1 style={{ ...s.title, marginBottom: 0 }}>Chi tiết đơn hàng</h1>
          </div>
          <div style={s.card}>
            <div style={s.cardBody}>
              <div style={s.cardTop}>
                <span style={s.orderCode}>{o.orderCode}</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ ...s.status, ...(statusStyles[o.status] || s.statusPending) }}>{statusLabels[o.status] || o.status}</span>
                  <span style={{ ...s.payStatus, ...(s[`pay${o.paymentStatus ? o.paymentStatus.charAt(0).toUpperCase() + o.paymentStatus.slice(1) : 'Unpaid'}`] || s.payUnpaid) }}>{payLabels[o.paymentStatus] || 'Chưa thanh toán'}</span>
                </span>
              </div>
              <div style={s.meta}>{fmtDate(o.createdAt)} · {o.paymentMethod === 'bank_transfer' ? 'Chuyển khoản' : o.paymentMethod === 'vnpay' ? 'VNPay' : o.paymentMethod === 'momo' ? 'MoMo' : 'Thanh toán sau'}</div>
              <div style={{ marginTop: 16 }}>
                {o.items?.map((item, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                    <span>{item.name} × {item.quantity || 1}</span>
                    <span style={{ fontWeight: 600 }}>{fmtPrice((item.price || 0) * (item.quantity || 1))}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 12, paddingTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}><span>Tạm tính</span><span>{fmtPrice(o.subtotal)}</span></div>
                {o.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14, color: '#059669' }}><span>Giảm giá</span><span>-{fmtPrice(o.discount)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#1e293b', borderTop: '2px solid #e2e8f0', paddingTop: 12, marginTop: 8 }}>
                  <span>Tổng cộng</span><span>{fmtPrice(o.total)}</span>
                </div>
              </div>
              {o.note && <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 10, fontSize: 13, color: '#64748b' }}>Ghi chú: {o.note}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div style={s.container}><div style={s.inner}>Đang tải...</div></div>;

  return (
    <div style={s.container}>
      <div style={s.inner}>
        <h1 style={s.title}>Đơn hàng của tôi</h1>
        {!orders.length ? (
          <div style={s.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <div>Chưa có đơn hàng nào</div>
          </div>
        ) : (
          orders.map((order, i) => (
            <div key={i} style={s.card} onClick={() => showDetail(order)}>
              <div style={s.cardBody}>
                <div style={s.cardTop}>
                  <span style={s.orderCode}>{order.orderCode}</span>
                  <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ ...s.status, ...(statusStyles[order.status] || s.statusPending) }}>{statusLabels[order.status] || order.status}</span>
                    <span style={{ ...s.payStatus, ...(s[`pay${order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Unpaid'}`] || s.payUnpaid) }}>{payLabels[order.paymentStatus] || 'Chưa thanh toán'}</span>
                  </span>
                </div>
                <div style={s.meta}>{fmtDate(order.createdAt)} · {order.paymentMethod === 'bank_transfer' ? 'Chuyển khoản' : order.paymentMethod === 'vnpay' ? 'VNPay' : order.paymentMethod === 'momo' ? 'MoMo' : 'Thanh toán sau'}</div>
                <div style={s.price}>{fmtPrice(order.total)}</div>
                <div style={s.itemList}>
                  {order.items?.slice(0, 3).map((item, j) => <div key={j}>· {item.name} × {item.quantity || 1}</div>)}
                  {order.items?.length > 3 && <div>...và {order.items.length - 3} sản phẩm khác</div>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
