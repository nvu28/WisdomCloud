import React, { useState } from 'react';
import { CATEGORY_NAV, CATEGORY_FAQS } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const STYLES = {
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
  subNavLink: (active) => ({
    padding: '6px 14px', fontSize: 13,
    color: active ? '#fff' : '#555',
    background: active ? '#2563eb' : 'none',
    borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap',
    fontWeight: active ? 600 : 500,
  }),
  subNavMore: {
    padding: '6px 14px', fontSize: 13, color: '#555',
    textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 4,
  },
  hero: {
    background: '#ededed', padding: '45px 0 35px',
  },
  heroTitle: {
    fontSize: 15, fontWeight: 600, color: '#555',
    margin: '0 0 4px',
  },
  heroHeading: {
    fontSize: 28, fontWeight: 900, color: '#1e293b',
    margin: '0 0 20px', textTransform: 'uppercase',
  },
  searchForm: {
    display: 'flex', gap: 0, maxWidth: 560,
    margin: '0 auto 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: 8, overflow: 'hidden',
  },
  searchInput: {
    flex: 1, padding: '16px 20px', border: 'none',
    fontSize: 15, outline: 'none',
  },
  searchBtn: {
    padding: '16px 32px', background: '#000', color: '#fff',
    border: 'none', fontSize: 14, fontWeight: 600,
    textTransform: 'uppercase', cursor: 'pointer',
  },
  tldRow: {
    display: 'flex', gap: 12, justifyContent: 'center',
    flexWrap: 'wrap', marginBottom: 8,
  },
  tldBadge: (color) => ({
    border: '1px solid ' + color, borderRadius: 8,
    padding: '6px 14px', background: '#fff', textAlign: 'center',
    minWidth: 80,
  }),
  tldBadgeName: (color) => ({ display: 'block', fontSize: 15, fontWeight: 800, color }),
  tldBadgePrice: { display: 'block', fontSize: 12, fontWeight: 600, color: '#333' },
  tldBadgeNote: { display: 'block', fontSize: 11, color: '#999' },

  promoBanner: {
    background: 'linear-gradient(135deg, #dd1b5c 0%, #ff4d7a 100%)',
    padding: '20px 24px', borderRadius: 12,
    marginTop: 20, display: 'flex', gap: 24,
    alignItems: 'center', justifyContent: 'center',
    flexWrap: 'wrap',
  },
  promoItem: {
    color: '#fff', textAlign: 'center', fontSize: 13,
  },
  promoHighlight: {
    display: 'block', fontSize: 14, fontWeight: 700,
    marginTop: 2,
  },

  trustBar: {
    padding: '40px 0', textAlign: 'center', background: '#fff',
  },
  trustTitle: {
    fontSize: 26, fontWeight: 800, color: '#1e293b',
    margin: '0 0 8px',
  },
  trustSub: {
    fontSize: 14, color: '#666',
    margin: 0, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto',
  },

  domainGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 16, padding: 24, background: '#f2f2f2',
    borderRadius: 12, marginTop: 24,
  },
  domainCard: {
    background: '#fff', borderRadius: 10, padding: '20px 16px',
    textAlign: 'center', border: '1px solid #e8e8e8',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
  },
  dcFlag: { fontSize: 28 },
  dcTld: {
    padding: '3px 14px', background: '#e6e6e6',
    borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#555',
  },
  dcDesc: { fontSize: 12, color: '#777', lineHeight: 1.3, margin: 0, minHeight: 32 },
  dcPrice: { fontSize: 13, color: '#333', margin: 0, fontWeight: 600 },
  dcOldPrice: { fontSize: 12, color: '#999', textDecoration: 'line-through', margin: 0 },
  dcBtn: {
    padding: '6px 16px', border: '2px solid #ddd',
    borderRadius: 6, fontSize: 12, color: '#555',
    textDecoration: 'none', fontWeight: 600, marginTop: 'auto',
    transition: 'all 0.2s',
    cursor: 'pointer', background: '#fff',
  },

  whySection: {
    padding: '50px 0', background: '#fff',
  },
  whyGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
  },
  whyCard: {
    textAlign: 'center', padding: 24,
    background: '#f8fafc', borderRadius: 12, border: '1px solid #f1f5f9',
  },
  whyIcon: { fontSize: 36, display: 'block', marginBottom: 10 },
  whyTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 6px' },
  whyDesc: { fontSize: 13, color: '#666', lineHeight: 1.5, margin: 0 },

  principles: {
    padding: '50px 0', background: '#f8fafc',
  },
  principlesGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16, marginTop: 24,
  },
  principleCard: {
    background: '#fff', borderRadius: 10, padding: 20,
    border: '1px solid #eee', display: 'flex', gap: 14,
    alignItems: 'flex-start',
  },
  principleNum: {
    fontSize: 20, fontWeight: 800, color: '#2563eb',
    minWidth: 28,
  },
  principleText: {
    fontSize: 13, color: '#555', lineHeight: 1.5, margin: 0,
  },

  promoSection: {
    padding: '50px 0', background: '#fff',
  },
  promoGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
  },
  promoCard: {
    background: '#fff', borderRadius: 8, padding: 28,
    textAlign: 'center', border: '1px solid #e8e8e8',
    display: 'flex', flexDirection: 'column', gap: 10,
    minHeight: 150, justifyContent: 'center',
  },
  promoCardTitle: { fontSize: 15, fontWeight: 700, margin: 0, color: '#1e293b' },
  promoCardDesc: { fontSize: 13, color: '#666', margin: 0 },
  promoCardBtn: {
    padding: '8px 20px', background: '#58595b', color: '#fff',
    borderRadius: 4, fontSize: 13, textDecoration: 'none',
    alignSelf: 'center',
  },

  faqSection: {
    padding: '50px 0', background: '#f8fafc',
  },
  faqInner: { maxWidth: 800, margin: '0 auto' },
  faqItem: {
    borderBottom: '1px solid #e8e8e8',
  },
  faqBtn: (expanded) => ({
    width: '100%', padding: '14px 0', border: 'none',
    background: 'none', cursor: 'pointer', fontSize: 14,
    fontWeight: 500, color: expanded ? '#dd1b5c' : '#1e293b',
    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
  }),
  faqContent: (expanded) => ({
    maxHeight: expanded ? '300px' : '0',
    opacity: expanded ? 1 : 0,
    overflow: 'hidden',
    transition: 'all 0.25s ease',
  }),
  faqAnswer: {
    fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0,
    padding: '0 0 16px',
  },
};

const TLD_BADGES = [
  { tld: '.com', price: '19.000₫', note: '3 năm đầu', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫', note: 'năm đầu', color: '#dc2626' },
  { tld: '.xyz', price: '10.000₫', note: 'năm đầu', color: '#059669' },
  { tld: '.cloud', price: '45.000₫', note: 'năm đầu', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫', note: 'năm đầu', color: '#d97706' },
  { tld: '.org', price: '245.000₫', note: 'năm đầu', color: '#0891b2' },
];

const DOMAIN_TLDS = [
  { flag: '🇻🇳', tld: '.vn', price: '150.000₫', oldPrice: '700.000₫', desc: 'Tên miền quốc gia — Kết nối thương mại Việt' },
  { flag: '🌐', tld: '.com', price: '19.000₫', oldPrice: '250.000₫', desc: 'Tên miền toàn cầu — Phổ biến nhất thế giới' },
  { flag: '🔗', tld: '.net', price: '25.000₫', oldPrice: '280.000₫', desc: 'Mạng lưới — Dành cho dịch vụ mạng' },
  { flag: '🏛️', tld: '.org', price: '245.000₫', oldPrice: '280.000₫', desc: 'Tổ chức — Phi lợi nhuận, cộng đồng' },
  { flag: '✨', tld: '.xyz', price: '10.000₫', oldPrice: '140.000₫', desc: 'Thế hệ mới — Sáng tạo, công nghệ' },
  { flag: '☁️', tld: '.cloud', price: '45.000₫', oldPrice: '200.000₫', desc: 'Đám mây — Dịch vụ cloud, SaaS' },
  { flag: '🌏', tld: '.asia', price: '36.000₫', oldPrice: '180.000₫', desc: 'Châu Á — Định vị thị trường châu Á' },
  { flag: '🇻🇳', tld: '.com.vn', price: '150.000₫', oldPrice: null, desc: 'Thương mại Việt — Doanh nghiệp tại Việt Nam' },
  { flag: '📚', tld: '.edu.vn', price: '200.000₫', oldPrice: null, desc: 'Giáo dục Việt — Trường học, đào tạo' },
  { flag: '🏛️', tld: '.gov.vn', price: '300.000₫', oldPrice: null, desc: 'Chính phủ — Cơ quan nhà nước' },
];

const PRINCIPLES = [
  'Đăng ký tên miền được thực hiện theo nguyên tắc bình đẳng',
  'Tên miền phải xây dựng dựa trên khách hàng mục tiêu',
  'Tên miền dễ đọc và không gây nhầm lẫn',
  'Tên miền dễ nhớ, liên quan đến lĩnh vực hoạt động',
  'Đăng ký bảo vệ để bảo vệ thương hiệu',
  'Đặt tên miền ngắn gọn',
  'Chủ động nộp phí duy trì',
  'Chủ thể tự chịu trách nhiệm',
];

const PROMOS = [
  { title: 'GIẢM ĐẾN 450K', desc: '.VN chỉ 250K | .COM.VN chỉ 150K' },
  { title: '.XYZ SIÊU RẺ', desc: 'Chỉ 10.000₫ cho năm đầu tiên' },
  { title: 'COMBO TIẾT KIỆM', desc: 'Tên miền + Hosting chỉ từ 50K/tháng' },
  { title: 'MIỄN PHÍ WHOIS', desc: 'Bảo vệ thông tin cá nhân trọn đời' },
];

const FAQS = [
  { q: 'Tên miền là gì?', a: 'Tên miền (Domain) là tên của một Website trên Internet, giúp người dùng dễ dàng truy cập thay vì phải nhập địa chỉ IP số.' },
  { q: 'Làm cách nào để kiểm tra tên miền?', a: 'Bạn chỉ cần nhập tên miền mong muốn vào ô tìm kiếm phía trên, hệ thống sẽ kiểm tra và thông báo kết quả ngay lập tức.' },
  { q: 'Thời gian sử dụng tên miền trong bao lâu?', a: 'Tên miền có thể đăng ký theo năm, tối thiểu 1 năm và tối đa 10 năm. Bạn có thể gia hạn trước thời hạn.' },
  { q: 'Các nguyên tắc chọn tên miền?', a: 'Tên miền nên ngắn gọn, dễ nhớ, liên quan đến thương hiệu/ngành nghề, không gây nhầm lẫn và nên đăng ký bảo vệ các biến thể.' },
  { q: 'Cách đăng ký tên miền nhanh nhất?', a: 'Kiểm tra tên miền còn trống → Điền thông tin → Thanh toán → Kích hoạt trong 24h.' },
];

export default function DomainRegisterPage({ onNavigate, onDomainSearch }) {
  const [domainQuery, setDomainQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const nav = CATEGORY_NAV['domain'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;
    onDomainSearch(domainQuery);
  };

  return (
    <div>
      {/* SERVICE SUB-MENU */}
      <nav style={STYLES.subNav}>
        <div style={sectionInner}>
          <div style={STYLES.subNavInner}>
            <span style={STYLES.subNavTitle}>TÊN MIỀN</span>
            {nav.items.map((item, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                style={STYLES.subNavLink(item.page === 'dang-ky-ten-mien')}
              >
                {item.label}
              </a>
            ))}
            <span style={STYLES.subNavMore}>
              Khám Phá Thêm ▼
            </span>
          </div>
        </div>
      </nav>

      {/* HERO: Domain Search + TLD Badges */}
      <section style={STYLES.hero}>
        <div style={sectionInner}>
          <div style={{ textAlign: 'center' }}>
            <p style={STYLES.heroTitle}>Các giải pháp</p>
            <h1 style={STYLES.heroHeading}>TÊN MIỀN</h1>

            <form onSubmit={handleSearch} style={STYLES.searchForm}>
              <input
                style={STYLES.searchInput}
                placeholder="Nhập tên miền mong muốn..."
                value={domainQuery}
                onChange={e => setDomainQuery(e.target.value)}
              />
              <button type="submit" style={STYLES.searchBtn}>Kiểm tra</button>
            </form>

            <div style={STYLES.tldRow}>
              {TLD_BADGES.map((t, i) => (
                <div key={i} style={STYLES.tldBadge(t.color)}>
                  <span style={STYLES.tldBadgeName(t.color)}>{t.tld}</span>
                  <span style={STYLES.tldBadgePrice}>{t.price}</span>
                  <span style={STYLES.tldBadgeNote}>{t.note}</span>
                </div>
              ))}
            </div>

            <div style={STYLES.promoBanner}>
              {[
                '.ID.VN | .BIZ.VN — Miễn phí đăng ký',
                '.XYZ | .SITE | .ONLINE | .CLICK — Chỉ 10K/năm đầu',
                '.IO.VN — Chỉ 30K/năm đầu',
                '.ASIA — Chỉ 36K/năm đầu',
              ].map((text, i) => (
                <span key={i} style={STYLES.promoItem}>
                  <span style={STYLES.promoHighlight}>🔥 {text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={STYLES.trustBar}>
        <div style={sectionInner}>
          <h2 style={STYLES.trustTitle}>P.A Việt Nam Là Nhà Đăng Ký Tên Miền Lớn Nhất Việt Nam</h2>
          <p style={STYLES.trustSub}>
            Trực thuộc tổ chức tên miền quốc tế ICANN và trung tâm internet Việt Nam VNNIC
          </p>
        </div>
      </section>

      {/* DOMAIN TLD PRICING GRID */}
      <section style={{ background: '#f2f2f2', padding: '0 0 50px' }}>
        <div style={sectionInner}>
          <div style={STYLES.domainGrid}>
            {DOMAIN_TLDS.map((d, i) => (
              <div key={i} style={STYLES.domainCard}>
                <span style={STYLES.dcFlag}>{d.flag}</span>
                <span style={STYLES.dcTld}>{d.tld}</span>
                <p style={STYLES.dcDesc}>{d.desc?.substring(0, 50)}</p>
                <p style={STYLES.dcPrice}>Giá từ <strong>{d.price}</strong></p>
                {d.oldPrice && (
                  <p style={STYLES.dcOldPrice}>Giá cũ {d.oldPrice}</p>
                )}
                <a
                  href="#"
                  style={STYLES.dcBtn}
                  onClick={(e) => { e.preventDefault(); onDomainSearch(d.tld); }}
                >
                  Kiểm tra tồn tại
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (3 columns) */}
      <section style={STYLES.whySection}>
        <div style={sectionInner}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, margin: '0 0 28px', textTransform: 'uppercase' }}>
            TẠI SAO NÊN CHỌN WISDOMCLOUD
          </h2>
          <div style={STYLES.whyGrid}>
            {[
              { icon: '🏆', title: 'Thị phần lớn nhất Việt Nam', desc: 'Nhà đăng ký tên miền số 1 Việt Nam với hơn 25 năm kinh nghiệm' },
              { icon: '🌐', title: 'Hỗ trợ nhiều tên miền nhất', desc: 'Hơn 500+ loại tên miền quốc tế và .VN đáp ứng mọi nhu cầu' },
              { icon: '💬', title: 'Hỗ trợ 24/7/365', desc: 'Đội ngũ kỹ thuật hỗ trợ tận tình mọi lúc, kể cả ngày lễ' },
            ].map((w, i) => (
              <div key={i} style={STYLES.whyCard}>
                <span style={STYLES.whyIcon}>{w.icon}</span>
                <h3 style={STYLES.whyTitle}>{w.title}</h3>
                <p style={STYLES.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 PRINCIPLES */}
      <section style={STYLES.principles}>
        <div style={sectionInner}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, margin: '0 0 8px', textTransform: 'uppercase' }}>
            NGUYÊN TẮC CƠ BẢN
          </h2>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#666', margin: '0 0 4px' }}>
            Khi đăng ký và sử dụng tên miền
          </p>
          <div style={STYLES.principlesGrid}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={STYLES.principleCard}>
                <span style={STYLES.principleNum}>{i + 1}.</span>
                <p style={STYLES.principleText}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONS */}
      <section style={STYLES.promoSection}>
        <div style={sectionInner}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, margin: '0 0 28px', textTransform: 'uppercase' }}>
            Ưu đãi tốt nhất hôm nay
          </h2>
          <div style={STYLES.promoGrid}>
            {PROMOS.map((p, i) => (
              <div key={i} style={STYLES.promoCard}>
                <h3 style={STYLES.promoCardTitle}>{p.title}</h3>
                <p style={STYLES.promoCardDesc}>{p.desc}</p>
                <a href="#" style={STYLES.promoCardBtn}>Xem chi tiết</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={STYLES.faqSection}>
        <div style={sectionInner}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, margin: '0 0 28px', textTransform: 'uppercase' }}>
            Câu hỏi thường gặp
          </h2>
          <div style={STYLES.faqInner}>
            {FAQS.map((faq, i) => (
              <div key={i} style={STYLES.faqItem}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={STYLES.faqBtn(expandedFaq === i)}
                >
                  <span style={{ fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{faq.q}</span>
                  <span style={{
                    color: '#aaa', fontSize: 11,
                    transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>▼</span>
                </button>
                <div style={STYLES.faqContent(expandedFaq === i)}>
                  <p style={STYLES.faqAnswer}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
