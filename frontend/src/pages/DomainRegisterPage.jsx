import React, { useState } from 'react';
import { getCategoryNav } from '../data/subPages';
import { checkDomain, getTldList } from '../api/cloudApi';

const si = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const TLD_HERO = [
  { tld: '.com', price: '19.000₫', label: 'Khi đăng ký từ 03 năm', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫', label: 'năm đầu', color: '#dc2626' },
  { tld: '.com.vn', price: '150.000₫', label: 'Khi đăng ký từ 03 năm', color: '#dc2626' },
  { tld: '.net', price: '25.000₫', label: 'năm đầu', color: '#2563eb' },
  { tld: '.xyz', price: '10.000₫', label: 'năm đầu', color: '#059669' },
  { tld: '.cloud', price: '45.000₫', label: 'năm đầu', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫', label: 'năm đầu', color: '#d97706' },
  { tld: '.org', price: '245.000₫', label: 'năm đầu', color: '#0891b2' },
];

const TLD_HERO_EN = [
  { tld: '.com', price: '19.000₫', label: 'When registering 3+ years', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫', label: 'first year', color: '#dc2626' },
  { tld: '.com.vn', price: '150.000₫', label: 'When registering 3+ years', color: '#dc2626' },
  { tld: '.net', price: '25.000₫', label: 'first year', color: '#2563eb' },
  { tld: '.xyz', price: '10.000₫', label: 'first year', color: '#059669' },
  { tld: '.cloud', price: '45.000₫', label: 'first year', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫', label: 'first year', color: '#d97706' },
  { tld: '.org', price: '245.000₫', label: 'first year', color: '#0891b2' },
];

const DOMAIN_TLDS = [
  { icon: 'V', label: '.vn', price: '150.000₫', old: '700.000₫', desc: 'Tên miền quốc gia — Kết nối thương mại Việt', url: '#' },
  { icon: 'C', label: '.com', price: '19.000₫', old: '429.000₫', desc: 'Tên miền uy tín nhất cho website của bạn', url: '#' },
  { icon: 'N', label: '.net', price: '159.000₫', old: '439.000₫', desc: 'Mở rộng thương hiệu toàn cầu với tên miền .net', url: '#' },
  { icon: 'O', label: '.org', price: '289.000₫', old: '445.000₫', desc: 'Xây dựng niềm tin từ cộng đồng', url: '#' },
  { icon: 'I', label: '.info', price: '139.000₫', old: '807.000₫', desc: 'Cập nhật thông tin nhanh chóng', url: '#' },
  { icon: 'T', label: '.top', price: '48.000₫', old: '249.000₫', desc: 'Dẫn đầu thương hiệu với tên miền .top', url: '#' },
  { icon: 'X', label: '.xyz', price: '18.000₫', old: '423.000₫', desc: 'Tạo khác biệt với tên miền thế hệ mới', url: '#' },
  { icon: 'A', label: '.asia', price: '36.000₫', old: '439.000₫', desc: 'Chinh phục thị trường Châu Á', url: '#' },
  { icon: 'S', label: '.site', price: '49.000₫', old: '1.012.000₫', desc: 'Định vị thương hiệu doanh nghiệp', url: '#' },
  { icon: 'O', label: '.online', price: '39.000₫', old: '1.012.000₫', desc: 'Kết nối thế giới với tên miền .online', url: '#' },
];

const DOMAIN_TLDS_EN = [
  { icon: 'V', label: '.vn', price: '150.000₫', old: '700.000₫', desc: 'Vietnam national domain — Connect Vietnamese commerce', url: '#' },
  { icon: 'C', label: '.com', price: '19.000₫', old: '429.000₫', desc: 'The most trusted domain for your website', url: '#' },
  { icon: 'N', label: '.net', price: '159.000₫', old: '439.000₫', desc: 'Expand your brand globally with .net', url: '#' },
  { icon: 'O', label: '.org', price: '289.000₫', old: '445.000₫', desc: 'Build trust from the community', url: '#' },
  { icon: 'I', label: '.info', price: '139.000₫', old: '807.000₫', desc: 'Quick information sharing', url: '#' },
  { icon: 'T', label: '.top', price: '48.000₫', old: '249.000₫', desc: 'Lead your brand with .top', url: '#' },
  { icon: 'X', label: '.xyz', price: '18.000₫', old: '423.000₫', desc: 'Stand out with next-generation domains', url: '#' },
  { icon: 'A', label: '.asia', price: '36.000₫', old: '439.000₫', desc: 'Conquer the Asian market', url: '#' },
  { icon: 'S', label: '.site', price: '49.000₫', old: '1.012.000₫', desc: 'Position your business brand', url: '#' },
  { icon: 'O', label: '.online', price: '39.000₫', old: '1.012.000₫', desc: 'Connect the world with .online', url: '#' },
];

const EXTRA_TLDS = [
  { icon: '⛅', label: '.cloud', price: '45.000₫', old: '719.000₫', desc: 'Thương hiệu công nghệ hàng đầu' },
  { icon: '🛍️', label: '.store', price: '39.000₫', old: '1.519.000₫', desc: 'Có tên miền .store - Khỏi lo ế hàng' },
  { icon: '🔧', label: '.work', price: '385.000₫', old: null, desc: 'Xây dựng giá trị thương hiệu' },
  { icon: '🔗', label: '.link', price: '346.000₫', old: null, desc: 'Tên miền kết nối mọi người' },
  { icon: '🖱️', label: '.click', price: '55.000₫', old: '384.000₫', desc: 'Tên miền tạo cảm hứng hành động' },
  { icon: '🎯', label: '.club', price: '576.000₫', old: null, desc: 'Chia sẻ đam mê — Kết nối bất tận' },
  { icon: '💼', label: '.pro', price: '139.000₫', old: '807.000₫', desc: 'Bước đệm khẳng định sự chuyên nghiệp' },
  { icon: '🚀', label: '.space', price: '49.000₫', old: '904.000₫', desc: 'Không gian để bạn thỏa sức sáng tạo' },
  { icon: '🌐', label: '.website', price: '49.000₫', old: '746.000₫', desc: 'Tên miền hoàn hảo cho mọi trang web' },
  { icon: '📝', label: '.blog', price: '108.000₫', old: null, desc: 'Khẳng định chất tôi với tên miền blog' },
];

const EXTRA_TLDS_EN = [
  { icon: '⛅', label: '.cloud', price: '45.000₫', old: '719.000₫', desc: 'Leading technology brand' },
  { icon: '🛍️', label: '.store', price: '39.000₫', old: '1.519.000₫', desc: 'Get a .store domain - never worry about inventory' },
  { icon: '🔧', label: '.work', price: '385.000₫', old: null, desc: 'Build brand value' },
  { icon: '🔗', label: '.link', price: '346.000₫', old: null, desc: 'A domain that connects people' },
  { icon: '🖱️', label: '.click', price: '55.000₫', old: '384.000₫', desc: 'A domain that inspires action' },
  { icon: '🎯', label: '.club', price: '576.000₫', old: null, desc: 'Share passion — Endless connection' },
  { icon: '💼', label: '.pro', price: '139.000₫', old: '807.000₫', desc: 'A stepping stone to professionalism' },
  { icon: '🚀', label: '.space', price: '49.000₫', old: '904.000₫', desc: 'Space for unlimited creativity' },
  { icon: '🌐', label: '.website', price: '49.000₫', old: '746.000₫', desc: 'The perfect domain for any website' },
  { icon: '📝', label: '.blog', price: '108.000₫', old: null, desc: 'Showcase your style with a blog domain' },
];

const WHY_US = [
  { icon: '🏆', title: 'Thị phần lớn nhất Việt Nam', desc: 'Nhà đăng ký có thị phần tên miền Lớn Nhất Việt Nam' },
  { icon: '🌐', title: 'Hỗ trợ nhiều tên miền nhất', desc: 'Hơn 500 đuôi tên miền khác nhau, mang đến sự lựa chọn phong phú' },
  { icon: '💬', title: 'Hỗ trợ 24/7/365', desc: 'Hỗ trợ kỹ thuật 24/7 theo phong cách các nhà cung cấp tốt nhất thế giới' },
];

const WHY_US_EN = [
  { icon: '🏆', title: 'Largest Market Share in Vietnam', desc: 'Domain registrar with the largest market share in Vietnam' },
  { icon: '🌐', title: 'Supports Most Domains', desc: 'Over 500 different domain extensions, offering a wide selection' },
  { icon: '💬', title: '24/7/365 Support', desc: 'Technical support 24/7 in the style of the world\'s best providers' },
];

const PRINCIPLES = [
  'Đăng ký tên miền được thực hiện theo nguyên tắc bình đẳng',
  'Tên miền phải xây dựng dựa trên khách hàng mục tiêu',
  'Tên miền dễ đọc và không gây nhầm lẫn, khó viết sai chính tả',
  'Tên miền dễ nhớ, liên quan đến lĩnh vực hoạt động',
  'Đăng ký bao vây để bảo vệ thương hiệu',
  'Đặt tên miền ngắn gọn',
  'Chủ động nộp phí duy trì trước khi tên miền hết thời hạn sử dụng',
  'Chủ thể tự chịu trách nhiệm tuân thủ quy định quốc tế & pháp luật nước sở tại',
];

const PRINCIPLES_EN = [
  'Domain registration is conducted on the principle of equality',
  'Domain names should be built around target customers',
  'Easy to read, not confusing, and hard to misspell',
  'Easy to remember, relevant to your field of activity',
  'Register variations to protect your brand',
  'Keep domain names short and concise',
  'Proactively pay renewal fees before domain expiration',
  'Registrants are responsible for complying with international regulations & local laws',
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
  const [hoverIdx, setHoverIdx] = useState(null);
  const [extHover, setExtHover] = useState(null);
  const [domainResults, setDomainResults] = useState(null);
  const [searchDomain, setSearchDomain] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState('');
  const nav = getCategoryNav(lang)['domain'];
  const tldHero = lang === 'en' ? TLD_HERO_EN : TLD_HERO;
  const domainTlds = lang === 'en' ? DOMAIN_TLDS_EN : DOMAIN_TLDS;
  const extraTlds = lang === 'en' ? EXTRA_TLDS_EN : EXTRA_TLDS;
  const whyUs = lang === 'en' ? WHY_US_EN : WHY_US;
  const principles = lang === 'en' ? PRINCIPLES_EN : PRINCIPLES;
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

      {/* HERO */}
      <section style={{ background: '#f5f5f5', padding: '40px 0 30px', borderBottom: '1px solid #e8e8e8' }}>
        <div style={si}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#555', margin: '0 0 4px' }}>{lang === 'en' ? 'Solutions' : 'Các giải pháp'}</p>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#1e293b', margin: '0 0 8px', textTransform: 'uppercase' }}>{lang === 'en' ? 'DOMAINS' : 'TÊN MIỀN'}</h1>
            <p style={{ fontSize: 14, color: '#888', margin: '0 0 20px' }}>
              {lang === 'en' ? 'Best domain prices — Own your domain for your business today' : 'Tên miền giá tốt nhất — Sở hữu ngay tên miền cho doanh nghiệp của bạn'}
            </p>

            <form onSubmit={handleSearch} style={{
              display: 'flex', gap: 0, maxWidth: 560, margin: '0 auto 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 8, overflow: 'hidden',
            }}>
              <input style={{
                flex: 1, padding: '16px 20px', border: 'none', fontSize: 15, outline: 'none',
              }} placeholder={lang === 'en' ? 'Enter your desired domain...' : 'Nhập tên miền mong muốn...'} value={q} onChange={e => setQ(e.target.value)} />
              <button type="submit" disabled={checking} style={{
                padding: '16px 32px', background: '#000', color: '#fff', border: 'none',
                fontSize: 14, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer',
                opacity: checking ? 0.6 : 1,
              }}>{checking ? (lang === 'en' ? '...' : '...') : (lang === 'en' ? 'Check' : 'Kiểm tra')}</button>
            </form>

            {/* Domain check results */}
            {checkError && (
              <p style={{ color: '#dc2626', fontSize: 14, margin: '0 0 16px', textAlign: 'center' }}>{checkError}</p>
            )}
            {checking && (
              <p style={{ color: '#666', fontSize: 14, margin: '0 0 16px', textAlign: 'center' }}>
                {lang === 'en' ? 'Checking...' : 'Đang kiểm tra...'}
              </p>
            )}
            {domainResults && (
              <div style={{
                maxWidth: 600, margin: '0 auto 24px', background: '#fff',
                borderRadius: 10, border: '1px solid #e2e8f0', overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  padding: '12px 20px', background: '#1e293b', color: '#fff',
                  fontSize: 14, fontWeight: 700,
                }}>
                  {lang === 'en' ? `Results for: ${searchDomain}` : `Kết quả cho: ${searchDomain}`}
                </div>
                <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                  {domainResults.map((r, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 20px', borderBottom: '1px solid #f1f5f9',
                      background: i % 2 === 0 ? '#fff' : '#f8fafc',
                    }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: r.color, minWidth: 80 }}>{r.tld}</span>
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: r.available ? '#059669' : '#dc2626',
                        minWidth: 80,
                      }}>
                        {r.available
                          ? (lang === 'en' ? '✓ Available' : '✓ Có sẵn')
                          : (lang === 'en' ? '✗ Taken' : '✗ Đã có')}
                      </span>
                      <span style={{ fontSize: 13, color: '#475569', minWidth: 100 }}>
                        {fmtPrice(r.priceFirstYear)}/{lang === 'en' ? '1st yr' : 'năm đầu'}
                      </span>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>
                        {lang === 'en' ? 'Renew: ' : 'Gia hạn: '}{fmtPrice(r.priceRenew)}
                      </span>
                      <a href="#" onClick={(e) => { e.preventDefault(); onDomainSearch(searchDomain + r.tld); }}
                        style={{
                          marginLeft: 'auto', padding: '6px 16px', fontSize: 12, fontWeight: 600,
                          background: r.available ? '#2563eb' : '#e2e8f0',
                          color: r.available ? '#fff' : '#94a3b8',
                          borderRadius: 6, textDecoration: 'none', flexShrink: 0,
                        }}>
                        {r.available
                          ? (lang === 'en' ? 'Register' : 'Đăng ký')
                          : (lang === 'en' ? 'Search' : 'Tìm')}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hero badges */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {tldHero.map((t, i) => (
                <div key={i} style={{
                  border: `1px solid ${t.color}`, borderRadius: 8, padding: '6px 14px',
                  background: '#fff', textAlign: 'center', minWidth: 85,
                }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 800, color: t.color }}>{t.tld}</span>
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#333' }}>{t.price}</span>
                  <span style={{ display: 'block', fontSize: 11, color: '#999' }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* Promo banners */}
            <div style={{
              background: 'linear-gradient(135deg, #dd1b5c 0%, #ff4d7a 100%)',
              padding: '14px 20px', borderRadius: 10, marginTop: 18,
              display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {(lang === 'en' ? [
                '.ID.VN | .BIZ.VN: Free registration',
                '.XYZ | .SITE | .ONLINE | .CLICK: Only 10K/first year',
                '.IO.VN: Only 30K/first year',
                '.ASIA: Only 36K/first year',
              ] : [
                '.ID.VN | .BIZ.VN: Miễn phí đăng ký',
                '.XYZ | .SITE | .ONLINE | .CLICK: Chỉ 10K/năm đầu',
                '.IO.VN: Chỉ 30K/năm đầu',
                '.ASIA: Chỉ 36K/năm đầu',
              ]).map((text, i) => (
                <span key={i} style={{ color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
                  🔥 {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ padding: '36px 0', textAlign: 'center', background: '#fff' }}>
        <div style={si}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>
            {lang === 'en' ? 'WisdomCloud Is the Largest Domain Registrar in Vietnam' : 'WisdomCloud Là Nhà Đăng Ký Tên Miền Lớn Nhất Việt Nam'}
          </h2>
          <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
            {lang === 'en' ? 'Under ICANN and Vietnam Internet Center VNNIC' : 'Trực thuộc tổ chức tên miền quốc tế ICANN và trung tâm internet Việt Nam VNNIC'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 14 }}>
            <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>✓ ICANN Accredited</span>
            <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>✓ VNNIC Partner</span>
            <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{lang === 'en' ? '✓ 25+ Years experience' : '✓ 25+ Năm kinh nghiệm'}</span>
          </div>
        </div>
      </section>

      {/* MAIN TLD GRID */}
      <section style={{ background: '#f2f2f2', padding: '0 0 50px' }}>
        <div style={si}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16,
            padding: 24, background: '#f2f2f2', borderRadius: 12, marginTop: 0,
          }}>
            {domainTlds.map((d, i) => (
              <div key={i}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{
                  background: hoverIdx === i ? '#f0f7ff' : '#fff',
                  borderRadius: 10, padding: '20px 14px', textAlign: 'center',
                  border: hoverIdx === i ? '2px solid #2563eb' : '1px solid #e8e8e8',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  transition: 'all 0.2s', cursor: 'pointer',
                }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: i < 2 ? '#2563eb' : '#f1f5f9',
                  color: i < 2 ? '#fff' : '#1e293b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 900,
                }}>{d.icon}</div>
                <span style={{
                  padding: '3px 14px', background: hoverIdx === i ? '#2563eb' : '#e6e6e6',
                  borderRadius: 12, fontSize: 14, fontWeight: 700,
                  color: hoverIdx === i ? '#fff' : '#555', transition: 'all 0.2s',
                }}>{d.label}</span>
                <p style={{ fontSize: 12, color: '#777', lineHeight: 1.3, margin: '4px 0', minHeight: 32 }}>
                  {d.desc}
                </p>
                <p style={{ fontSize: 13, color: '#333', margin: 0, fontWeight: 600 }}>
                  {lang === 'en' ? 'From' : 'Giá từ'} <strong style={{ color: '#2563eb' }}>{d.price}</strong>
                </p>
                {d.old && <p style={{ fontSize: 12, color: '#999', textDecoration: 'line-through', margin: 0 }}>{lang === 'en' ? 'Old price' : 'Giá cũ'} {d.old}</p>}
                <button onClick={(e) => { e.preventDefault(); onDomainSearch(d.label); }}
                  style={{
                    padding: '7px 18px', border: hoverIdx === i ? 'none' : '2px solid #ddd',
                    borderRadius: 6, fontSize: 12, fontWeight: 600,
                    background: hoverIdx === i ? '#2563eb' : '#fff',
                    color: hoverIdx === i ? '#fff' : '#555',
                    cursor: 'pointer', marginTop: 'auto', transition: 'all 0.2s',
                  }}>
                  {lang === 'en' ? 'Check Availability' : 'Kiểm tra tồn tại'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '0 0 28px', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'WHY CHOOSE WISDOMCLOUD' : 'TẠI SAO NÊN CHỌN WISDOMCLOUD'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {whyUs.map((w, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 28, background: '#f8fafc', borderRadius: 12, border: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>{w.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA TLD GRID */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '0 0 28px', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'MORE DOMAIN EXTENSIONS' : 'THÊM NHIỀU TÊN MIỀN KHÁC'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {extraTlds.map((d, i) => (
              <div key={i}
                onMouseEnter={() => setExtHover(i)}
                onMouseLeave={() => setExtHover(null)}
                style={{
                  background: extHover === i ? '#fff' : '#fff',
                  borderRadius: 10, padding: '16px 12px', textAlign: 'center',
                  border: extHover === i ? '2px solid #d97706' : '1px solid #e8e8e8',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}>
                <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>{d.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', display: 'block' }}>{d.label}</span>
                <p style={{ fontSize: 11, color: '#777', margin: '3px 0', lineHeight: 1.3 }}>{d.desc}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#2563eb', margin: '4px 0' }}>{d.price}</p>
                {d.old && <p style={{ fontSize: 11, color: '#999', textDecoration: 'line-through', margin: 0 }}>{d.old}</p>}
                <button onClick={() => onDomainSearch(d.label)}
                  style={{
                    padding: '5px 14px', border: '1px solid #d97706', borderRadius: 5,
                    fontSize: 11, fontWeight: 600,
                    background: extHover === i ? '#d97706' : '#fff',
                    color: extHover === i ? '#fff' : '#d97706',
                    cursor: 'pointer', marginTop: 6, transition: 'all 0.2s',
                  }}>
                  {lang === 'en' ? 'Check' : 'Kiểm tra'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '0 0 4px', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'BASIC PRINCIPLES' : 'NGUYÊN TẮC CƠ BẢN'}
          </h2>
          <p style={{ textAlign: 'center', fontSize: 14, color: '#666', margin: '0 0 24px' }}>
            {lang === 'en' ? 'When registering & using' : 'Khi đăng ký & sử dụng'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {principles.map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 10, padding: 16,
                border: '1px solid #eee', display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: '#eff6ff',
                  color: '#2563eb', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={si}>
          <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '0 0 28px', textTransform: 'uppercase' }}>
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
