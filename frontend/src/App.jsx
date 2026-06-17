import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SubPage from './pages/index';
import { SUB_PAGES, getSubPages, WHY_CHOOSE } from './data/subPages';
import { useTranslation } from './i18n';

const CATEGORIES_VI = [
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

const CATEGORIES_EN = [
  {
    id: 'domain', title: 'Domains', desc: 'Register, transfer, DNS security',
    items: ['Register Domain', 'Transfer In', 'Domain Security', 'DNS Tools'],
    color: '#2563eb', icon: '🌐',
  },
  {
    id: 'hosting', title: 'Web & Hosting', desc: 'Hosting, WordPress, VPS, Server',
    items: ['Web Hosting', 'WordPress Hosting', 'Enterprise Hosting', 'Cloud Server', 'VPS'],
    color: '#059669', icon: '🚀',
  },
  {
    id: 'email', title: 'Business Email', desc: 'Email server, Google Workspace, M365',
    items: ['Business Email', 'Google Workspace', 'Microsoft 365', 'Hybrid Email'],
    color: '#d97706', icon: '📧',
  },
  {
    id: 'security', title: 'SSL & Security', desc: 'SSL Certificates, WAF, Anti-DDoS',
    items: ['SSL Certificate', 'Website Security', 'CloudBric WAF', 'Imunify360'],
    color: '#dc2626', icon: '🔒',
  },
  {
    id: 'storage', title: 'Storage & Backup', desc: 'Cloud Drive, Backup, CDN',
    items: ['Cloud Drive', 'Data Backup', 'CDN'],
    color: '#7c3aed', icon: '💾',
  },
];

const HERO_TLDS = [
  { tld: '.com', price: '25.000₫', noteKey: 'home.hero.year', color: '#2563eb' },
  { tld: '.vn', price: '250.000₫', noteKey: 'home.hero.year', color: '#dc2626' },
  { tld: '.xyz', price: '10.000₫', noteKey: 'home.hero.year', color: '#059669' },
  { tld: '.cloud', price: '45.000₫', noteKey: 'home.hero.year', color: '#7c3aed' },
  { tld: '.asia', price: '36.000₫', noteKey: 'home.hero.year', color: '#d97706' },
  { tld: '.org', price: '245.000₫', noteKey: 'home.hero.year', color: '#0891b2' },
];

const FEATURED_KEYS = [
  {
    titleKey: 'home.featured.items.cloud.title', descKey: 'home.featured.items.cloud.desc',
    featureKeys: ['home.featured.items.cloud.f1', 'home.featured.items.cloud.f2', 'home.featured.items.cloud.f3'],
    price: '175.000₫/tháng', color: '#2563eb', image: '🖥️',
  },
  {
    titleKey: 'home.featured.items.hosting.title', descKey: 'home.featured.items.hosting.desc',
    featureKeys: ['home.featured.items.hosting.f1', 'home.featured.items.hosting.f2', 'home.featured.items.hosting.f3'],
    price: '33.000₫/tháng', color: '#059669', image: '🚀',
  },
  {
    titleKey: 'home.featured.items.email.title', descKey: 'home.featured.items.email.desc',
    featureKeys: ['home.featured.items.email.f1', 'home.featured.items.email.f2', 'home.featured.items.email.f3'],
    price: '24.000₫/tháng', color: '#d97706', image: '📧',
  },
  {
    titleKey: 'home.featured.items.ssl.title', descKey: 'home.featured.items.ssl.desc',
    featureKeys: ['home.featured.items.ssl.f1', 'home.featured.items.ssl.f2', 'home.featured.items.ssl.f3'],
    price: '18.000₫/tháng', color: '#dc2626', image: '🔒',
  },
];

const QUICK_ACCESS_KEYS = [
  { icon: '🌐', titleKey: 'home.quick.items.domain.title', descKey: 'home.quick.items.domain.desc' },
  { icon: '🚀', titleKey: 'home.quick.items.hosting.title', descKey: 'home.quick.items.hosting.desc' },
  { icon: '🖥️', titleKey: 'home.quick.items.server.title', descKey: 'home.quick.items.server.desc' },
  { icon: '📧', titleKey: 'home.quick.items.email.title', descKey: 'home.quick.items.email.desc' },
  { icon: '🔒', titleKey: 'home.quick.items.ssl.title', descKey: 'home.quick.items.ssl.desc' },
  { icon: '💾', titleKey: 'home.quick.items.storage.title', descKey: 'home.quick.items.storage.desc' },
];

const TESTIMONIAL_CONFIG = [
  { nameKey: 'home.testimonials.items.0.name', serviceKey: 'home.testimonials.items.0.service', textKey: 'home.testimonials.items.0.text', stars: 5 },
  { nameKey: 'home.testimonials.items.1.name', serviceKey: 'home.testimonials.items.1.service', textKey: 'home.testimonials.items.1.text', stars: 5 },
  { nameKey: 'home.testimonials.items.2.name', serviceKey: 'home.testimonials.items.2.service', textKey: 'home.testimonials.items.2.text', stars: 5 },
  { nameKey: 'home.testimonials.items.3.name', serviceKey: 'home.testimonials.items.3.service', textKey: 'home.testimonials.items.3.text', stars: 5 },
];



export default function App() {
  const { t, lang } = useTranslation();
  const SERVICE_CATEGORIES = lang === 'en' ? CATEGORIES_EN : CATEGORIES_VI;
  const FEATURED_SERVICES = FEATURED_KEYS.map(fk => ({
    title: t(fk.titleKey), desc: t(fk.descKey),
    features: fk.featureKeys.map(f => t(f)),
    price: fk.price, color: fk.color, image: fk.image,
  }));
  const QUICK_ACCESS = QUICK_ACCESS_KEYS.map(q => ({
    icon: q.icon, title: t(q.titleKey), desc: t(q.descKey),
  }));
  const TESTIMONIALS = TESTIMONIAL_CONFIG.map(tc => ({
    name: t(tc.nameKey), service: t(tc.serviceKey), text: t(tc.textKey), stars: tc.stars,
  }));
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('wc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('wc_token', data.token);
    localStorage.setItem('wc_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('wc_token');
    localStorage.removeItem('wc_user');
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div style={styles.page}>
      <Header onNavigate={handleNavigate} currentPage={currentPage} user={user} onLogout={handleLogout} />

      {currentPage === 'home' && (
        <>
          {/* HERO: Domain Search + TLD Prices */}
          <section style={styles.hero}>
            <div style={styles.heroBg} />
            <div style={styles.heroContent}>
              <div style={styles.heroTop}>
                <div style={styles.heroLeft}>
                  <div style={styles.heroLabel}>{t('home.hero.label')}</div>
                  <h1 style={styles.heroTitle}>{t('home.hero.title')}</h1>
                  <p style={styles.heroSub}>{t('home.hero.subtitle')}</p>

                  <div style={styles.tldGrid}>
                    {HERO_TLDS.map((td, i) => (
                      <div key={i} style={{...styles.tldItem, borderColor: td.color}}>
                        <span style={{...styles.tldName, color: td.color}}>{td.tld}</span>
                        <span style={styles.tldPrice}>{td.price}</span>
                        <span style={styles.tldNote}>{t(td.noteKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.heroRight}>
                  <div style={styles.heroBanner}>
                    <div style={styles.heroBannerIcon}>☁️</div>
                    <div style={styles.heroBannerTitle}>WISDOMCLOUD</div>
                    <div style={styles.heroBannerDesc}>{t('home.hero.bannerDesc')}</div>
                    <div style={styles.heroBannerFeatures}>
                      <div>{t('home.hero.bannerF1')}</div>
                      <div>{t('home.hero.bannerF2')}</div>
                      <div>{t('home.hero.bannerF3')}</div>
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
                <span style={styles.flashText}>{t('home.flash.text')}</span>
                <span style={styles.flashHighlight}>{t('home.flash.highlight')}</span>
                <a href="#" style={styles.flashBtn}>{t('home.flash.cta')}</a>
              </div>
            </div>
          </section>

          {/* PROMO BANNER: Web Hosting (WEB30S style) */}
          <section style={styles.promoBanner}>
            <div style={styles.sectionInner}>
              <div style={styles.promoLayout}>
                <div style={styles.promoContent}>
                  <div style={styles.promoLabel}>WEB HOSTING</div>
                  <h2 style={styles.promoTitle}>{t('home.hosting.title')}</h2>
                  <p style={styles.promoDesc}>{t('home.hosting.desc')}</p>
                  <ul style={styles.promoList}>
                    <li>{t('home.hosting.f1')}</li>
                    <li>{t('home.hosting.f2')}</li>
                    <li>{t('home.hosting.f3')}</li>
                    <li>{t('home.hosting.f4')}</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>{t('home.hosting.price')}</span>
                    <a href="#" style={styles.promoBtn}>{t('home.hosting.cta')}</a>
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
                  <h2 style={styles.promoTitle}>{t('home.cloud.title')}</h2>
                  <p style={styles.promoDesc}>{t('home.cloud.desc')}</p>
                  <ul style={styles.promoList}>
                    <li>{t('home.cloud.f1')}</li>
                    <li>{t('home.cloud.f2')}</li>
                    <li>{t('home.cloud.f3')}</li>
                    <li>{t('home.cloud.f4')}</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>{t('home.cloud.price')}</span>
                    <a href="#" style={{...styles.promoBtn, background: '#2563eb'}}>{t('home.cloud.cta')}</a>
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
                  <h2 style={styles.promoTitle}>{t('home.emailssl.title')}</h2>
                  <p style={styles.promoDesc}>{t('home.emailssl.desc')}</p>
                  <ul style={styles.promoList}>
                    <li>{t('home.emailssl.f1')}</li>
                    <li>{t('home.emailssl.f2')}</li>
                    <li>{t('home.emailssl.f3')}</li>
                    <li>{t('home.emailssl.f4')}</li>
                  </ul>
                  <div style={styles.promoBottom}>
                    <span style={styles.promoPrice}>{t('home.emailssl.price')}</span>
                    <a href="#" style={{...styles.promoBtn, background: '#d97706'}}>{t('home.emailssl.cta')}</a>
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
              <h2 style={styles.sectionTitle}>{t('home.featured.title')}</h2>
              <p style={styles.sectionSub}>{t('home.featured.sub')}</p>
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
                      <a href="#" style={{...styles.featuredCta, background: svc.color}}>{t('home.featured.cta')}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICE CATEGORIES */}
          <section style={styles.categories}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>{t('home.categories.title')}</h2>
              <p style={styles.sectionSub}>{t('home.categories.sub')}</p>
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
                    <a href="#" style={{...styles.catCta, color: cat.color}}>{t('home.categories.cta')} →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUICK ACCESS: CÓ NGAY BỘ CHUYỂN ĐỔI SỐ */}
          <section style={styles.quickSection}>
            <div style={styles.sectionInner}>
              <h2 style={styles.sectionTitle}>{t('home.quick.title')}</h2>
              <p style={styles.sectionSub}>{t('home.quick.sub')}</p>
              <div style={styles.quickGrid}>
                {QUICK_ACCESS.map((item, i) => (
                  <div key={i} style={styles.quickCard}>
                    <span style={styles.quickIcon}>{item.icon}</span>
                    <h3 style={styles.quickTitle}>{item.title}</h3>
                    <p style={styles.quickDesc}>{item.desc}</p>
                    <a href="#" style={styles.quickCta}>{t('home.quick.cta')} →</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section style={styles.whySection}>
            <div style={styles.sectionInner}>
              <h2 style={{...styles.sectionTitle, color: '#fff'}}>{t('home.why.title')}</h2>
              <p style={{...styles.sectionSub, color: '#94a3b8'}}>{t('home.why.sub')}</p>
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
              <h2 style={styles.sectionTitle}>{t('home.testimonials.title')}</h2>
              <p style={styles.sectionSub}>{t('home.testimonials.sub')}</p>
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



      {currentPage !== 'home' && (
        <SubPage
          pageKey={currentPage}
          onNavigate={handleNavigate}
          onDomainSearch={() => handleNavigate('dang-ky-ten-mien')}
          lang={lang}
          t={t}
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      )}

      <Footer />
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

};
