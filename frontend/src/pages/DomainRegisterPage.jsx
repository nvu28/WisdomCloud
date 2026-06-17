import React, { useState } from 'react';
import { getCategoryNav } from '../data/subPages';
import { checkDomain } from '../api/cloudApi';

const si = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const POPULAR_TLDS = [
  { tld: '.com', price: '19.000₫/năm đầu', renew: '250.000₫', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫/năm đầu', renew: '150.000₫', color: '#dc2626' },
  { tld: '.net', price: '99.000₫/năm đầu', renew: '280.000₫', color: '#2563eb' },
  { tld: '.org', price: '245.000₫/năm đầu', renew: '280.000₫', color: '#0891b2' },
  { tld: '.xyz', price: '10.000₫/năm đầu', renew: '140.000₫', color: '#059669' },
  { tld: '.cloud', price: '45.000₫/năm đầu', renew: '200.000₫', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫/năm đầu', renew: '180.000₫', color: '#d97706' },
  { tld: '.info', price: '120.000₫/năm đầu', renew: '200.000₫', color: '#0891b2' },
];

const POPULAR_TLDS_EN = [
  { tld: '.com', price: '19,000₫/1st yr', renew: '250,000₫', color: '#2563eb' },
  { tld: '.vn', price: '250,000₫/1st yr', renew: '150,000₫', color: '#dc2626' },
  { tld: '.net', price: '99,000₫/1st yr', renew: '280,000₫', color: '#2563eb' },
  { tld: '.org', price: '245,000₫/1st yr', renew: '280,000₫', color: '#0891b2' },
  { tld: '.xyz', price: '10,000₫/1st yr', renew: '140,000₫', color: '#059669' },
  { tld: '.cloud', price: '45,000₫/1st yr', renew: '200,000₫', color: '#7c3aed' },
  { tld: '.asia', price: '36,000₫/1st yr', renew: '180,000₫', color: '#d97706' },
  { tld: '.info', price: '120,000₫/1st yr', renew: '200,000₫', color: '#0891b2' },
];

const FAQS = [
  { q: 'Tên miền là gì?', a: 'Tên miền (Domain) là tên của một Website hoạt động trên Internet hay còn gọi là "địa chỉ Web" nhằm thay thế cho các địa chỉ IP của máy chủ giúp người dùng ghi nhớ dễ dàng hơn.' },
  { q: 'Làm cách nào để kiểm tra Tên miền đã được đăng ký hay chưa?', a: 'Trên hệ thống của WisdomCloud, bạn có thể tra cứu Tên miền muốn đăng ký một cách nhanh chóng, hệ thống sẽ liệt kê những Tên miền phổ biến nhất để bạn so sánh giá.' },
  { q: 'Thời gian sử dụng tên miền trong bao lâu?', a: 'Thời gian đăng ký tối thiểu cho một Tên miền là 01 năm. Thời gian cho phép gia hạn là từ 0-70 ngày tính từ ngày hết hạn tùy vào Tên miền.' },
  { q: 'Các nguyên tắc chọn Tên miền phù hợp cho Website?', a: 'Tên miền không quá 63 ký tự, chỉ gồm a-z, 0-9 và dấu gạch ngang. Nên ngắn gọn, dễ nhớ, liên quan đến thương hiệu hoặc lĩnh vực hoạt động.' },
  { q: 'Cách đăng ký Tên miền nhanh nhất?', a: 'Bước 1: Truy cập WisdomCloud. Bước 2: Vào danh mục Tên miền → Đăng ký Tên miền. Bước 3: Nhập tên miền vào thanh tìm kiếm. Bước 4: Thêm vào giỏ hàng → Thanh toán.' },
];

const FAQS_EN = [
  { q: 'What is a domain name?', a: 'A domain name is the name of a website on the Internet, also known as a "web address", which replaces server IP addresses to help users remember more easily.' },
  { q: 'How do I check if a domain has been registered?', a: 'On WisdomCloud\'s system, you can quickly look up the domain you want to register. The system will list the most popular domains for you to compare prices.' },
  { q: 'How long can I use a domain name?', a: 'The minimum registration period for a domain name is 1 year. The renewal grace period is 0-70 days from the expiration date depending on the domain.' },
  { q: 'What are the principles for choosing a suitable domain name?', a: 'Domain names must not exceed 63 characters, consisting only of a-z, 0-9, and hyphens. They should be short, easy to remember, and relevant to your brand or field of activity.' },
  { q: 'What is the fastest way to register a domain?', a: 'Step 1: Visit WisdomCloud. Step 2: Go to Domains → Register Domain. Step 3: Enter your domain in the search bar. Step 4: Add to cart → Checkout.' },
];

export default function DomainRegisterPage({ onNavigate, onDomainSearch, lang }) {
  const [q, setQ] = useState('');
  const [ef, setEf] = useState(null);
  const [domainResults, setDomainResults] = useState(null);
  const [searchDomain, setSearchDomain] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState('');
  const nav = getCategoryNav(lang)['domain'];
  const popTlds = lang === 'en' ? POPULAR_TLDS_EN : POPULAR_TLDS;
  const faqs = lang === 'en' ? FAQS_EN : FAQS;

  const handleSearch = async (e) => {
    e.preventDefault();
    const name = q.trim();
    if (!name) return;
    setChecking(true);
    setCheckError('');
    setDomainResults(null);
    setSearchDomain(name);
    try {
      const data = await checkDomain(name);
      setDomainResults(data.results);
    } catch {
      setCheckError(lang === 'en' ? 'Cannot check domain. Try again.' : 'Không thể kiểm tra tên miền. Thử lại.');
    }
    setChecking(false);
  };

  const fmtPrice = (num) => {
    if (!num) return '—';
    return num.toLocaleString('vi-VN') + '₫';
  };

  return (
    <div>
      {/* SUB-NAV */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8e8e8', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={si}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 0', overflowX: 'auto' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap', letterSpacing: 1 }}>{lang === 'en' ? 'DOMAINS' : 'TÊN MIỀN'}</span>
            {nav.items.map((item, i) => (
              <a key={i} href="#" onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                style={{
                  padding: '6px 14px', fontSize: 13,
                  color: item.page === 'dang-ky-ten-mien' ? '#fff' : '#555',
                  background: item.page === 'dang-ky-ten-mien' ? '#2563eb' : 'none',
                  borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap',
                  fontWeight: item.page === 'dang-ky-ten-mien' ? 600 : 500,
                }}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO — PA Vietnam style two-column */}
      <section style={{ background: '#f1f2f2', padding: '50px 0', borderBottom: '1px solid #e0e0e0' }}>
        <div style={si}>
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* LEFT COLUMN — Search */}
            <div style={{ flex: '1 1 500px', minWidth: 0 }}>
              <h1 style={{ fontSize: 40, fontWeight: 900, color: '#231F20', margin: '0 0 4px', lineHeight: 1.2 }}>
                {lang === 'en' ? 'Best Domain Prices' : 'Tên miền giá tốt nhất'}
              </h1>
              <div style={{ margin: '16px 0 20px', fontSize: 13, color: '#555', lineHeight: 2 }}>
                <p style={{ margin: 0 }}>.ID.VN | .BIZ.VN: <strong style={{ color: '#64c6be' }}>{lang === 'en' ? 'Free registration' : 'Miễn phí đăng ký'}</strong></p>
                <p style={{ margin: 0 }}>.XYZ | .SITE | .ONLINE | .CLICK: <strong style={{ color: '#64c6be' }}>{lang === 'en' ? 'Only 10K/1st yr' : 'Chỉ 10K/ năm đầu'}</strong></p>
                <p style={{ margin: 0 }}>.IO.VN: <strong style={{ color: '#64c6be' }}>{lang === 'en' ? 'Only 30K/1st yr' : 'Chỉ 30K/năm đầu'}</strong></p>
                <p style={{ margin: 0 }}>.ASIA: <strong style={{ color: '#64c6be' }}>{lang === 'en' ? 'Only 36K/1st yr' : 'Chỉ 36K/năm đầu'}</strong></p>
              </div>
              <form onSubmit={handleSearch} style={{
                display: 'flex', gap: 0, maxWidth: 600,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 8, overflow: 'hidden',
              }}>
                <input style={{
                  flex: 1, padding: '18px 22px', border: 'none', fontSize: 16, outline: 'none',
                  fontFamily: 'inherit',
                }} placeholder={lang === 'en' ? 'Enter domain name here' : 'Nhập tên miền đăng ký vào đây'} value={q} onChange={e => setQ(e.target.value)} />
                <button type="submit" disabled={checking} style={{
                  padding: '18px 36px', background: '#1A1A1A', color: '#fff', border: 'none',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase',
                  letterSpacing: 1, opacity: checking ? 0.6 : 1,
                }}>{checking ? '...' : (lang === 'en' ? 'Check' : 'Kiểm tra')}</button>
              </form>

              {checkError && (
                <p style={{ color: '#dc2626', fontSize: 14, margin: '12px 0 0' }}>{checkError}</p>
              )}
              {checking && (
                <p style={{ color: '#666', fontSize: 14, margin: '12px 0 0' }}>
                  {lang === 'en' ? 'Checking...' : 'Đang kiểm tra...'}
                </p>
              )}
            </div>

            {/* RIGHT COLUMN — Pricing promo cards */}
            <div style={{ flex: '0 0 320px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Row 1 */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '14px 16px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#64c6be', marginBottom: 2 }}>.com</div>
                    <div><strong style={{ fontSize: 15, color: '#231F20' }}>25K</strong><span style={{ fontSize: 12, color: '#888' }}>/ {lang === 'en' ? '1st yr' : 'năm đầu'}</span></div>
                  </div>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '14px 16px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#64c6be', marginBottom: 2 }}>.net</div>
                    <div><strong style={{ fontSize: 15, color: '#231F20' }}>159K</strong><span style={{ fontSize: 12, color: '#888' }}>/ {lang === 'en' ? '1st yr' : 'năm đầu'}</span></div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#888', marginTop: -6, textAlign: 'center' }}>
                  {lang === 'en' ? 'When registering 3+ years' : 'Khi đăng ký từ 03 năm'}
                </div>
                {/* Row 2 */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '14px 16px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#64c6be', marginBottom: 2 }}>.vn</div>
                    <div><strong style={{ fontSize: 15, color: '#231F20' }}>250K</strong><span style={{ fontSize: 12, color: '#888' }}>/ {lang === 'en' ? '1st yr' : 'năm đầu'}</span></div>
                  </div>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '14px 16px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#64c6be', marginBottom: 2 }}>.com.vn</div>
                    <div><strong style={{ fontSize: 15, color: '#231F20' }}>150K</strong><span style={{ fontSize: 12, color: '#888' }}>/ {lang === 'en' ? '1st yr' : 'năm đầu'}</span></div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#888', marginTop: -6, textAlign: 'center' }}>
                  {lang === 'en' ? 'When registering 3+ years' : 'Khi đăng ký từ 03 năm'}
                </div>
                {/* Gift cards */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 12, color: '#888' }}>{lang === 'en' ? 'Free' : 'Tặng'}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#231F20' }}>{lang === 'en' ? 'Domain Security' : 'Bảo Mật Tên Miền'}</div>
                    <div style={{ fontSize: 11, color: '#64c6be', fontWeight: 600 }}>{lang === 'en' ? 'Worth 100K' : 'Trị giá 100K'}</div>
                  </div>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: '10px 12px', textAlign: 'center', border: '1px solid #e8e8e8' }}>
                    <div style={{ fontSize: 12, color: '#888' }}>{lang === 'en' ? 'Free' : 'Tặng'}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#231F20' }}>Email {lang === 'en' ? 'Pro' : 'Server Pro'}</div>
                    <div style={{ fontSize: 11, color: '#64c6be', fontWeight: 600 }}>{lang === 'en' ? 'Worth 348K' : 'Trị giá 348K'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS — full width below hero */}
          {domainResults && (
            <div style={{
              maxWidth: 700, margin: '24px auto 0', background: '#fff',
              borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                padding: '12px 20px', background: '#1e293b', color: '#fff',
                fontSize: 14, fontWeight: 700, textAlign: 'left',
              }}>
                {lang === 'en' ? `Results for "${searchDomain}"` : `Kết quả cho "${searchDomain}"`}
              </div>
              <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                {domainResults.map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 20px', borderBottom: '1px solid #f1f5f9',
                    background: i % 2 === 0 ? '#fff' : '#f8fafc',
                  }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: r.color, minWidth: 80 }}>{r.tld}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: r.available ? '#059669' : '#dc2626',
                      minWidth: 80,
                    }}>
                      {r.available
                        ? (lang === 'en' ? 'Available' : 'Có sẵn')
                        : (lang === 'en' ? 'Taken' : 'Đã có')}
                    </span>
                    <span style={{ fontSize: 13, color: '#475569', minWidth: 110 }}>
                      {fmtPrice(r.priceFirstYear)}/{lang === 'en' ? '1st yr' : 'năm đầu'}
                    </span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>
                      {lang === 'en' ? 'Renew: ' : 'GH: '}{fmtPrice(r.priceRenew)}
                    </span>
                    <a href="#" onClick={(e) => { e.preventDefault(); onDomainSearch(searchDomain + r.tld); }}
                      style={{
                        marginLeft: 'auto', padding: '6px 18px', fontSize: 12, fontWeight: 600,
                        background: r.available ? '#2563eb' : '#e2e8f0',
                        color: r.available ? '#fff' : '#94a3b8',
                        borderRadius: 6, textDecoration: 'none', flexShrink: 0,
                      }}>
                      {r.available
                        ? (lang === 'en' ? 'Add to cart' : 'Thêm giỏ hàng')
                        : (lang === 'en' ? 'Check' : 'Tra cứu')}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* POPULAR TLDS */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>
            {lang === 'en' ? 'Popular Domain Extensions' : 'Tên Miền Phổ Biến'}
          </h2>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#888', margin: '0 0 28px' }}>
            {lang === 'en' ? 'Competitive prices — Register your domain today' : 'Giá cạnh tranh — Đăng ký ngay hôm nay'}
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14,
          }}>
            {popTlds.map((t, i) => (
              <div key={i} style={{
                border: `1px solid ${t.color}20`, borderRadius: 10, padding: '18px 20px',
                background: '#fafbfc', display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: t.color }}>{t.tld}</span>
                <span style={{ fontSize: 13, color: '#333', fontWeight: 600 }}>{t.price}</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                  {lang === 'en' ? 'Renew: ' : 'Gia hạn: '}{t.renew}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: '0 0 28px' }}>
            {lang === 'en' ? 'Frequently Asked Questions' : 'Câu hỏi thường gặp'}
          </h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => setEf(ef === i ? null : i)}
                  style={{
                    width: '100%', padding: '14px 0', border: 'none', background: 'none',
                    cursor: 'pointer', fontSize: 14, fontWeight: 500,
                    color: ef === i ? '#2563eb' : '#1e293b',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  }}>
                  <span style={{ fontWeight: 700, minWidth: 24, color: '#2563eb' }}>{i + 1}.</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{faq.q}</span>
                  <span style={{
                    color: '#aaa', fontSize: 11,
                    transform: ef === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>▼</span>
                </button>
                <div style={{
                  maxHeight: ef === i ? '300px' : '0', opacity: ef === i ? 1 : 0,
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
