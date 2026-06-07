import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';
import { searchServices } from './api/cloudApi';

const SERVICE_HIGHLIGHTS = [
  { icon: '🖥️', title: 'Cloud Server', desc: 'Intel Xeon, Unlimited bandwidth, SSD NVMe', color: '#3b82f6' },
  { icon: '📧', title: 'Cloud Email', desc: 'Email doanh nghiệp, chống spam, SLA 99.9%', color: '#10b981' },
  { icon: '🔒', title: 'Cloud Security', desc: 'WAF, Anti-DDoS, SSL Certificate', color: '#f59e0b' },
  { icon: '☁️', title: 'Cloud Storage', desc: 'Backup dữ liệu, Cloud Drive an toàn', color: '#8b5cf6' },
];

export default function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (newParams) => {
    setLoading(true);
    setParams(newParams);
    setShowSearch(true);
    try {
      const data = await searchServices({ ...newParams, page: 0, size: 12 });
      setResults(data);
    } catch {
      setResults({ content: [], totalElements: 0, totalPages: 0, page: 0, size: 12 });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const data = await searchServices({ ...params, page: newPage, size: 12 });
      setResults(data);
    } catch {}
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <Header />

      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Giải Pháp Cloud Toàn Diện Cho Doanh Nghiệp
          </h1>
          <p style={styles.heroSub}>
            Cloud Server, Cloud Email, Cloud Security - Bảo mật, Ổn định, Hiệu suất cao
          </p>

          <div style={styles.domainSearch}>
            <div style={styles.domainLabel}>Tên miền chỉ từ 49.000₫</div>
            <div style={styles.domainRow}>
              <input
                style={styles.domainInput}
                placeholder="Nhập tên miền của bạn..."
              />
              <button style={styles.domainBtn}>Tìm tên miền</button>
            </div>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statItem}>
              <span style={styles.statNum}>10+</span>
              <span style={styles.statLabel}>Năm kinh nghiệm</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>50.000+</span>
              <span style={styles.statLabel}>Khách hàng</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>99.9%</span>
              <span style={styles.statLabel}>Uptime</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>24/7</span>
              <span style={styles.statLabel}>Hỗ trợ</span>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.services}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Dịch Vụ Cloud Của Chúng Tôi</h2>
          <p style={styles.sectionSub}>Giải pháp toàn diện cho mọi nhu cầu</p>
          <div style={styles.serviceGrid}>
            {SERVICE_HIGHLIGHTS.map((svc, i) => (
              <div key={i} style={styles.serviceCard}>
                <div style={{ ...styles.serviceIcon, background: svc.color + '15' }}>
                  <span style={{ fontSize: 32 }}>{svc.icon}</span>
                </div>
                <h3 style={styles.serviceTitle}>{svc.title}</h3>
                <p style={styles.serviceDesc}>{svc.desc}</p>
                <a href="#" style={styles.serviceLink}>Xem chi tiết →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.searchSection}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Tra Cứu Báo Giá Cloud</h2>
          <p style={styles.sectionSub}>
            So sánh giá từ nhiều nhà cung cấp: P.A, CMC Cloud, FPT, Viettel, VNPT, vHost
          </p>
          <SearchForm onSearch={handleSearch} loading={loading} />

          {showSearch && (
            <>
              {results && (
                <div style={styles.stats}>
                  <span>Tìm thấy <strong>{results.totalElements}</strong> dịch vụ</span>
                  <span style={styles.statsSep}>|</span>
                  <span>Trang {results.page + 1}/{results.totalPages || 1}</span>
                  <button
                    style={styles.backBtn}
                    onClick={() => setShowSearch(false)}
                  >
                    ← Quay lại
                  </button>
                </div>
              )}
              <SearchResults services={results?.content} loading={loading} />
              {results && (
                <Pagination
                  page={results.page}
                  totalPages={results.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '80px 24px',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 50%)',
  },
  heroContent: {
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 800,
    color: '#fff',
    margin: '0 0 16px',
    lineHeight: 1.2,
  },
  heroSub: {
    fontSize: 18,
    color: '#94a3b8',
    margin: '0 0 36px',
    lineHeight: 1.5,
  },
  domainSearch: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 36,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  domainLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#f59e0b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  domainRow: {
    display: 'flex',
    gap: 8,
  },
  domainInput: {
    flex: 1,
    padding: '14px 20px',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
  },
  domainBtn: {
    padding: '14px 32px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 48,
  },
  statItem: {
    textAlign: 'center',
  },
  statNum: {
    display: 'block',
    fontSize: 28,
    fontWeight: 800,
    color: '#60a5fa',
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  services: {
    padding: '80px 24px',
  },
  sectionInner: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: '#1e293b',
    textAlign: 'center',
    margin: '0 0 8px',
  },
  sectionSub: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    margin: '0 0 40px',
  },
  serviceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 24,
  },
  serviceCard: {
    background: '#fff',
    borderRadius: 16,
    padding: 32,
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
    transition: 'transform 0.2s',
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: '0 0 8px',
    color: '#1e293b',
  },
  serviceDesc: {
    fontSize: 14,
    color: '#64748b',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  serviceLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
  },
  searchSection: {
    padding: '0 24px 60px',
  },
  stats: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  statsSep: { color: '#e2e8f0' },
  backBtn: {
    background: 'none',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: '4px 12px',
    fontSize: 13,
    color: '#64748b',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
};
