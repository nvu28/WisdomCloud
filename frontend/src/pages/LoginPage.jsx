import React, { useState } from 'react';
import { loginUser } from '../api/cloudApi';

const styles = {
  container: { minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px 20px' },
  card: { background: '#fff', borderRadius: 16, padding: '40px 48px', width: '100%', maxWidth: 440, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  title: { fontSize: 26, fontWeight: 700, color: '#1e293b', marginBottom: 8, textAlign: 'center' },
  sub: { textAlign: 'center', color: '#64748b', marginBottom: 32, fontSize: 14 },
  input: { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
  inputFocus: { borderColor: '#2563eb' },
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  field: { marginBottom: 20 },
  btn: { width: '100%', padding: '13px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  error: { background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 13, textAlign: 'center' },
  link: { color: '#2563eb', cursor: 'pointer', fontWeight: 500 },
  footer: { textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748b' },
};

export default function LoginPage({ onNavigate, onLoginSuccess, t }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Vui lòng nhập email và mật khẩu'); return; }
    setLoading(true);
    try {
      const data = await loginUser(form);
      onLoginSuccess && onLoginSuccess(data);
      onNavigate && onNavigate('home');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t('common.login')}</h1>
        <p style={styles.sub}>Đăng nhập để quản lý dịch vụ của bạn</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input} type="email" placeholder="example@email.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>{t('common.password')}</label>
            <input
              style={styles.input} type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" disabled={loading} style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}>
            {loading ? 'Đang xử lý...' : t('common.login')}
          </button>
        </form>
        <div style={styles.footer}>
          Chưa có tài khoản?{' '}
          <span style={styles.link} onClick={() => onNavigate && onNavigate('dang-ky')}>Đăng ký ngay</span>
        </div>
      </div>
    </div>
  );
}
