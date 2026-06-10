import React, { useState, useEffect } from 'react';
import { getServiceDetail } from '../api/cloudApi';

const CATEGORY_STYLES = {
  'Cloud Server': { bg: '#eff6ff', color: '#2563eb', icon: '🖥️' },
  'Cloud Email': { bg: '#ecfdf5', color: '#059669', icon: '📧' },
  'Cloud Security': { bg: '#fffbeb', color: '#d97706', icon: '🔒' },
  'Storage': { bg: '#f5f3ff', color: '#7c3aed', icon: '💾' },
  'Web Hosting': { bg: '#ecfeff', color: '#0891b2', icon: '🌐' },
  'Data Center': { bg: '#fef2f2', color: '#dc2626', icon: '🏢' },
  'Domain': { bg: '#fefce8', color: '#a16207', icon: '🌐' },
};

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function ServiceDetail({ serviceId, onClose }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) return;
    setLoading(true);
    getServiceDetail(serviceId)
      .then(setService)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [serviceId]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const catStyle = service ? CATEGORY_STYLES[service.category] || { bg: '#f8fafc', color: '#64748b', icon: '☁️' } : {};

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        {loading ? (
          <div style={styles.center}>
            <div style={styles.spinner} />
            <p style={styles.loadingText}>Đang tải...</p>
          </div>
        ) : !service ? (
          <div style={styles.center}>
            <p style={{ color: '#ef4444' }}>Không tìm thấy dịch vụ</p>
          </div>
        ) : (
          <>
            <div style={styles.header}>
              <div style={{ ...styles.catBadge, background: catStyle.bg, color: catStyle.color }}>
                <span>{catStyle.icon}</span>
                {service.category}
              </div>
              <div style={styles.providerBadge}>{service.provider}</div>
            </div>

            <h2 style={styles.name}>{service.name}</h2>

            <div style={styles.priceRow}>
              <span style={styles.price}>{formatPrice(service.price)}</span>
              <span style={styles.unit}>{service.unit || '/tháng'}</span>
            </div>

            {service.description && (
              <p style={styles.desc}>{service.description}</p>
            )}

            <div style={styles.specsSection}>
              <h3 style={styles.specsTitle}>Thông số kỹ thuật</h3>
              <div style={styles.specsList}>
                {service.cores && (
                  <div style={styles.specItem}>
                    <span style={styles.specLabel}>CPU</span>
                    <span style={styles.specValue}>{service.cores} Cores</span>
                  </div>
                )}
                {service.ram && (
                  <div style={styles.specItem}>
                    <span style={styles.specLabel}>RAM</span>
                    <span style={styles.specValue}>{service.ram} GB</span>
                  </div>
                )}
                {service.storage && (
                  <div style={styles.specItem}>
                    <span style={styles.specLabel}>Storage</span>
                    <span style={styles.specValue}>{service.storage}</span>
                  </div>
                )}
              </div>
              <div style={styles.fullSpecs}>
                {service.specs.split('\n').filter(Boolean).map((line, i) => (
                  <div key={i} style={styles.specLine}>
                    <span style={styles.specDot}>•</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <button style={styles.contactBtn}>Liên hệ tư vấn ngay</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    background: '#fff',
    borderRadius: 20,
    padding: 36,
    maxWidth: 580,
    width: '100%',
    maxHeight: '85vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: 'none',
    background: '#f1f5f9',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  catBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
  },
  providerBadge: {
    padding: '6px 14px',
    borderRadius: 8,
    background: '#f1f5f9',
    color: '#475569',
    fontSize: 13,
    fontWeight: 600,
  },
  name: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1e293b',
    margin: '0 0 16px',
    lineHeight: 1.3,
  },
  priceRow: {
    marginBottom: 16,
    padding: '16px 20',
    background: '#f8fafc',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 800,
    color: '#2563eb',
  },
  unit: {
    fontSize: 14,
    color: '#94a3b8',
  },
  desc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 1.6,
    margin: '0 0 20px',
    padding: '12px 16',
    background: '#f8fafc',
    borderRadius: 10,
  },
  specsSection: {
    marginBottom: 20,
  },
  specsTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1e293b',
    margin: '0 0 12px',
  },
  specsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 8,
    marginBottom: 12,
  },
  specItem: {
    padding: '10px 14',
    background: '#f8fafc',
    borderRadius: 8,
  },
  specLabel: {
    display: 'block',
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: 600,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  specValue: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1e293b',
  },
  fullSpecs: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 1.7,
    padding: '12px 16',
    background: '#f8fafc',
    borderRadius: 10,
  },
  specLine: { marginBottom: 3 },
  specDot: {
    color: '#2563eb',
    marginRight: 6,
    fontWeight: 700,
  },
  contactBtn: {
    padding: '14px 0',
    width: '100%',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
  },
  center: {
    textAlign: 'center',
    padding: '40px 0',
  },
  spinner: {
    width: 36,
    height: 36,
    border: '4px solid #e2e8f0',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 12px',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
    margin: 0,
  },
};
