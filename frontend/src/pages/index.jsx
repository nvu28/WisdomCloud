import React, { useState } from 'react';
import DomainRegisterPage from './DomainRegisterPage';
import DomainPricePage from './DomainPricePage';
import DomainServicePage from './DomainServicePage';
import HostingPage from './HostingPage';
import EmailPage from './EmailPage';
import SslPage from './SslPage';
import { getSubPages, getCategoryNav, getCategoryFaqs, getWhyChoose } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const DOMAIN_SERVICE_PAGES = ['chuyen-ve', 'tim-ten-mien', 'mien-mien-phi', 'mien-tu-do', 'bao-mat-ten-mien', 'tien-ich-dns', 'chuyen-nhuong-ten-mien'];
const HOSTING_PAGES = ['web-hosting', 'wordpress', 'enterprise-hosting', 'chuyen-dung', 'cloud-server', 'vpc', 'dedicated-server', 'co-location'];
const EMAIL_PAGES = ['may-chu-email', 'google-workspace', 'microsoft-365', 'hybrid-email', 'chu-ky-email', 'chu-ky-so-email', 'quan-tri-email', 'bao-mat-email'];
const SSL_PAGES = ['sectigo', 'sectigo-comodo', 'rapid-geotrust', 'digicert', 'thawte', 'bao-mat-website', 'cloudbric-waf'];

function ServiceSubMenu({ category, currentPage, onNavigate, lang }) {
  const nav = getCategoryNav(lang)[category];
  if (!nav) return null;
  return (
    <nav style={styles.subNav}>
      <div style={sectionInner}>
        <div style={styles.subNavInner}>
          <span style={styles.subNavTitle}>{nav.title}</span>
          {nav.items.map((item, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
              style={item.page === currentPage ? styles.subNavActive : styles.subNavLink}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function GenericHero({ p, t }) {
  return (
    <section style={{ ...styles.genHero, borderBottom: '1px solid #e8e8e8' }}>
      <div style={sectionInner}>
        <div style={styles.genHeroInner}>
          <div style={styles.genBadge}>{(t && t('common.service')) || 'DỊCH VỤ'}</div>
          <h1 style={styles.genTitle}>{p.title}</h1>
          <p style={styles.genDesc}>{p.desc}</p>
        </div>
      </div>
    </section>
  );
}

function FeatureList({ features, color, t }) {
  const icons = ['🌐', '🛡️', '⚡', '💾', '🔧', '📧'];
  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div style={sectionInner}>
        <h2 style={styles.sectionTitle}>{(t && t('subpage.features')) || 'TÍNH NĂNG DỊCH VỤ'}</h2>
        <div style={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <span style={{ ...styles.featureIcon, background: color + '12', color }}>
                {icons[i % 6]}
              </span>
              <p style={styles.featureText}>{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceBar({ price, color, t }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 0 50px', background: '#fff' }}>
      <div style={sectionInner}>
        <div style={{ ...styles.priceBar, borderColor: color + '30' }}>
          <span style={{ ...styles.priceText, color }}>{price}</span>
          <a href="#" style={{ ...styles.priceBtn, background: color }}>{(t && t('common.registerNow')) || 'Đăng ký ngay'}</a>
        </div>
      </div>
    </div>
  );
}

function PricingCards({ plans, color, t }) {
  return (
    <section style={{ padding: '0 0 50px', background: '#fff' }}>
      <div style={sectionInner}>
        <h2 style={styles.sectionTitle}>{(t && t('subpage.pricing')) || 'BẢNG GIÁ DỊCH VỤ'}</h2>
        <div style={styles.plansGrid}>
          {plans.map((pl, i) => (
            <div key={i} style={{
              ...styles.planCard,
              ...(pl.popular ? styles.planCardPopular : {}),
            }}>
              {pl.popular && <div style={styles.planBadge}>{(t && t('common.popular')) || 'PHỔ BIẾN'}</div>}
              <h3 style={styles.planName}>{pl.name}</h3>
              <div style={styles.planPrice}>{pl.price}</div>
              <ul style={styles.planFeatures}>
                {pl.features.map((f, j) => (
                  <li key={j} style={styles.planFeature}>
                    <span style={{ color, marginRight: 8 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{ ...styles.planCta, background: color }}>Đăng ký ngay</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenericPlans({ plans, color, t }) {
  return (
    <section style={{ padding: '0 0 50px', background: '#fff' }}>
      <div style={sectionInner}>
        <h2 style={styles.sectionTitle}>{(t && t('subpage.pricing')) || 'BẢNG GIÁ'}</h2>
        <div style={styles.plansSimple}>
          {plans.map((pl, i) => (
            <div key={i} style={styles.planSimple}>
              <div style={{ fontSize: 18, fontWeight: 800, color }}>{pl.name}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', margin: '8px 0' }}>{pl.price}</div>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>{pl.note}</div>
              <a href="#" style={{ fontSize: 13, color, fontWeight: 600, textDecoration: 'none' }}>{(t && t('common.register')) || 'Đăng ký'} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs({ lang }) {
  const items = getWhyChoose(lang);
  return (
    <section style={{ padding: '50px 0', background: '#f8fafc' }}>
      <div style={sectionInner}>
        <h2 style={styles.sectionTitle}>{(lang === 'en' ? 'WHY CHOOSE WISDOMCLOUD' : 'VÌ SAO CHỌN WISDOMCLOUD')}</h2>
        <div style={styles.whyGrid}>
          {items.map((w, i) => (
            <div key={i} style={styles.whyCard}>
              <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>{w.icon}</span>
              <h3 style={styles.whyTitle}>{w.title}</h3>
              <p style={styles.whyDesc}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs, lang }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div style={sectionInner}>
        <h2 style={styles.sectionTitle}>{(lang === 'en' ? 'FAQ' : 'Câu hỏi thường gặp')}</h2>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  width: '100%', padding: '14px 0', border: 'none',
                  background: 'none', cursor: 'pointer', fontSize: 14,
                  fontWeight: 500, color: expanded === i ? '#dd1b5c' : '#1e293b',
                  display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{faq.q}</span>
                <span style={{
                  color: '#aaa', fontSize: 11,
                  transform: expanded === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>▼</span>
              </button>
              <div style={{
                maxHeight: expanded === i ? '300px' : '0',
                opacity: expanded === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0, padding: '0 0 16px' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PageRouter({ pageKey, onNavigate, onDomainSearch, lang, t }) {
  if (pageKey === 'dang-ky-ten-mien') {
    return <DomainRegisterPage onNavigate={onNavigate} onDomainSearch={onDomainSearch} lang={lang} t={t} />;
  }

  if (pageKey === 'bang-gia-ten-mien') {
    return <DomainPricePage onNavigate={onNavigate} lang={lang} t={t} />;
  }

  if (DOMAIN_SERVICE_PAGES.includes(pageKey)) {
    return <DomainServicePage pageKey={pageKey} onNavigate={onNavigate} lang={lang} t={t} />;
  }

  if (HOSTING_PAGES.includes(pageKey)) {
    return <HostingPage pageKey={pageKey} onNavigate={onNavigate} lang={lang} t={t} />;
  }

  if (EMAIL_PAGES.includes(pageKey)) {
    return <EmailPage pageKey={pageKey} onNavigate={onNavigate} lang={lang} t={t} />;
  }

  if (SSL_PAGES.includes(pageKey)) {
    return <SslPage pageKey={pageKey} onNavigate={onNavigate} lang={lang} t={t} />;
  }

  const p = getSubPages(lang)[pageKey];
  if (!p) return null;

  const faqs = getCategoryFaqs(lang)[p.category];

  return (
    <div>
      <ServiceSubMenu category={p.category} currentPage={pageKey} onNavigate={onNavigate} lang={lang} />
      <GenericHero p={p} t={t} />

      {p.features && <FeatureList features={p.features} color={p.color} t={t} />}
      {p.price && !p.plans && <PriceBar price={p.price} color={p.color} t={t} />}

      {p.content?.type === 'pricing-cards' && p.content.plans && (
        <PricingCards plans={p.content.plans} color={p.color} t={t} />
      )}

      {p.plans && !p.content && (
        <GenericPlans plans={p.plans} color={p.color} t={t} />
      )}

      <WhyChooseUs lang={lang} />

      {faqs && <FAQSection faqs={faqs} lang={lang} />}
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
  subNavActive: {
    padding: '6px 14px', fontSize: 13, color: '#fff',
    background: '#2563eb', borderRadius: 6, textDecoration: 'none',
    whiteSpace: 'nowrap', fontWeight: 600,
  },

  genHero: { padding: '40px 0', background: '#f8fafc' },
  genHeroInner: { textAlign: 'center' },
  genBadge: {
    fontSize: 12, fontWeight: 700, color: '#888',
    textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8,
  },
  genTitle: { fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  genDesc: { fontSize: 15, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 },

  sectionTitle: {
    fontSize: 22, fontWeight: 800, color: '#1e293b',
    textAlign: 'center', margin: '0 0 28px', textTransform: 'uppercase',
  },

  featureGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
  },
  featureCard: {
    display: 'flex', gap: 16, alignItems: 'flex-start',
    background: '#fff', padding: 20, borderRadius: 10,
    border: '1px solid #f1f5f9',
  },
  featureIcon: {
    width: 44, height: 44, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    fontSize: 20,
  },
  featureText: { fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.5 },

  priceBar: {
    padding: '16px 24px', background: '#f8fafc', borderRadius: 12,
    border: '1px solid', display: 'inline-flex', alignItems: 'center', gap: 20,
  },
  priceText: { fontSize: 18, fontWeight: 800 },
  priceBtn: {
    padding: '10px 24px', color: '#fff', borderRadius: 8,
    fontSize: 14, fontWeight: 600, textDecoration: 'none',
  },

  plansGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
  },
  planCard: {
    background: '#fff', borderRadius: 12, padding: 28,
    border: '1px solid #e2e8f0', textAlign: 'center',
    position: 'relative', display: 'flex', flexDirection: 'column', gap: 12,
  },
  planCardPopular: {
    border: '2px solid #2563eb',
    boxShadow: '0 4px 24px rgba(37,99,235,0.12)',
    transform: 'scale(1.02)',
  },
  planBadge: {
    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
    background: '#2563eb', color: '#fff', fontSize: 11, fontWeight: 700,
    padding: '4px 16px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1,
  },
  planName: { fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 },
  planPrice: { fontSize: 22, fontWeight: 800, color: '#1e293b' },
  planFeatures: { listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', flex: 1 },
  planFeature: {
    fontSize: 13, color: '#475569', padding: '6px 0',
    borderBottom: '1px solid #f8fafc',
  },
  planCta: {
    padding: '12px 24px', color: '#fff', borderRadius: 8,
    fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8,
  },

  plansSimple: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
  },
  planSimple: {
    background: '#fff', borderRadius: 12, padding: 20,
    border: '1px solid #e2e8f0', textAlign: 'center',
  },

  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  whyCard: {
    background: '#fff', borderRadius: 12, padding: 28,
    textAlign: 'center', border: '1px solid #f1f5f9',
  },
  whyTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: '#1e293b' },
  whyDesc: { fontSize: 13, color: '#666', lineHeight: 1.5, margin: 0 },
};
