import React, { useState } from 'react';
import { CATEGORY_NAV, SUB_PAGES } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const ICONS = ['🌟', '💼', '🏢'];

export default function HostingPage({ pageKey, onNavigate }) {
  const p = SUB_PAGES[pageKey];
  const nav = CATEGORY_NAV['hosting'];
  const [expandedFaq, setExpandedFaq] = useState(null);

  const plans = p.content?.plans || [];

  return (
    <div>
      {/* SERVICE SUB-MENU */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>WEB & HOSTING</span>
            {nav.items.map((item, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                style={item.page === pageKey ? styles.snActive : styles.snLink}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={sectionInner}>
          <div style={styles.heroInner}>
            <span style={{ fontSize: 48, marginBottom: 12, display: 'block' }}>{p.icon}</span>
            <div style={styles.heroBadge}>DỊCH VỤ</div>
            <h1 style={styles.heroTitle}>{p.title}</h1>
            <p style={styles.heroDesc}>{p.desc}</p>
            {p.price && <div style={{ ...styles.heroPrice, color: p.color }}>{p.price}</div>}
          </div>
        </div>
      </section>

      {/* 3-TIER PRICING CARDS */}
      {plans.length > 0 && (
        <section style={styles.pricingSection}>
          <div style={sectionInner}>
            <h2 style={styles.sectionTitle}>BẢNG GIÁ DỊCH VỤ</h2>
            <p style={styles.sectionSub}>Chọn gói phù hợp với nhu cầu của bạn</p>
            <div style={styles.plansGrid}>
              {plans.map((pl, i) => (
                <div key={i} style={{
                  ...styles.planCard,
                  ...(pl.popular ? styles.planCardPopular : {}),
                  borderTopColor: pl.popular ? p.color : '#e2e8f0',
                }}>
                  {pl.popular && <div style={{ ...styles.planBadge, background: p.color }}>PHỔ BIẾN</div>}
                  <span style={{ fontSize: 36 }}>{ICONS[i] || '🚀'}</span>
                  <h3 style={styles.planName}>{pl.name}</h3>
                  <div style={{ ...styles.planPrice, color: p.color }}>
                    {pl.price}
                    {pl.price.includes('/') && (
                      <span style={styles.planPeriod}>/{pl.price.split('/')[1]}</span>
                    )}
                  </div>
                  <ul style={styles.planFeatures}>
                    {pl.features.map((f, j) => (
                      <li key={j} style={styles.planFeature}>
                        <span style={{ color: p.color, fontWeight: 700, marginRight: 8 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#" style={{ ...styles.planCta, background: p.color }}>Đăng ký ngay</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURE DETAILS LIST */}
      {p.features && (
        <section style={styles.featureSection}>
          <div style={sectionInner}>
            <h2 style={styles.sectionTitle}>TÍNH NĂNG NỔI BẬT</h2>
            <div style={styles.featureGrid}>
              {p.features.map((f, i) => (
                <div key={i} style={styles.featureCard}>
                  <span style={{ ...styles.featIcon, background: p.color + '12', color: p.color }}>
                    {['🖥️', '⚡', '🛡️', '💾', '🔧', '🌐'][i % 6]}
                  </span>
                  <div>
                    <h4 style={styles.featTitle}>{f.split(' — ')[0]}</h4>
                    {f.includes(' — ') && (
                      <p style={styles.featDesc}>{f.split(' — ')[1]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section style={{ ...styles.featureSection, background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>VÌ SAO CHỌN WISDOMCLOUD</h2>
          <div style={styles.whyGrid}>
            {[
              { icon: '🏆', title: 'Đối tác tin cậy', desc: 'Hơn 25 năm dẫn đầu thị trường hosting Việt Nam' },
              { icon: '🛡️', title: 'Bảo mật đa lớp', desc: 'Imunify360, WAF, DDoS protection, daily backup' },
              { icon: '⚡', title: 'Tốc độ vượt trội', desc: 'Litespeed Enterprise, Redis Cache, SSD NVMe' },
              { icon: '💬', title: 'Hỗ trợ 24/7/365', desc: 'Đội ngũ kỹ thuật chuyên gia luôn sẵn sàng' },
            ].map((w, i) => (
              <div key={i} style={styles.whyCard}>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>{w.icon}</span>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: '#1e293b' }}>{w.title}</h4>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>Câu hỏi thường gặp</h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {[
              { q: `${p.title} là gì?`, a: `${p.title} là dịch vụ ${p.desc?.toLowerCase() || 'chuyên nghiệp dành cho doanh nghiệp'}.` },
              { q: 'Tôi có thể nâng cấp gói dịch vụ không?', a: 'Có, bạn có thể nâng cấp bất kỳ lúc nào. Phần chênh lệch được tính theo tỷ lệ thời gian còn lại.' },
              { q: 'Có hỗ trợ kỹ thuật 24/7 không?', a: 'Có, đội ngũ kỹ thuật của chúng tôi hỗ trợ 24/7/365 qua hotline, email và chat trực tuyến.' },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '14px 0', border: 'none',
                    background: 'none', cursor: 'pointer', fontSize: 14,
                    fontWeight: 500, color: expandedFaq === i ? '#dd1b5c' : '#1e293b',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{faq.q}</span>
                  <span style={{
                    color: '#aaa', fontSize: 11,
                    transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>▼</span>
                </button>
                <div style={{
                  maxHeight: expandedFaq === i ? '300px' : '0',
                  opacity: expandedFaq === i ? 1 : 0,
                  overflow: 'hidden', transition: 'all 0.25s ease',
                }}>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0, padding: '0 0 16px' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  subNav: {
    background: '#fff', borderBottom: '1px solid #e8e8e8',
    position: 'sticky', top: 0, zIndex: 50,
  },
  subNavInner: {
    display: 'flex', alignItems: 'center', gap: 20,
    padding: '10px 0', overflowX: 'auto',
  },
  subNavTitle: {
    fontSize: 13, fontWeight: 800, color: '#1e293b',
    whiteSpace: 'nowrap', letterSpacing: 1,
  },
  snLink: {
    padding: '6px 14px', fontSize: 13, color: '#555',
    borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500,
  },
  snActive: {
    padding: '6px 14px', fontSize: 13, color: '#fff',
    background: '#2563eb', borderRadius: 6, textDecoration: 'none',
    whiteSpace: 'nowrap', fontWeight: 600,
  },
  hero: {
    padding: '50px 0', background: '#f8fafc',
    borderBottom: '1px solid #e8e8e8',
  },
  heroInner: { textAlign: 'center' },
  heroBadge: {
    fontSize: 12, fontWeight: 700, color: '#888',
    textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8,
  },
  heroTitle: { fontSize: 30, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  heroDesc: { fontSize: 15, color: '#666', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.6 },
  heroPrice: { fontSize: 18, fontWeight: 800 },

  pricingSection: {
    padding: '50px 0', background: '#fff',
  },
  sectionTitle: {
    fontSize: 22, fontWeight: 800, color: '#1e293b',
    textAlign: 'center', margin: '0 0 8px', textTransform: 'uppercase',
  },
  sectionSub: {
    fontSize: 14, color: '#666', textAlign: 'center', margin: '0 0 32px',
  },
  plansGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
  },
  planCard: {
    background: '#fff', borderRadius: 12, padding: '32px 24px',
    border: '2px solid #e2e8f0', borderTop: '4px solid',
    textAlign: 'center', position: 'relative',
    display: 'flex', flexDirection: 'column', gap: 12,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  planCardPopular: {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 32px rgba(37,99,235,0.15)',
    borderColor: '#2563eb',
  },
  planBadge: {
    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
    color: '#fff', fontSize: 11, fontWeight: 700,
    padding: '4px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1,
  },
  planName: { fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 },
  planPrice: { fontSize: 24, fontWeight: 800 },
  planPeriod: { fontSize: 14, fontWeight: 400, color: '#94a3b8' },
  planFeatures: {
    listStyle: 'none', padding: 0, margin: 0,
    textAlign: 'left', flex: 1,
  },
  planFeature: {
    fontSize: 13, color: '#475569', padding: '7px 0',
    borderBottom: '1px solid #f8fafc',
  },
  planCta: {
    padding: '12px 24px', color: '#fff', borderRadius: 8,
    fontSize: 14, fontWeight: 600, textDecoration: 'none',
    display: 'inline-block', marginTop: 8,
  },

  featureSection: {
    padding: '50px 0', background: '#fff',
  },
  featureGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
  },
  featureCard: {
    display: 'flex', gap: 16, alignItems: 'flex-start',
    background: '#fff', padding: 20, borderRadius: 10,
    border: '1px solid #f1f5f9',
  },
  featIcon: {
    width: 44, height: 44, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    fontSize: 20,
  },
  featTitle: { fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' },
  featDesc: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.4 },

  whyGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
  },
  whyCard: {
    background: '#fff', borderRadius: 12, padding: 24,
    textAlign: 'center', border: '1px solid #f1f5f9',
  },
};
