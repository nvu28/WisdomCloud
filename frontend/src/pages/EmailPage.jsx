import React, { useState } from 'react';
import { CATEGORY_NAV, SUB_PAGES } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const COMPARISON_FEATURES = [
  { label: 'Dung lượng', values: ['3GB', '10GB', '20GB', '50GB', '100GB', '200GB', '300GB', '500GB', '750GB', '1TB'] },
  { label: 'Địa chỉ Email', values: ['5', '10', '20', '50', '100', '200', '300', '500', '750', 'Không giới hạn'] },
  { label: 'Email Forwarder', values: ['5', '10', '20', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Mail List', values: ['1', '2', '5', '10', '20', '50', '100', '200', '300', '400'] },
  { label: 'Auto Responder', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Webmail Pro', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Chống Spam AI', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Mã hóa SSL/TLS', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'SPF/DKIM/DMARC', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Hybrid Email', values: ['✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Sao lưu định kỳ', values: ['', '', '', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
  { label: 'Quản trị phân quyền', values: ['', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓', '✓'] },
];

const ADDONS = [
  { name: 'Add On Email 247', price: '36.000₫/tháng' },
  { name: 'Quản Trị Email Server (50 User)', price: '500.000₫/tháng' },
  { name: 'Cấu hình Hybrid Email', price: '1.000.000₫ (1 lần)' },
  { name: 'Backup Dữ Liệu Email', price: '156.000₫/12 tháng' },
  { name: 'Bảo Mật Email (SSL)', price: '290.000₫/12 tháng' },
];

export default function EmailPage({ pageKey, onNavigate }) {
  const p = SUB_PAGES[pageKey];
  const nav = CATEGORY_NAV['email'];
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div>
      {/* SERVICE SUB-MENU */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>EMAIL</span>
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
            <div style={styles.heroBullets}>
              {['Hệ thống Email trên nền Linux siêu tốc độ', 'An toàn bảo mật vượt trội', 'Đáp ứng các yêu cầu phức tạp nhất'].map((b, i) => (
                <div key={i} style={styles.heroBullet}>
                  <span style={{ color: p.color, marginRight: 8 }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE DETAILS */}
      {p.features && (
        <section style={styles.featureSection}>
          <div style={sectionInner}>
            <h2 style={styles.sectionTitle}>TÍNH NĂNG DỊCH VỤ</h2>
            <div style={styles.featureGrid}>
              {p.features.map((f, i) => (
                <div key={i} style={styles.featureCard}>
                  <span style={{ ...styles.featIcon, background: p.color + '12', color: p.color }}>
                    {['📧', '🛡️', '⚡', '💾', '🔧', '☁️', '🔄', '📱'][i % 8]}
                  </span>
                  <div>
                    <h4 style={styles.featTitle}>
                      {f.includes(' — ') ? f.split(' — ')[0] : f.substring(0, 40)}
                    </h4>
                    {f.includes(' — ') && <p style={styles.featDesc}>{f.split(' — ')[1]}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      <section style={{ ...styles.featureSection, background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>BẢNG SO SÁNH CÁC GÓI GIẢI PHÁP</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Tính năng</th>
                  {['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10'].map((n, i) => (
                    <th key={i} style={{ ...styles.th, textAlign: 'center' }}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.tdLabel}>{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} style={styles.tdCenter}>
                        {v === '✓' ? <span style={{ color: '#059669', fontWeight: 700 }}>✓</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>ĐĂNG KÝ DỊCH VỤ BỔ SUNG</h2>
          <div style={styles.addonGrid}>
            {ADDONS.map((a, i) => (
              <div key={i} style={styles.addonCard}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#1e293b' }}>{a.name}</h4>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#d97706', marginBottom: 10 }}>{a.price}</div>
                <a href="#" style={styles.addonCta}>Đăng ký</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>CAM NHẬN SỰ KHÁC BIỆT</h2>
          <div style={styles.whyGrid}>
            {[
              { icon: '👥', title: 'Đội ngũ chuyên gia', desc: 'Hơn 25 năm kinh nghiệm trong lĩnh vực Email Server' },
              { icon: '💰', title: 'Giá tốt nhất', desc: 'Sử dụng dịch vụ với giá tốt nhất từ nhà cung cấp Việt Nam' },
              { icon: '📨', title: 'Giao hàng 100%', desc: 'Cam kết 100% email giao dịch vào hộp thư đến' },
              { icon: '📱', title: 'Làm việc mọi nơi', desc: 'Truy cập và làm việc trên mọi thiết bị, mọi lúc mọi nơi' },
            ].map((w, i) => (
              <div key={i} style={styles.whyCard}>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>{w.icon}</span>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px' }}>{w.title}</h4>
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
              { q: `${p.title} khác gì so với Email thường?`, a: `${p.title} sử dụng tên miền riêng của doanh nghiệp, bảo mật cao hơn, chống spam tốt hơn và hỗ trợ đầy đủ các tính năng quản trị doanh nghiệp.` },
              { q: 'Tại sao nên sử dụng Email doanh nghiệp?', a: 'Email doanh nghiệp giúp tăng tính chuyên nghiệp, bảo mật thông tin, quản lý tập trung và dễ dàng mở rộng theo nhu cầu.' },
              { q: 'Tôi có thể dùng Outlook để gửi nhận email không?', a: 'Có, hệ thống email của chúng tôi tương thích hoàn toàn với Outlook, Thunderbird, Apple Mail và các ứng dụng email phổ biến khác.' },
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
  subNavTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap', letterSpacing: 1 },
  snLink: { padding: '6px 14px', fontSize: 13, color: '#555', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 },
  snActive: { padding: '6px 14px', fontSize: 13, color: '#fff', background: '#2563eb', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 600 },

  hero: { padding: '50px 0', background: '#f8fafc', borderBottom: '1px solid #e8e8e8' },
  heroInner: { textAlign: 'center' },
  heroBadge: { fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  heroTitle: { fontSize: 30, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  heroDesc: { fontSize: 15, color: '#666', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.6 },
  heroPrice: { fontSize: 18, fontWeight: 800, marginBottom: 16 },
  heroBullets: { display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', maxWidth: 400, margin: '0 auto', fontSize: 14, color: '#555' },
  heroBullet: { display: 'flex', alignItems: 'center' },

  featureSection: { padding: '50px 0', background: '#fff' },
  sectionTitle: { fontSize: 22, fontWeight: 800, color: '#1e293b', textAlign: 'center', margin: '0 0 28px', textTransform: 'uppercase' },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  featureCard: { display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #f1f5f9' },
  featIcon: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 },
  featTitle: { fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' },
  featDesc: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.4 },

  tableWrap: { overflowX: 'auto', borderRadius: 12, border: '1px solid #e8e8e8' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { background: '#1e293b', color: '#fff', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' },
  tdLabel: { padding: '10px 12px', borderBottom: '1px solid #e8e8e8', color: '#475569', fontWeight: 600, whiteSpace: 'nowrap' },
  tdCenter: { padding: '10px 12px', borderBottom: '1px solid #e8e8e8', color: '#475569', textAlign: 'center' },
  trEven: { background: '#fff' },
  trOdd: { background: '#f8fafc' },

  addonGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 },
  addonCard: { background: '#fff', borderRadius: 10, padding: 20, border: '1px solid #e8e8e8', textAlign: 'center' },
  addonCta: { padding: '8px 20px', background: '#d97706', color: '#fff', borderRadius: 6, fontSize: 13, textDecoration: 'none', display: 'inline-block' },

  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  whyCard: { background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #f1f5f9' },
};
