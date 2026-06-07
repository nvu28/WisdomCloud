import React from 'react';

const CATEGORY_STYLES = {
  'Cloud Server': { bg: '#eff6ff', color: '#2563eb', icon: '🖥️' },
  'Cloud Email': { bg: '#ecfdf5', color: '#059669', icon: '📧' },
  'Cloud Security': { bg: '#fffbeb', color: '#d97706', icon: '🔒' },
  'Storage': { bg: '#f5f3ff', color: '#7c3aed', icon: '💾' },
  'Web Hosting': { bg: '#ecfeff', color: '#0891b2', icon: '🌐' },
  'Data Center': { bg: '#fef2f2', color: '#dc2626', icon: '🏢' },
};

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function SearchResults({ services, loading }) {
  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Đang tìm kiếm dịch vụ...</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={styles.emptyIcon}>🔍</span>
        <p style={styles.emptyTitle}>Không tìm thấy dịch vụ</p>
        <p style={styles.emptyDesc}>
          Vui lòng thử lại với từ khóa hoặc bộ lọc khác
        </p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {services.map((s) => {
        const style = CATEGORY_STYLES[s.category] || { bg: '#f8fafc', color: '#64748b', icon: '☁️' };
        const specLines = s.specs.split('\n').filter(Boolean);
        return (
          <div key={s.id} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={{ ...styles.catBadge, background: style.bg, color: style.color }}>
                <span style={styles.catIcon}>{style.icon}</span>
                {s.category}
              </div>
              <div style={styles.providerBadge}>{s.provider}</div>
            </div>

            <h3 style={styles.name}>{s.name}</h3>

            <div style={styles.priceRow}>
              <span style={styles.price}>{formatPrice(s.price)}</span>
              <span style={styles.unit}>/tháng</span>
            </div>

            <div style={styles.specs}>
              {specLines.slice(0, 3).map((line, j) => (
                <div key={j} style={styles.specLine}>
                  <span style={styles.specDot}>•</span>
                  {line}
                </div>
              ))}
              {specLines.length > 3 && (
                <div style={styles.moreSpecs}>
                  +{specLines.length - 3} chi tiết khác
                </div>
              )}
            </div>

            <button style={styles.contactBtn}>Liên hệ tư vấn</button>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  catBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  catIcon: { fontSize: 14 },
  providerBadge: {
    padding: '4px 10px',
    borderRadius: 6,
    background: '#f1f5f9',
    color: '#475569',
    fontSize: 12,
    fontWeight: 600,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 12px',
    lineHeight: 1.3,
  },
  priceRow: {
    marginBottom: 14,
    padding: '12px 0',
    borderTop: '1px solid #f8fafc',
    borderBottom: '1px solid #f8fafc',
  },
  price: {
    fontSize: 22,
    fontWeight: 800,
    color: '#2563eb',
  },
  unit: {
    fontSize: 13,
    color: '#94a3b8',
    marginLeft: 4,
  },
  specs: {
    flex: 1,
    fontSize: 12,
    color: '#64748b',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  specLine: { marginBottom: 2 },
  specDot: {
    color: '#2563eb',
    marginRight: 6,
    fontWeight: 700,
  },
  moreSpecs: {
    color: '#2563eb',
    fontWeight: 600,
    marginTop: 6,
    fontSize: 12,
    cursor: 'pointer',
  },
  contactBtn: {
    padding: '10px 0',
    width: '100%',
    background: '#f8fafc',
    color: '#2563eb',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  center: {
    textAlign: 'center',
    padding: 60,
  },
  spinner: {
    width: 40,
    height: 40,
    border: '4px solid #e2e8f0',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 15,
    margin: 0,
  },
  empty: {
    textAlign: 'center',
    padding: 60,
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  emptyIcon: { fontSize: 48 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1e293b',
    margin: '16px 0 8px',
  },
  emptyDesc: {
    fontSize: 14,
    color: '#64748b',
    margin: 0,
  },
};
