import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, changePassword } from '../api/cloudApi';

const styles = {
  container: { minHeight: 'calc(100vh - 200px)', background: '#f8fafc', padding: '40px 20px' },
  inner: { maxWidth: 800, margin: '0 auto' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 24 },
  card: { background: '#fff', borderRadius: 16, padding: '32px', marginBottom: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  cardTitle: { fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 20 },
  field: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: '11px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  row: { display: 'flex', gap: 16 },
  btn: { padding: '11px 28px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  success: { background: '#f0fdf4', color: '#16a34a', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13, textAlign: 'center' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13, textAlign: 'center' },
  info: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  infoLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 2 },
  infoValue: { fontSize: 16, fontWeight: 500, color: '#1e293b' },
};

export default function ProfilePage({ t, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ fullName: '', phone: '', company: '', address: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const token = localStorage.getItem('wc_token');

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    getProfile(token).then(data => {
      setUser(data);
      setForm({ fullName: data.fullName || '', phone: data.phone || '', company: data.company || '', address: data.address || '' });
    }).catch(() => onLogout && onLogout()).finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setSaving(true);
    try {
      const data = await updateProfile(token, form);
      setUser(data);
      setMsg({ type: 'success', text: 'Cập nhật thông tin thành công' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Cập nhật thất bại' });
    } finally { setSaving(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    if (pwForm.newPassword !== pwForm.confirmPassword) { setMsg({ type: 'error', text: 'Mật khẩu xác nhận không khớp' }); return; }
    if (pwForm.newPassword.length < 6) { setMsg({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự' }); return; }
    setSaving(true);
    try {
      await changePassword(token, { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setMsg({ type: 'success', text: 'Đổi mật khẩu thành công' });
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Đổi mật khẩu thất bại' });
    } finally { setSaving(false); }
  };

  if (loading) return <div style={styles.container}><div style={styles.inner}>Đang tải...</div></div>;
  if (!user) return <div style={styles.container}><div style={styles.inner}>Vui lòng đăng nhập để xem trang này.</div></div>;

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <h1 style={styles.title}>Tài khoản của tôi</h1>
        {msg.text && (
          <div style={msg.type === 'success' ? styles.success : styles.error}>{msg.text}</div>
        )}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Thông tin cơ bản</h2>
          <div style={styles.info}>
            <div><div style={styles.infoLabel}>Email</div><div style={styles.infoValue}>{user.email}</div></div>
            <div><div style={styles.infoLabel}>Vai trò</div><div style={styles.infoValue}>{user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</div></div>
            <div><div style={styles.infoLabel}>Ngày tạo</div><div style={styles.infoValue}>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</div></div>
          </div>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Cập nhật thông tin</h2>
          <form onSubmit={handleUpdate}>
            <div style={styles.row}>
              <div style={{ ...styles.field, flex: 1 }}><label style={styles.label}>Họ và tên</label><input style={styles.input} value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} /></div>
              <div style={{ ...styles.field, flex: 1 }}><label style={styles.label}>Số điện thoại</label><input style={styles.input} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <div style={styles.field}><label style={styles.label}>Công ty</label><input style={styles.input} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
            <div style={styles.field}><label style={styles.label}>Địa chỉ</label><input style={styles.input} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
            <button type="submit" disabled={saving} style={{ ...styles.btn, ...(saving ? styles.btnDisabled : {}) }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
          </form>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Đổi mật khẩu</h2>
          <form onSubmit={handleChangePassword}>
            <div style={styles.field}><label style={styles.label}>Mật khẩu hiện tại</label><input style={styles.input} type="password" value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} /></div>
            <div style={styles.row}>
              <div style={{ ...styles.field, flex: 1 }}><label style={styles.label}>Mật khẩu mới</label><input style={styles.input} type="password" value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} /></div>
              <div style={{ ...styles.field, flex: 1 }}><label style={styles.label}>Xác nhận mật khẩu</label><input style={styles.input} type="password" value={pwForm.confirmPassword} onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })} /></div>
            </div>
            <button type="submit" disabled={saving} style={{ ...styles.btn, ...(saving ? styles.btnDisabled : {}) }}>{saving ? 'Đang xử lý...' : 'Đổi mật khẩu'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
