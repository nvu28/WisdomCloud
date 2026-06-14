import React, { useState } from 'react';
import { getCategoryNav } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const VIETNAMESE_DOMAINS = [
  { tld: '.vn', reg: '450.000₫', renew: '150.000₫', transfer: 'Miễn phí', discount: 'Giảm 250K' },
  { tld: '.com.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Miễn phí', discount: 'Giảm 200K' },
  { tld: '.net.vn', reg: '550.000₫', renew: '550.000₫', transfer: 'Miễn phí', discount: 'Giảm 20K' },
  { tld: '.edu.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Liên hệ', discount: null },
  { tld: '.org.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Liên hệ', discount: null },
  { tld: '.gov.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Liên hệ', discount: null },
  { tld: '.id.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Miễn phí', discount: 'Giảm 20K' },
  { tld: '.io.vn', reg: '50.000₫', renew: '200.000₫', transfer: 'Miễn phí', discount: 'Giảm 20K' },
  { tld: '.biz.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Miễn phí', discount: null },
  { tld: '.name.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Miễn phí', discount: null },
];

const VIETNAMESE_DOMAINS_EN = [
  { tld: '.vn', reg: '450.000₫', renew: '150.000₫', transfer: 'Free', discount: 'Save 250K' },
  { tld: '.com.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Free', discount: 'Save 200K' },
  { tld: '.net.vn', reg: '550.000₫', renew: '550.000₫', transfer: 'Free', discount: 'Save 20K' },
  { tld: '.edu.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Contact', discount: null },
  { tld: '.org.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Contact', discount: null },
  { tld: '.gov.vn', reg: '250.000₫', renew: '250.000₫', transfer: 'Contact', discount: null },
  { tld: '.id.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Free', discount: 'Save 20K' },
  { tld: '.io.vn', reg: '50.000₫', renew: '200.000₫', transfer: 'Free', discount: 'Save 20K' },
  { tld: '.biz.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Free', discount: null },
  { tld: '.name.vn', reg: '200.000₫', renew: '200.000₫', transfer: 'Free', discount: null },
];

const INTERNATIONAL_DOMAINS = [
  { tld: '.com', reg: '19.000₫', renew: '250.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.net', reg: '99.000₫', renew: '280.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.org', reg: '245.000₫', renew: '280.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.asia', reg: '36.000₫', renew: '180.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.xyz', reg: '10.000₫', renew: '140.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.click', reg: '10.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.cloud', reg: '45.000₫', renew: '200.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.info', reg: '120.000₫', renew: '200.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.top', reg: '15.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.online', reg: '15.000₫', renew: '180.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.site', reg: '10.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.store', reg: '79.000₫', renew: '280.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.website', reg: '15.000₫', renew: '180.000₫', transfer: 'Miễn phí', badge: true },
  { tld: '.me', reg: '99.000₫', renew: '200.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.work', reg: '15.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.vip', reg: '69.000₫', renew: '380.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.club', reg: '29.000₫', renew: '140.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.pro', reg: '59.000₫', renew: '200.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.tv', reg: '450.000₫', renew: '550.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.link', reg: '15.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.tech', reg: '79.000₫', renew: '350.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.space', reg: '15.000₫', renew: '120.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.fun', reg: '15.000₫', renew: '150.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.art', reg: '59.000₫', renew: '200.000₫', transfer: 'Miễn phí', badge: false },
  { tld: '.one', reg: '15.000₫', renew: '140.000₫', transfer: 'Miễn phí', badge: false },
];

const INTERNATIONAL_DOMAINS_EN = [
  { tld: '.com', reg: '19.000₫', renew: '250.000₫', transfer: 'Free', badge: true },
  { tld: '.net', reg: '99.000₫', renew: '280.000₫', transfer: 'Free', badge: false },
  { tld: '.org', reg: '245.000₫', renew: '280.000₫', transfer: 'Free', badge: false },
  { tld: '.asia', reg: '36.000₫', renew: '180.000₫', transfer: 'Free', badge: true },
  { tld: '.xyz', reg: '10.000₫', renew: '140.000₫', transfer: 'Free', badge: true },
  { tld: '.click', reg: '10.000₫', renew: '120.000₫', transfer: 'Free', badge: false },
  { tld: '.cloud', reg: '45.000₫', renew: '200.000₫', transfer: 'Free', badge: false },
  { tld: '.info', reg: '120.000₫', renew: '200.000₫', transfer: 'Free', badge: false },
  { tld: '.top', reg: '15.000₫', renew: '120.000₫', transfer: 'Free', badge: true },
  { tld: '.online', reg: '15.000₫', renew: '180.000₫', transfer: 'Free', badge: true },
  { tld: '.site', reg: '10.000₫', renew: '120.000₫', transfer: 'Free', badge: true },
  { tld: '.store', reg: '79.000₫', renew: '280.000₫', transfer: 'Free', badge: false },
  { tld: '.website', reg: '15.000₫', renew: '180.000₫', transfer: 'Free', badge: true },
  { tld: '.me', reg: '99.000₫', renew: '200.000₫', transfer: 'Free', badge: false },
  { tld: '.work', reg: '15.000₫', renew: '120.000₫', transfer: 'Free', badge: false },
  { tld: '.vip', reg: '69.000₫', renew: '380.000₫', transfer: 'Free', badge: false },
  { tld: '.club', reg: '29.000₫', renew: '140.000₫', transfer: 'Free', badge: false },
  { tld: '.pro', reg: '59.000₫', renew: '200.000₫', transfer: 'Free', badge: false },
  { tld: '.tv', reg: '450.000₫', renew: '550.000₫', transfer: 'Free', badge: false },
  { tld: '.link', reg: '15.000₫', renew: '120.000₫', transfer: 'Free', badge: false },
  { tld: '.tech', reg: '79.000₫', renew: '350.000₫', transfer: 'Free', badge: false },
  { tld: '.space', reg: '15.000₫', renew: '120.000₫', transfer: 'Free', badge: false },
  { tld: '.fun', reg: '15.000₫', renew: '150.000₫', transfer: 'Free', badge: false },
  { tld: '.art', reg: '59.000₫', renew: '200.000₫', transfer: 'Free', badge: false },
  { tld: '.one', reg: '15.000₫', renew: '140.000₫', transfer: 'Free', badge: false },
];

export default function DomainPricePage({ onNavigate, lang }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const nav = getCategoryNav(lang)['domain'];
  const vietnameseDomains = lang === 'en' ? VIETNAMESE_DOMAINS_EN : VIETNAMESE_DOMAINS;
  const internationalDomains = lang === 'en' ? INTERNATIONAL_DOMAINS_EN : INTERNATIONAL_DOMAINS;

  return (
    <div>
      {/* SERVICE SUB-MENU */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>{lang === 'en' ? 'DOMAINS' : 'TÊN MIỀN'}</span>
            {nav.items.map((item, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                style={item.page === 'bang-gia-ten-mien' ? styles.subNavLinkActive : styles.subNavLink}
              >
                {item.label}
              </a>
            ))}
            <span style={styles.subNavMore}>{lang === 'en' ? 'Explore More ▼' : 'Khám Phá Thêm ▼'}</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={sectionInner}>
          <div style={{ textAlign: 'center' }}>
            <p style={styles.heroTitle}>{lang === 'en' ? 'Pricing' : 'Bảng giá'}</p>
            <h1 style={styles.heroHeading}>{lang === 'en' ? 'VIETNAMESE & INTERNATIONAL DOMAINS' : 'TÊN MIỀN VIỆT NAM & QUỐC TẾ'}</h1>
            <p style={styles.heroDesc}>
              {lang === 'en' ? 'Latest updated prices — Great deals — Free transfer support' : 'Giá cập nhật mới nhất — Nhiều ưu đãi hấp dẫn — Hỗ trợ chuyển về miễn phí'}
            </p>
          </div>
        </div>
      </section>

      {/* VIETNAMESE DOMAIN TABLE */}
      <section style={styles.tableSection}>
        <div style={sectionInner}>
          <h2 style={styles.tableTitle}>{lang === 'en' ? 'VIETNAMESE DOMAIN PRICES' : 'BẢNG GIÁ TÊN MIỀN VIỆT NAM'}</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{lang === 'en' ? 'Domain' : 'Tên miền'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Register' : 'Đăng ký'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Renewal' : 'Phí DV gia hạn'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Transfer' : 'Chuyển về P.A'}</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {vietnameseDomains.map((d, i) => (
                  <React.Fragment key={i}>
                    <tr style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                      <td style={styles.td}>
                        <strong>{d.tld}</strong>
                        {d.discount && <span style={styles.badge}>{d.discount}</span>}
                      </td>
                      <td style={styles.td}>{d.reg}</td>
                      <td style={styles.td}>{d.renew}</td>
                      <td style={styles.td}>{d.transfer}</td>
                      <td style={styles.td}>
                        <button
                          onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                          style={styles.expandBtn}
                        >
                          {lang === 'en' ? 'Details' : 'Chi tiết'} {expandedRow === i ? '▲' : '▼'}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === i && (
                      <tr key={`exp-${i}`}>
                        <td colSpan={5} style={styles.expandedRow}>
                          <div style={styles.feeGrid}>
                            {[
                              { label: lang === 'en' ? 'Registration fee' : 'Lệ phí đăng ký', value: '0₫', note: lang === 'en' ? 'Included in package' : 'Đã bao gồm trong gói' },
                              { label: lang === 'en' ? 'Maintenance fee' : 'Phí duy trì', value: d.renew },
                              { label: lang === 'en' ? 'Account service fee' : 'Phí dịch vụ tài khoản', value: lang === 'en' ? 'Free' : 'Miễn phí' },
                              { label: lang === 'en' ? 'VAT (10%)' : 'Thuế GTGT (10%)', value: parseInt(d.renew.replace(/[₫K.]/g, '')) * 0.1 + 'K₫' },
                              { label: lang === 'en' ? 'Total' : 'Tổng cộng', value: d.reg, highlight: true },
                            ].map((fee, j) => (
                              <div key={j} style={{
                                ...styles.feeItem,
                                ...(fee.highlight ? styles.feeHighlight : {}),
                              }}>
                                <span style={styles.feeLabel}>{fee.label}</span>
                                <span style={{
                                  ...styles.feeValue,
                                  ...(fee.highlight ? { color: '#2563eb', fontWeight: 800 } : {}),
                                }}>{fee.value}</span>
                                {fee.note && <span style={styles.feeNote}>{fee.note}</span>}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p style={styles.tableNote}>{lang === 'en' ? '* Prices exclude VAT' : '* Giá chưa gồm VAT'}</p>
        </div>
      </section>

      {/* INTERNATIONAL DOMAIN TABLE */}
      <section style={{ ...styles.tableSection, background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.tableTitle}>{lang === 'en' ? 'INTERNATIONAL DOMAIN PRICES' : 'BẢNG GIÁ TÊN MIỀN QUỐC TẾ'}</h2>
          <p style={styles.tableSub}>{lang === 'en' ? 'For .com, .net, .org and 70+ other domain extensions' : 'Dành cho các tên miền .com, .net, .org và hơn 70+ đuôi tên miền khác'}</p>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{lang === 'en' ? 'Domain' : 'Tên miền'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Register' : 'Đăng ký'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Renewal' : 'Gia hạn'}</th>
                  <th style={styles.th}>{lang === 'en' ? 'Transfer' : 'Chuyển về P.A'}</th>
                </tr>
              </thead>
              <tbody>
                {internationalDomains.map((d, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td}>
                      <strong>{d.tld}</strong>
                      {d.badge && <span style={styles.badgeGreen}>{lang === 'en' ? 'Promo' : 'Có ưu đãi'}</span>}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.salePrice}>{d.reg}</span>
                    </td>
                    <td style={styles.td}>{d.renew}</td>
                    <td style={styles.td}>{d.transfer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={styles.tableNote}>{lang === 'en' ? '* Prices exclude VAT — First year price applies to new registrations' : '* Giá chưa gồm VAT — Giá năm đầu áp dụng cho đăng ký mới'}</p>
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
  subNavLink: {
    padding: '6px 14px', fontSize: 13, color: '#555',
    borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500,
  },
  subNavLinkActive: {
    padding: '6px 14px', fontSize: 13, color: '#fff',
    background: '#2563eb', borderRadius: 6, textDecoration: 'none',
    whiteSpace: 'nowrap', fontWeight: 600,
  },
  subNavMore: {
    padding: '6px 14px', fontSize: 13, color: '#555',
    cursor: 'pointer', whiteSpace: 'nowrap',
    display: 'flex', alignItems: 'center', gap: 4,
  },
  hero: {
    padding: '40px 0', background: '#f8fafc',
    borderBottom: '1px solid #e8e8e8',
  },
  heroTitle: {
    fontSize: 14, fontWeight: 600, color: '#888',
    margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 2,
  },
  heroHeading: {
    fontSize: 28, fontWeight: 900, color: '#1e293b',
    margin: '0 0 12px',
  },
  heroDesc: {
    fontSize: 15, color: '#666', margin: 0,
  },
  tableSection: {
    padding: '50px 0', background: '#fff',
  },
  tableTitle: {
    fontSize: 22, fontWeight: 800, color: '#1e293b',
    margin: '0 0 6px',
  },
  tableSub: {
    fontSize: 14, color: '#666', margin: '0 0 20px',
  },
  tableWrap: {
    overflowX: 'auto',
    borderRadius: 12, border: '1px solid #e8e8e8',
  },
  table: {
    width: '100%', borderCollapse: 'collapse', fontSize: 14,
  },
  th: {
    background: '#1e293b', color: '#fff',
    padding: '14px 16px', textAlign: 'left',
    fontWeight: 600, whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 16px', borderBottom: '1px solid #e8e8e8', color: '#475569',
  },
  trEven: { background: '#fff' },
  trOdd: { background: '#f8fafc' },
  badge: {
    display: 'inline-block', marginLeft: 8,
    padding: '2px 8px', background: '#dc2626', color: '#fff',
    fontSize: 11, fontWeight: 700, borderRadius: 4,
  },
  badgeGreen: {
    display: 'inline-block', marginLeft: 8,
    padding: '2px 8px', background: '#059669', color: '#fff',
    fontSize: 11, fontWeight: 700, borderRadius: 4,
  },
  expandBtn: {
    padding: '4px 12px', border: '1px solid #ddd',
    borderRadius: 4, background: '#fff', cursor: 'pointer',
    fontSize: 12, color: '#555',
  },
  expandedRow: {
    padding: '20px 24px', background: '#f0f4ff',
    borderBottom: '2px solid #2563eb',
  },
  feeGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12,
  },
  feeItem: {
    background: '#fff', borderRadius: 8, padding: '12px 16px',
    border: '1px solid #e2e8f0', textAlign: 'center',
  },
  feeHighlight: {
    border: '2px solid #2563eb', background: '#eff6ff',
  },
  feeLabel: {
    display: 'block', fontSize: 12, color: '#666', marginBottom: 4,
  },
  feeValue: {
    display: 'block', fontSize: 16, fontWeight: 700, color: '#1e293b',
  },
  feeNote: {
    display: 'block', fontSize: 11, color: '#999', marginTop: 2,
  },
  salePrice: {
    color: '#dc2626', fontWeight: 700,
  },
  tableNote: {
    marginTop: 12, fontSize: 13, color: '#999', fontStyle: 'italic',
  },
};
