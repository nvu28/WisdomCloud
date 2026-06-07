import React from 'react';

const CATEGORY_COLORS = {
  'Cloud Server': '#3b82f6',
  'Cloud Email': '#10b981',
  'Cloud Security': '#f59e0b',
  'Storage': '#8b5cf6',
  'Webhosting': '#06b6d4',
  'Data Center [Colocation]': '#ef4444',
};

export default function SearchResults({ services, loading }) {
  if (loading) {
    return <div style={styles.loading}>Đang tải dữ liệu...</div>;
  }

  if (!services || services.length === 0) {
    return (
      <div style={styles.empty}>
        Không tìm thấy dịch vụ phù hợp. Vui lòng thử lại với từ khóa khác.
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {services.map((s, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.name}>{s.name}</h3>
            <span style={{
              ...styles.badge,
              background: CATEGORY_COLORS[s.category] || '#6b7280',
            }}>
              {s.category}
            </span>
          </div>
          <div style={styles.provider}>{s.provider}</div>
          <div style={styles.priceRow}>
            <span style={styles.price}>
              {s.price.toLocaleString('vi-VN')}₫
            </span>
            <span style={styles.unit}>/{s.unit.replace('vnd/', '')}</span>
          </div>
          <div style={styles.specs}>
            {s.specs.split('\n').slice(0, 4).map((line, j) => (
              <div key={j} style={styles.specLine}>• {line}</div>
            ))}
            {s.specs.split('\n').length > 4 && (
              <div style={styles.moreSpecs}>+{s.specs.split('\n').length - 4} chi tiết khác</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 16,
  },
  card: {
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  provider: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  priceRow: {
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 800,
    color: '#2563eb',
  },
  unit: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 4,
  },
  specs: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 1.6,
  },
  specLine: {
    marginBottom: 2,
  },
  moreSpecs: {
    color: '#2563eb',
    fontWeight: 500,
    marginTop: 4,
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: 60,
    color: '#94a3b8',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    padding: 60,
    color: '#94a3b8',
    fontSize: 16,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
};
