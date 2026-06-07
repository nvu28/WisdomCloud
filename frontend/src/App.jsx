import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';
import { searchServices } from './api/cloudApi';

export default function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [params, setParams] = useState({});

  const handleSearch = async (newParams) => {
    setLoading(true);
    setParams(newParams);
    setPage(0);
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
    setPage(newPage);
    try {
      const data = await searchServices({ ...params, page: newPage, size: 12 });
      setResults(data);
    } catch {
      // keep old results
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>☁️</span>
            <span style={styles.logoText}>CloudServices</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Tên miền</a>
            <a href="#" style={styles.navLink}>Hosting</a>
            <a href="#" style={styles.navLink}>Email</a>
            <a href="#" style={styles.navLink}>Server</a>
            <a href="#" style={{ ...styles.navLink, ...styles.navActive }}>Cloud</a>
            <a href="#" style={styles.navLink}>Security</a>
          </nav>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Tra cứu báo giá dịch vụ Cloud</h1>
          <p style={styles.heroSub}>
            So sánh giá Cloud Server, Cloud Email, Cloud Security từ nhiều nhà cung cấp
          </p>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </section>

      <main style={styles.main}>
        {results && (
          <div style={styles.stats}>
            <span>Tìm thấy <strong>{results.totalElements}</strong> dịch vụ</span>
            <span style={styles.statsDivider}>|</span>
            <span>Trang {results.page + 1}/{results.totalPages}</span>
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
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <p style={styles.footerText}>
            &copy; 2026 CloudServices. Dữ liệu báo giá tham khảo từ các nhà cung cấp.
          </p>
        </div>
      </footer>
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
  header: {
    background: '#fff',
    borderBottom: '1px solid #f1f5f9',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 24,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 800,
    color: '#1e293b',
  },
  nav: {
    display: 'flex',
    gap: 24,
  },
  navLink: {
    textDecoration: 'none',
    color: '#64748b',
    fontSize: 14,
    fontWeight: 500,
    padding: '8px 0',
    borderBottom: '2px solid transparent',
  },
  navActive: {
    color: '#2563eb',
    borderBottomColor: '#2563eb',
  },
  hero: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    padding: '60px 24px',
  },
  heroContent: {
    maxWidth: 900,
    margin: '0 auto',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: '#fff',
    margin: '0 0 12px',
  },
  heroSub: {
    fontSize: 16,
    color: '#94a3b8',
    margin: '0 0 32px',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px 24px',
  },
  stats: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  statsDivider: {
    color: '#e2e8f0',
  },
  footer: {
    background: '#fff',
    borderTop: '1px solid #f1f5f9',
    marginTop: 48,
  },
  footerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#94a3b8',
    margin: 0,
  },
};
