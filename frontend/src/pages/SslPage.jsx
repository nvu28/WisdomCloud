import React, { useState } from 'react';
import { getCategoryNav, getSubPages } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const CERT_LEVELS = [
  {
    level: 'DV SSL',
    title: 'Domain Validation',
    color: '#059669',
    bg: '#ecfdf5',
    icon: '🔒',
    price: 'Từ 299.000₫',
    features: ['Xác thực tên miền', 'Cấp phát trong 5-10 phút', 'Mã hóa 256-bit', 'Bảo hiểm $10,000', 'Phù hợp blog, website cá nhân'],
  },
  {
    level: 'OV SSL',
    title: 'Organization Validation',
    color: '#d97706',
    bg: '#fffbeb',
    icon: '🛡️',
    price: 'Từ 1.200.000₫',
    features: ['Xác thực tổ chức/doanh nghiệp', 'Cấp phát trong 1-3 ngày', 'Mã hóa 256-bit', 'Bảo hiểm $1,000,000', 'Phù hợp SME, website thương mại'],
  },
  {
    level: 'EV SSL',
    title: 'Extended Validation',
    color: '#dc2626',
    bg: '#fef2f2',
    icon: '✅',
    price: 'Từ 4.500.000₫',
    features: ['Xác thực nâng cao nhất', 'Cấp phát trong 3-7 ngày', 'Xanh thanh địa chỉ trình duyệt', 'Bảo hiểm $2,000,000', 'Phù hợp ngân hàng, thương mại điện tử'],
  },
];

const CERT_LEVELS_EN = [
  {
    level: 'DV SSL',
    title: 'Domain Validation',
    color: '#059669',
    bg: '#ecfdf5',
    icon: '🔒',
    price: 'Từ 299.000₫',
    features: ['Domain validation', 'Issued in 5-10 minutes', '256-bit encryption', '$10,000 warranty', 'Suitable for blogs, personal sites'],
  },
  {
    level: 'OV SSL',
    title: 'Organization Validation',
    color: '#d97706',
    bg: '#fffbeb',
    icon: '🛡️',
    price: 'Từ 1.200.000₫',
    features: ['Organization/business validation', 'Issued in 1-3 days', '256-bit encryption', '$1,000,000 warranty', 'Suitable for SMEs, e-commerce'],
  },
  {
    level: 'EV SSL',
    title: 'Extended Validation',
    color: '#dc2626',
    bg: '#fef2f2',
    icon: '✅',
    price: 'Từ 4.500.000₫',
    features: ['Highest level validation', 'Issued in 3-7 days', 'Green browser address bar', '$2,000,000 warranty', 'Suitable for banks, e-commerce'],
  },
];

const BRAND_COMPARE = [
  { brand: 'Sectigo', dv: '299.000₫', ov: '1.290.000₫', ev: '4.990.000₫', wildcard: '3.990.000₫', rating: '★★★★☆' },
  { brand: 'Comodo', dv: '349.000₫', ov: '1.490.000₫', ev: '5.490.000₫', wildcard: '4.290.000₫', rating: '★★★★☆' },
  { brand: 'RapidSSL', dv: '699.000₫', ov: '—', ev: '—', wildcard: '2.490.000₫', rating: '★★★☆☆' },
  { brand: 'GeoTrust', dv: '899.000₫', ov: '2.490.000₫', ev: '7.990.000₫', wildcard: '5.990.000₫', rating: '★★★★★' },
  { brand: 'Digicert', dv: '1.990.000₫', ov: '3.990.000₫', ev: '9.990.000₫', wildcard: '7.990.000₫', rating: '★★★★★' },
  { brand: 'Thawte', dv: '1.290.000₫', ov: '2.990.000₫', ev: '7.490.000₫', wildcard: '5.490.000₫', rating: '★★★★☆' },
];

const BROWSER_LOGOS = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];

export default function SslPage({ pageKey, onNavigate, lang }) {
  const p = getSubPages(lang)[pageKey];
  const nav = getCategoryNav(lang)['ssl'];
  const [expandedFaq, setExpandedFaq] = useState(null);
  const certData = lang === 'en' ? CERT_LEVELS_EN : CERT_LEVELS;

  return (
    <div>
      {/* SUB-NAV */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>{lang === 'en' ? 'SSL & SECURITY' : 'SSL & BẢO MẬT'}</span>
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
      <section style={{ ...styles.hero, background: p.bg || '#f8fafc' }}>
        <div style={sectionInner}>
          <div style={styles.heroInner}>
            <span style={{ fontSize: 56, display: 'block', marginBottom: 8 }}>{p.icon}</span>
            <div style={styles.heroBadge}>{lang === 'en' ? 'SSL CERTIFICATES' : 'CHỨNG CHỈ SSL'}</div>
            <h1 style={styles.heroTitle}>{p.title}</h1>
            <p style={styles.heroDesc}>{p.desc}</p>
            {p.price && <div style={{ ...styles.heroPrice, color: p.color }}>{p.price}</div>}
            <div style={styles.heroCerts}>
              {(lang === 'en'
  ? ['99.9% browser compatibility', 'Up to $2,000,000 warranty', 'Auto-issued in 5 minutes']
  : ['Tương thích 99.9% trình duyệt', 'Bảo hiểm lên đến $2,000,000', 'Cấp phát tự động trong 5 phút']
).map((c, i) => (
                <span key={i} style={styles.certBadge}>✓ {c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {p.features && (
        <section style={{ padding: '50px 0', background: '#fff' }}>
          <div style={sectionInner}>
            <h2 style={styles.sectionTitle}>{lang === 'en' ? 'HIGHLIGHTS' : 'TÍNH NĂNG NỔI BẬT'}</h2>
            <div style={styles.featGrid}>
              {p.features.map((f, i) => (
                <div key={i} style={styles.featCard}>
                  <span style={{ ...styles.featIcon, background: p.color + '15', color: p.color }}>
                    {['🔒', '⚡', '🌐', '🛡️', '💰', '📱', '🔄', '🔑'][i % 8]}
                  </span>
                  <div>
                    <h4 style={styles.featTitle}>
                      {f.includes(' — ') ? f.split(' — ')[0] : f.includes(',') ? f.split(',')[0] : f.substring(0, 50)}
                    </h4>
                    <p style={styles.featDesc}>
                      {f.includes(' — ') ? f.split(' — ')[1] : f.includes(', ') ? f.split(', ').slice(1).join(', ') : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERT LEVELS */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>{lang === 'en' ? 'CERTIFICATE LEVEL COMPARISON' : 'SO SÁNH CÁC CẤP ĐỘ CHỨNG CHỈ'}</h2>
          <div style={styles.certGrid}>
            {certData.map((cert, i) => (
              <div key={i} style={{ ...styles.certCard, borderTop: `4px solid ${cert.color}`, background: cert.bg }}>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 6 }}>{cert.icon}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: cert.color, display: 'block' }}>{cert.level}</span>
                <span style={{ fontSize: 12, color: '#666', marginBottom: 12, display: 'block' }}>{cert.title}</span>
                <div style={{ fontSize: 16, fontWeight: 800, color: cert.color, marginBottom: 14 }}>{cert.price}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#475569' }}>
                  {cert.features.map((cf, j) => (
                    <li key={j} style={{ padding: '4px 0', borderBottom: j < cert.features.length - 1 ? '1px solid #e8e8e8' : 'none' }}>
                      ✓ {cf}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PRICE TABLE */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>{lang === 'en' ? 'SSL PRICES BY BRAND' : 'BẢNG GIÁ SSL THEO THƯƠNG HIỆU'}</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{lang === 'en' ? 'Brand' : 'Thương hiệu'}</th>
                  <th style={styles.thCenter}>DV</th>
                  <th style={styles.thCenter}>OV</th>
                  <th style={styles.thCenter}>EV</th>
                  <th style={styles.thCenter}>Wildcard</th>
                  <th style={styles.thCenter}>{lang === 'en' ? 'Rating' : 'Đánh giá'}</th>
                </tr>
              </thead>
              <tbody>
                {BRAND_COMPARE.map((row, i) => (
                  <tr key={i} style={i % 2 === 0 ? { background: '#fff' } : { background: '#f8fafc' }}>
                    <td style={{ ...styles.tdLabel, color: '#1e293b', fontWeight: 700 }}>{row.brand}</td>
                    <td style={styles.tdCenter}>{row.dv}</td>
                    <td style={styles.tdCenter}>{row.ov}</td>
                    <td style={styles.tdCenter}>{row.ev}</td>
                    <td style={styles.tdCenter}>{row.wildcard}</td>
                    <td style={styles.tdCenter}><span style={{ color: '#d97706' }}>{row.rating}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BROWSER COMPATIBILITY */}
      <section style={{ padding: '40px 0', background: '#f8fafc' }}>
        <div style={sectionInner}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '28px 36px', border: '1px solid #e8e8e8', textAlign: 'center' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>{lang === 'en' ? '🔒 Browser Compatibility' : '🔒 Tương Thích Trình Duyệt'}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {BROWSER_LOGOS.map((b, i) => (
                <div key={i} style={{ padding: '10px 20px', background: '#f1f5f9', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                  {b}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: '14px 0 0' }}>
              {lang === 'en' ? '99.9% compatible with popular browsers and all mobile devices' : 'Tương thích 99.9% trình duyệt phổ biến và tất cả thiết bị di động'}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>{lang === 'en' ? 'FAQ' : 'CÂU HỎI THƯỜNG GẶP'}</h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
{(lang === 'en'
  ? [
    { q: `What is SSL? Why does a website need SSL?`, a: `SSL (Secure Sockets Layer) is a security certificate that encrypts data between the browser and website, protecting user information from theft and boosting Google ranking.` },
    { q: `${p.title} differ from free SSL?`, a: `${p.title} provides financial warranty, 24/7 technical support, organization validation (OV/EV), and broader browser compatibility than free SSL.` },
    { q: 'What is the difference between DV, OV, EV SSL?', a: 'DV (Domain Validation) validates domain - issued in minutes. OV (Organization Validation) validates business - issued in days. EV (Extended Validation) highest validation - green address bar, issued in 3-7 days.' },
    { q: 'How long does SSL installation take?', a: 'DV SSL installs in 5-10 minutes. OV SSL in 1-3 days. EV SSL in 3-7 days (depending on business information).' },
  ]
  : [
    { q: `SSL là gì? Tại sao website cần SSL?`, a: `SSL (Secure Sockets Layer) là chứng chỉ bảo mật mã hóa dữ liệu giữa trình duyệt và website, giúp bảo vệ thông tin người dùng khỏi đánh cắp và tăng uy tín trên Google.` },
    { q: `${p.title} có gì khác biệt so với SSL miễn phí?`, a: `${p.title} cung cấp bảo hành tài chính, hỗ trợ kỹ thuật 24/7, xác thực tổ chức (OV/EV) và tương thích trình duyệt toàn diện hơn SSL miễn phí.` },
    { q: 'Phân biệt DV, OV, EV SSL như thế nào?', a: 'DV (Domain Validation) xác thực tên miền - cấp phút. OV (Organization Validation) xác thực doanh nghiệp - cấp ngày. EV (Extended Validation) xác thực nâng cao - xanh thanh địa chỉ, cấp trong 3-7 ngày.' },
    { q: 'Thời gian cài đặt SSL mất bao lâu?', a: 'DV SSL cài đặt trong 5-10 phút. OV SSL trong 1-3 ngày. EV SSL trong 3-7 ngày (tùy vào thông tin doanh nghiệp).' },
  ]
).map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '16px 0', border: 'none',
                    background: 'none', cursor: 'pointer', fontSize: 14,
                    fontWeight: 500, color: expandedFaq === i ? '#dc2626' : '#1e293b',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 700, minWidth: 24, color: '#dc2626' }}>{i + 1}.</span>
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
  subNavTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap', letterSpacing: 1 },
  snLink: { padding: '6px 14px', fontSize: 13, color: '#555', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 },
  snActive: { padding: '6px 14px', fontSize: 13, color: '#fff', background: '#dc2626', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 600 },

  hero: { padding: '50px 0', background: '#f8fafc', borderBottom: '1px solid #e8e8e8' },
  heroInner: { textAlign: 'center' },
  heroBadge: { fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  heroTitle: { fontSize: 30, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  heroDesc: { fontSize: 15, color: '#666', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.6 },
  heroPrice: { fontSize: 22, fontWeight: 800, marginBottom: 16 },
  heroCerts: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  certBadge: { fontSize: 12, padding: '5px 14px', background: '#f1f5f9', borderRadius: 20, fontWeight: 600, color: '#475569' },

  sectionTitle: { fontSize: 22, fontWeight: 800, color: '#1e293b', textAlign: 'center', margin: '0 0 28px', textTransform: 'uppercase' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  featCard: { display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', padding: '20px 24px', borderRadius: 10, border: '1px solid #f1f5f9' },
  featIcon: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 },
  featTitle: { fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' },
  featDesc: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.4 },

  certGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  certCard: { borderRadius: 12, padding: 28, textAlign: 'center', border: '1px solid #e8e8e8' },

  tableWrap: { overflowX: 'auto', borderRadius: 12, border: '1px solid #e8e8e8' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { background: '#1e293b', color: '#fff', padding: '10px 14px', fontWeight: 600, whiteSpace: 'nowrap', textAlign: 'left' },
  thCenter: { background: '#1e293b', color: '#fff', padding: '10px 14px', fontWeight: 600, whiteSpace: 'nowrap', textAlign: 'center' },
  tdLabel: { padding: '10px 14px', borderBottom: '1px solid #e8e8e8', color: '#475569', fontWeight: 500, whiteSpace: 'nowrap' },
  tdCenter: { padding: '10px 14px', borderBottom: '1px solid #e8e8e8', color: '#475569', textAlign: 'center', whiteSpace: 'nowrap' },
};
