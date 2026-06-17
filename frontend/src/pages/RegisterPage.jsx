import React, { useState } from 'react';
import { registerUser } from '../api/cloudApi';

const styles = {
  container: { minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px 20px' },
  card: { background: '#fff', borderRadius: 16, padding: '40px 48px', width: '100%', maxWidth: 440, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 8, textAlign: 'center' },
  sub: { textAlign: 'center', color: '#64748b', marginBottom: 32, fontSize: 14 },
  input: { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  field: { marginBottom: 18 },
  btn: { width: '100%', padding: '13px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13, textAlign: 'center' },
  link: { color: '#2563eb', cursor: 'pointer', fontWeight: 500 },
  footer: { textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748b' },
  row: { display: 'flex', gap: 12 },
};

export default function RegisterPage({ onNavigate, onLoginSuccess, t }) {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.email || !form.password) { setError('Vui lòng điền đầy đủ thông tin'); return; }
    if (form.password !== form.confirmPassword) { setError('Mật khẩu xác nhận không khớp'); return; }
    if (form.password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }
    setLoading(true);
    try {
      const data = await registerUser({ fullName: form.fullName, email: form.email, phone: form.phone, password: form.password });
      onLoginSuccess && onLoginSuccess(data);
      onNavigate && onNavigate('home');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng ký thất bại');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t('common.register')}</h1>
        <p style={styles.sub}>Tạo tài khoản để sử dụng dịch vụ WisdomCloud</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Họ và tên</label>
            <input style={styles.input} type="text" placeholder="Nguyễn Văn A"
              value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" placeholder="example@email.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Số điện thoại</label>
            <input style={styles.input} type="tel" placeholder="090 123 4567"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div style={styles.row}>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>{t('common.password')}</label>
              <input style={styles.input} type="password" placeholder="••••••••"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>Xác nhận mật khẩu</label>
              <input style={styles.input} type="password" placeholder="••••••••"
                value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}>
            {loading ? 'Đang xử lý...' : t('common.register')}
          </button>
        </form>
        <div style={styles.footer}>
          Đã có tài khoản?{' '}
          <span style={styles.link} onClick={() => onNavigate && onNavigate('dang-nhap')}>Đăng nhập</span>
        </div>
      </div>
    </div>
  );
}
