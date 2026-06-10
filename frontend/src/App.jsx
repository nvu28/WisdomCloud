import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';
import ServiceDetail from './components/ServiceDetail';
import SubPage from './pages/index';
import { SUB_PAGES, WHY_CHOOSE } from './data/subPages';
import { searchServices } from './api/cloudApi';

const SERVICE_CATEGORIES = [
  {
    id: 'domain', title: 'Tên miền', desc: 'Đăng ký, chuyển nhượng, bảo mật DNS',
    items: ['Đăng Ký Tên Miền', 'Chuyển Về', 'Bảo Mật Tên Miền', 'Tiện Ích DNS'],
    color: '#2563eb', icon: '🌐',
  },
  {
    id: 'hosting', title: 'Web & Hosting', desc: 'Hosting, WordPress, VPS, Server',
    items: ['Web Hosting', 'WordPress Hosting', 'Enterprise Hosting', 'Cloud Server', 'VPS'],
    color: '#059669', icon: '🚀',
  },
  {
    id: 'email', title: 'Email Doanh Nghiệp', desc: 'Email server, Google Workspace, M365',
    items: ['Email Doanh Nghiệp', 'Google Workspace', 'Microsoft 365', 'Hybrid Email'],
    color: '#d97706', icon: '📧',
  },
  {
    id: 'security', title: 'SSL & Bảo Mật', desc: 'Chứng chỉ SSL, WAF, Anti-DDoS',
    items: ['SSL Certificate', 'Bảo Mật Website', 'CloudBric WAF', 'Imunify360'],
    color: '#dc2626', icon: '🔒',
  },
  {
    id: 'storage', title: 'Storage & Backup', desc: 'Cloud Drive, Backup, CDN',
    items: ['Cloud Drive', 'Backup Dữ Liệu', 'CDN'],
    color: '#7c3aed', icon: '💾',
  },
];

const HERO_TLDS = [
  { tld: '.com', price: '25.000₫', note: 'năm đầu', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫', note: 'năm đầu', color: '#dc2626' },
  { tld: '.xyz', price: '10.000₫', note: 'năm đầu', color: '#059669' },
  { tld: '.cloud', price: '45.000₫', note: 'năm đầu', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫', note: 'năm đầu', color: '#d97706' },
  { tld: '.org', price: '245.000₫', note: 'năm đầu', color: '#0891b2' },
];

const FEATURED_SERVICES = [
  {
    title: 'Cloud Server',
    desc: 'Máy chủ đám mây - bảo mật, đáng tin cậy, dễ dàng mở rộng',
    features: [
      'Intel Xeon, SSD NVMe, Unlimited bandwidth',
      'Miễn phí IPv6, cài đặt chủ động',
      'Tự động mở rộng tài nguyên theo nhu cầu',
    ],
    price: '175.000₫/tháng',
    color: '#2563eb',
    image: '🖥️',
  },
  {
    title: 'Web Hosting',
    desc: 'Giải pháp lưu trữ Web chuyên nghiệp, tốc độ cao',
    features: [
      'Hỗ trợ đa nền tảng Linux/Windows',
      'Tối ưu tốc độ với Litespeed bản quyền',
      'cPanel quản lý hosting dễ dàng',
    ],
    price: '33.000₫/tháng',
    color: '#059669',
    image: '🚀',
  },
  {
    title: 'Email Doanh Nghiệp',
    desc: 'Hệ thống Email trên nền Linux siêu tốc độ, Ip sạch',
    features: [
      'Bảo mật vượt trội, chống spam AI',
      'Google Workspace, Microsoft 365',
      'Hybrid Email tiết kiệm 80% chi phí',
    ],
    price: '24.000₫/tháng',
    color: '#d97706',
    image: '📧',
  },
  {
    title: 'SSL Certificate',
    desc: 'Bảo vệ dữ liệu khách hàng, tăng uy tín website',
    features: [
      'Mã hóa đầu cuối theo tiêu chuẩn quốc tế',
      'Cải thiện thứ hạng tìm kiếm với HTTPS',
      'Loại bỏ cảnh báo "Không bảo mật"',
    ],
    price: '18.000₫/tháng',
    color: '#dc2626',
    image: '🔒',
  },
];

const QUICK_ACCESS = [
  { icon: '🌐', title: 'Tên miền', desc: 'Đăng ký tên miền .com, .vn giá tốt' },
  { icon: '🚀', title: 'Web Hosting', desc: 'Hosting tốc độ cao, cPanel dễ dùng' },
  { icon: '🖥️', title: 'Cloud Server', desc: 'Intel Xeon, SSD NVMe, mở rộng linh hoạt' },
  { icon: '📧', title: 'Email Doanh Nghiệp', desc: 'Email server, Google Workspace, M365' },
  { icon: '🔒', title: 'SSL & Bảo Mật', desc: 'Chứng chỉ SSL, WAF, bảo vệ website' },
  { icon: '💾', title: 'Lưu trữ & Backup', desc: 'Cloud Drive, CDN, Backup dữ liệu' },
];

const TESTIMONIALS = [
  {
    name: 'Chị Phạm Minh Nhi', service: 'Web Hosting',
    text: 'Website doanh nghiệp tôi luôn được đảm bảo trực tuyến và hỗ trợ 24/7 từ đội ngũ kỹ thuật.',
    stars: 5,
  },
  {
    name: 'Anh Phạm Minh Hiếu', service: 'Website',
    text: 'Thiết kế web chuyên nghiệp, giao diện thân thiện dễ sử dụng, giúp tôi tạo và quản lý nhanh chóng.',
    stars: 5,
  },
  {
    name: 'Anh Lê Xuân Sơn', service: 'Tên miền',
    text: 'Quy trình đăng ký nhanh gọn, thủ tục minh bạch, sở hữu tên miền giá tốt.',
    stars: 5,
  },
  {
    name: 'Chị Nguyễn Ái Linh', service: 'Cloud Server',
    text: 'Máy chủ ổn định, tốc độ cao, đáp ứng tốt nhu cầu vận hành hệ thống của doanh nghiệp.',
    stars: 5,
  },
];



export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [detailId, setDetailId] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setResults(null);
    setParams({});
  };

  const handleSearch = async (newParams) => {
    setLoading(true);
    setParams(newParams);
    try {
      const data = await searchServices({ ...newParams, page: 0, size: 12 });
      setResults(data);
    } catch {
      setResults({ content: [], totalElements: 0, totalPages: 0, page: 0, size: 12 });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    setLoading(true);
    try {
      const data = await searchServices({ ...params, page: newPage, size: 12 });
      setResults(data);
    } catch {}
    setLoading(false);
  };

  const [domainQuery, setDomainQuery] = useState('');

  const handleDomainSearch = () => {
    if (!domainQuery.trim()) return;
    handleNavigate('cloud');
    handleSearch({ q: domainQuery, category: 'Domain' });
  };

  return (
    <div style={styles.page}>
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && (
        <>
          {/* HERO: Domain Search + TLD Prices */}
          <section style={styles.hero}>
            <div style={styles.heroBg} />
            <div style={styles.heroContent}>
              <div style={styles.heroTop}>
                <div style={styles.heroLeft}>
                  <div style={styles.heroLabel}>TÊN MIỀN GIÁ TỐT NHẤT</div>
                  <h1 style={styles.heroTitle}>Nền tảng Dịch vụ Số Toàn diện Cho Doanh Nghiệp</h1>
                  <p style={styles.heroSub}>
                    Nhà đăng ký tên miền được ICANN và VNNIC công nhận. Bảo vệ tên miền an toàn, máy chủ ổn định, phân giải nhanh.
                  </p>
                  <div style={styles.domainSearchBox}>
                    <input
                      style={styles.domainInput}
                      placeholder="Nhập tên miền mong muốn..."
                      value={domainQuery}
                      onChange={e => setDomainQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleDomainSearch()}
                    />
                    <button style={styles.domainBtn} onClick={handleDomainSearch}>Tìm tên miền</button>
                  </div>
                  <div style={styles.tldGrid}>
                    {HERO_TLDS.map((t, i) => (
                      <div key={i} style={{...styles.tldItem, borderColor: t.color}}>
                        <span style={{...styles.tldName, color: t.color}}>{t.tld}</span>
                        <span style={styles.tldPrice}>{t.price}</span>
                        <span style={styles.tldNote}>{t.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.heroRight}>
                  <div style={styles.heroBanner}>
                    <div style={styles.heroBannerIcon}>☁️</div>
                    <div style={styles.heroBannerTitle}>WISDOMCLOUD</div>
                    <div style={styles.heroBannerDesc}>Giải pháp số toàn diện cho doanh nghiệp</div>
                    <div style={styles.heroBannerFeatures}>
                      <div>✓ Tên miền & Web Hosting</div>
                      <div>✓ Cloud Server & VPS</div>
                      <div>✓ Email Doanh Nghiệp & SSL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FLASH SALE BAR */}
          <section style={styles.flashSale}>
            <div style={styles.sectionInner}>
              <div style={styles.flashInner}>
                <span style={styles.flashIcon}>🔥</span>
                <span style={styles.flashText}>Ưu đãi đặc biệt — Hosting/Email/Server</span>
                <span style={styles.flashHighlight}>Tặng đến 50% thời gian sử dụng</span>
                <a href="#" style={styles.flashBtn}>Xem ngay</a>
              </div>
            </div>
          </section>

          {/* PROMO BANNER: Web Hosting (WEB30S style) */}
          <section style={styles.promoBanner}>
            <div style={styles.sectionInner}>
              <div style={styles.promoLayout}>
                <div style={styles.promoContent}>
                  <div style={styles.promoLabel}>WEB HOSTING</div>
                  <h2 style={styles.promoTitle}>Giải Pháp Lưu Trữ Web Chuyên Nghiệp</h2>
                  <p style={styles.promoDesc}>
                    Tối ưu tốc độ với Litespeed bản quyền, hỗ trợ đa nền tảng Linux/Windows, 
                    cPanel quản lý dễ dàng. Dành cho mọi quy mô doanh nghiệp.
                  </p>
                  <ul style={styles.promoList}>
                    <li>✓ Hỗ trợ đa nền tảng (Windows, Linux) — ASP.NET, PHP, NodeJS, Python</li>
                    <li>✓ Tối ưu tốc độ với Litespeed bản quyền + Redis Cache</li>
                    <li>✓ cPanel quản lý hosting trực quan, dễ dùng</li>
                    <li>✓ Cam kết uptime 99.9%, bảo vệ khỏi DDoS</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>Chỉ từ 33.000₫/tháng</span>
                    <a href="#" style={styles.promoBtn}>Đăng ký ngay</a>
                  </div>
                </div>
                <div style={styles.promoImage}>
                  <span style={styles.promoIcon}>🚀</span>
                </div>
              </div>
            </div>
          </section>

          {/* PROMO BANNER: Cloud Server */}
          <section style={{...styles.promoBanner, background: '#f8fafc'}}>
            <div style={styles.sectionInner}>
              <div style={{...styles.promoLayout, flexDirection: 'row-reverse'}}>
                <div style={styles.promoContent}>
                  <div style={{...styles.promoLabel, color: '#2563eb'}}>CLOUD SERVER</div>
                  <h2 style={styles.promoTitle}>Máy Chủ Đám Mây Hiệu Suất Cao</h2>
                  <p style={styles.promoDesc}>
                    Intel Xeon thế hệ mới, ổ cứng SSD NVMe, Unlimited bandwidth. 
                    Tự động mở rộng tài nguyên theo nhu cầu, dễ dàng quản lý.
                  </p>
                  <ul style={styles.promoList}>
                    <li>✓ Intel Xeon, SSD NVMe, Unlimited bandwidth</li>
                    <li>✓ Miễn phí IPv6, cài đặt chủ động qua giao diện</li>
                    <li>✓ Tự động mở rộng tài nguyên linh hoạt</li>
                    <li>✓ Bảo vệ bởi CloudBric WAF, chống DDoS</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>Chỉ từ 175.000₫/tháng</span>
                    <a href="#" style={{...styles.promoBtn, background: '#2563eb'}}>Đăng ký ngay</a>
                  </div>
                </div>
                <div style={styles.promoImage}>
                  <span style={styles.promoIcon}>🖥️</span>
                </div>
              </div>
            </div>
          </section>

          {/* PROMO BANNER: Email & SSL */}
          <section style={styles.promoBanner}>
            <div style={styles.sectionInner}>
              <div style={styles.promoLayout}>
                <div style={styles.promoContent}>
                  <div style={{...styles.promoLabel, color: '#d97706'}}>EMAIL & SSL</div>
                  <h2 style={styles.promoTitle}>Bảo Mật & Giao Tiếp Doanh Nghiệp</h2>
                  <p style={styles.promoDesc}>
                    Email doanh nghiệp chuyên nghiệp với Google Workspace, Microsoft 365. 
                    Bảo vệ website với chứng chỉ SSL từ các thương hiệu hàng đầu.
                  </p>
                  <ul style={styles.promoList}>
                    <li>✓ Email server riêng, chống spam AI, bảo mật vượt trội</li>
                    <li>✓ Google Workspace, Microsoft 365 tích hợp dễ dàng</li>
                    <li>✓ SSL Sectigo, Digicert, Rapid — mã hóa đầu cuối</li>
                    <li>✓ Hybrid Email tiết kiệm 80% chi phí</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>Email từ 24.000₫ — SSL từ 18.000₫</span>
                    <a href="#" style={{...styles.promoBtn, background: '#d97706'}}>Đăng ký ngay</a>
                  </div>
                </div>
                <div style={styles.promoImage}>
                  <span style={styles.promoIcon}>📧</span>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED SERVICES */}
          <section style={styles.featured}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>DỊCH VỤ WEB, EMAIL & MÁY CHỦ CHUYÊN NGHIỆP</h2>
              <p style={styles.sectionSub}>Giải pháp toàn diện cho mọi nhu cầu doanh nghiệp</p>
              <div style={styles.featuredGrid}>
                {FEATURED_SERVICES.map((svc, i) => (
                  <div key={i} style={{...styles.featuredCard, borderColor: svc.color}}>
                    <div style={styles.featuredTop}>
                      <span style={{fontSize: 36}}>{svc.image}</span>
                      <div>
                        <h3 style={styles.featuredTitle}>{svc.title}</h3>
                        <p style={styles.featuredDesc}>{svc.desc}</p>
                      </div>
                    </div>
                    <ul style={styles.featuredList}>
                      {svc.features.map((f, j) => (
                        <li key={j} style={styles.featureItem}>{f}</li>
                      ))}
                    </ul>
                    <div style={styles.featuredBottom}>
                      <span style={{...styles.featuredPrice, color: svc.color}}>{svc.price}</span>
                      <a href="#" style={{...styles.featuredCta, background: svc.color}}>Xem chi tiết</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICE CATEGORIES */}
          <section style={styles.categories}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>DANH MỤC DỊCH VỤ</h2>
              <p style={styles.sectionSub}>Tất cả dịch vụ số cho doanh nghiệp của bạn</p>
              <div style={styles.catGrid}>
                {SERVICE_CATEGORIES.map((cat, i) => (
                  <div key={i} style={styles.catCard}>
                    <div style={{...styles.catIcon, background: cat.color + '12'}}>
                      <span style={{fontSize: 28}}>{cat.icon}</span>
                    </div>
                    <h3 style={styles.catTitle}>{cat.title}</h3>
                    <p style={styles.catDesc}>{cat.desc}</p>
                    <ul style={styles.catList}>
                      {cat.items.map((item, j) => (
                        <li key={j} style={styles.catItem}>{item}</li>
                      ))}
                    </ul>
                    <a href="#" style={{...styles.catCta, color: cat.color}}>Xem chi tiết →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACCESS: CÓ NGAY BỘ CHUYỂN ĐỔI SỐ */}
          <section style={styles.quickSection}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>CÓ NGAY BỘ CHUYỂN ĐỔI SỐ</h2>
              <p style={styles.sectionSub}>Tất cả giải pháp doanh nghiệp trong tầm tay</p>
              <div style={styles.quickGrid}>
                {QUICK_ACCESS.map((item, i) => (
                  <div key={i} style={styles.quickCard}>
                    <span style={styles.quickIcon}>{item.icon}</span>
                    <h3 style={styles.quickTitle}>{item.title}</h3>
                    <p style={styles.quickDesc}>{item.desc}</p>
                    <a href="#" style={styles.quickCta}>Xem thêm →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section style={styles.whySection}>
            <div style={styles.sectionInner}>
              <h2 style={{...styles.sectionTitle, color: '#fff'}}>VÌ SAO NÊN CHỌN WISDOMCLOUD?</h2>
              <p style={{...styles.sectionSub, color: '#94a3b8'}}>Đối tác tin cậy cho chuyển đổi số doanh nghiệp</p>
              <div style={styles.whyGrid}>
                {WHY_CHOOSE.map((w, i) => (
                  <div key={i} style={styles.whyCard}>
                    <span style={styles.whyIcon}>{w.icon}</span>
                    <h3 style={styles.whyTitle}>{w.title}</h3>
                    <p style={styles.whyDesc}>{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section style={styles.testSection}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>KHÁCH HÀNG NÓI VỀ WISDOMCLOUD</h2>
              <p style={styles.sectionSub}>Hàng trăm doanh nghiệp đã tin tưởng sử dụng dịch vụ</p>
              <div style={styles.testGrid}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} style={styles.testCard}>
                    <div style={styles.testStars}>
                      {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                    </div>
                    <p style={styles.testText}>"{t.text}"</p>
                    <div style={styles.testAuthor}>
                      <div style={styles.testAvatar}>{t.name.charAt(0)}</div>
                      <div>
                        <div style={styles.testName}>{t.name}</div>
                        <div style={styles.testService}>{t.service}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === 'cloud' && (
        <section style={styles.cloudSection}>
          <div style={styles.sectionInner}>
            <div style={styles.cloudHeader}>
              <h2 style={styles.sectionTitle}>Tra Cứu Báo Giá Cloud</h2>
              <p style={styles.sectionSub}>
                So sánh giá từ nhiều nhà cung cấp: CMC Cloud, FPT, Viettel, VNPT, vHost
              </p>
            </div>
            <SearchForm onSearch={handleSearch} loading={loading} />
            {results && (
              <div style={styles.stats}>
                <span>Tìm thấy <strong>{results.totalElements}</strong> dịch vụ</span>
                <span style={styles.statsSep}>|</span>
                <span>Trang {results.page + 1}/{results.totalPages || 1}</span>
                <button style={styles.backBtn} onClick={() => { setResults(null); setParams({}); }}>
                  ← Xóa kết quả
                </button>
              </div>
            )}
            <SearchResults services={results?.content} loading={loading} onViewDetail={setDetailId} />
            {results && (
              <Pagination page={results.page} totalPages={results.totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </section>
      )}

      {SUB_PAGES[currentPage] && (
        <SubPage
          pageKey={currentPage}
          onNavigate={handleNavigate}
          onDomainSearch={(q) => {
            setDomainQuery(q);
            handleNavigate('cloud');
            handleSearch({ q, category: 'Domain' });
          }}
        />
      )}

      <Footer />

      {detailId && (
        <ServiceDetail serviceId={detailId} onClose={() => setDetailId(null)} />
      )}
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },

  // HERO
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '60px 0 50px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at 30% 40%, rgba(37,99,235,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(99,102,241,0.06) 0%, transparent 50%)',
  },
  heroContent: { maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 },
  heroTop: { display: 'flex', gap: 40, alignItems: 'center' },
  heroLeft: { flex: '1 1 60%' },
  heroLabel: {
    fontSize: 13, fontWeight: 700, color: '#f59e0b',
    textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12,
  },
  heroTitle: {
    fontSize: 36, fontWeight: 800, color: '#fff',
    margin: '0 0 12px', lineHeight: 1.2,
  },
  heroSub: {
    fontSize: 15, color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.6,
  },
  domainSearchBox: { display: 'flex', gap: 8, marginBottom: 20, maxWidth: 520 },
  domainInput: {
    flex: 1, padding: '14px 20px', border: 'none', borderRadius: 8,
    fontSize: 15, outline: 'none',
  },
  domainBtn: {
    padding: '14px 28px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  tldGrid: { display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 520 },
  tldItem: {
    border: '1px solid', borderRadius: 8, padding: '8px 14px',
    background: 'rgba(255,255,255,0.05)', textAlign: 'center', minWidth: 90,
  },
  tldName: { display: 'block', fontSize: 16, fontWeight: 800 },
  tldPrice: { display: 'block', fontSize: 13, fontWeight: 600, color: '#fff' },
  tldNote: { display: 'block', fontSize: 11, color: '#64748b' },
  heroRight: { flex: '0 0 35%' },
  heroBanner: {
    background: 'linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%)',
    borderRadius: 16, padding: 32, border: '1px solid rgba(255,255,255,0.08)',
    textAlign: 'center',
  },
  heroBannerIcon: { fontSize: 48, marginBottom: 12 },
  heroBannerTitle: { fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 },
  heroBannerDesc: { fontSize: 13, color: '#94a3b8', marginBottom: 20 },
  heroBannerFeatures: {
    fontSize: 13, color: '#cbd5e1', lineHeight: 1.8, textAlign: 'left',
    display: 'inline-block',
  },

  // FLASH SALE
  flashSale: { background: '#fff', borderBottom: '1px solid #f1f5f9' },
  flashInner: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 0', justifyContent: 'center', flexWrap: 'wrap',
  },
  flashIcon: { fontSize: 20 },
  flashText: { fontSize: 14, fontWeight: 600, color: '#1e293b' },
  flashHighlight: { fontSize: 14, fontWeight: 700, color: '#dc2626' },
  flashBtn: {
    padding: '6px 20px', background: '#dc2626', color: '#fff',
    borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none',
  },

  // PROMO BANNERS (WEB30S style)
  promoBanner: { background: '#fff', padding: '50px 0', borderBottom: '1px solid #f1f5f9' },
  promoLayout: { display: 'flex', gap: 50, alignItems: 'center' },
  promoContent: { flex: '1 1 60%' },
  promoLabel: {
    fontSize: 13, fontWeight: 700, color: '#059669',
    textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8,
  },
  promoTitle: { fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  promoDesc: { fontSize: 15, color: '#64748b', margin: '0 0 20px', lineHeight: 1.6 },
  promoList: { listStyle: 'none', padding: 0, margin: '0 0 24px' },
  promoBottom: { display: 'flex', alignItems: 'center', gap: 20 },
  promoPrice: { fontSize: 18, fontWeight: 800, color: '#059669' },
  promoBtn: {
    padding: '12px 32px', background: '#059669', color: '#fff',
    borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none',
  },
  promoImage: {
    flex: '0 0 200px', display: 'flex', justifyContent: 'center',
  },
  promoIcon: { fontSize: 120, opacity: 0.15 },

  // FEATURED SERVICES
  featured: { padding: '60px 0' },
  sectionInner: { maxWidth: 1200, margin: '0 auto', padding: '0 24px' },
  sectionTitle: {
    fontSize: 26, fontWeight: 800, color: '#1e293b',
    textAlign: 'center', margin: '0 0 8px',
  },
  sectionSub: {
    fontSize: 15, color: '#64748b', textAlign: 'center', margin: '0 0 36px',
  },
  featuredGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 },
  featuredCard: {
    background: '#fff', borderRadius: 12, padding: 28, borderTop: '4px solid',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  featuredTop: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 },
  featuredTitle: { fontSize: 18, fontWeight: 700, margin: '0 0 4px' },
  featuredDesc: { fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.4 },
  featuredList: { listStyle: 'none', padding: 0, margin: '0 0 20px' },
  featureItem: {
    fontSize: 13, color: '#475569', padding: '5px 0 5px 20px',
    position: 'relative', borderBottom: '1px solid #f8fafc',
  },
  featuredBottom: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  featuredPrice: { fontSize: 20, fontWeight: 800 },
  featuredCta: {
    padding: '10px 24px', color: '#fff', borderRadius: 8,
    fontSize: 13, fontWeight: 600, textDecoration: 'none',
  },

  // CATEGORIES
  categories: { padding: '0 0 60px' },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 },
  catCard: {
    background: '#fff', borderRadius: 12, padding: 24,
    border: '1px solid #f1f5f9', transition: 'box-shadow 0.2s',
  },
  catIcon: {
    width: 52, height: 52, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  catTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 4px' },
  catDesc: { fontSize: 13, color: '#64748b', margin: '0 0 12px', lineHeight: 1.4 },
  catList: { listStyle: 'none', padding: 0, margin: '0 0 14px' },
  catItem: {
    fontSize: 13, color: '#64748b', padding: '2px 0 2px 14px',
    position: 'relative',
  },
  catCta: { fontSize: 13, fontWeight: 600, textDecoration: 'none' },

  // QUICK ACCESS
  quickSection: { padding: '60px 0', background: '#fff' },
  quickGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  quickCard: {
    background: '#f8fafc', borderRadius: 12, padding: 28, textAlign: 'center',
    border: '1px solid #f1f5f9',
  },
  quickIcon: { fontSize: 40, display: 'block', marginBottom: 12 },
  quickTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 8px' },
  quickDesc: { fontSize: 13, color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 },
  quickCta: { fontSize: 13, fontWeight: 600, color: '#2563eb', textDecoration: 'none' },

  // WHY CHOOSE
  whySection: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '60px 0',
  },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  whyCard: { textAlign: 'center', padding: '0 12px' },
  whyIcon: { fontSize: 40, display: 'block', marginBottom: 12 },
  whyTitle: { fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' },
  whyDesc: { fontSize: 13, color: '#94a3b8', lineHeight: 1.5, margin: 0 },

  // TESTIMONIALS
  testSection: { padding: '60px 0', background: '#fff' },
  testGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  testCard: {
    background: '#f8fafc', borderRadius: 12, padding: 24,
    border: '1px solid #f1f5f9',
  },
  testStars: { fontSize: 16, color: '#f59e0b', marginBottom: 12 },
  testText: {
    fontSize: 14, color: '#475569', lineHeight: 1.6, fontStyle: 'italic',
    margin: '0 0 16px',
  },
  testAuthor: { display: 'flex', gap: 10, alignItems: 'center' },
  testAvatar: {
    width: 36, height: 36, borderRadius: '50%', background: '#2563eb',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700,
  },
  testName: { fontSize: 14, fontWeight: 600, color: '#1e293b' },
  testService: { fontSize: 12, color: '#94a3b8' },

  // CLOUD SEARCH
  cloudSection: { padding: '40px 0 60px' },
  cloudHeader: { marginBottom: 0 },
  stats: {
    fontSize: 14, color: '#64748b', marginBottom: 16,
    display: 'flex', gap: 8, alignItems: 'center',
  },
  statsSep: { color: '#e2e8f0' },
  backBtn: {
    background: 'none', border: '1px solid #e2e8f0', borderRadius: 6,
    padding: '4px 12px', fontSize: 13, color: '#64748b', cursor: 'pointer', marginLeft: 'auto',
  },
};
