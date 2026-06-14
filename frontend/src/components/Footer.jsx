import React from 'react';
import logo from '../assets/logo.jpg';
import { useTranslation } from '../i18n';

const FOOTER_KEYS = [
  { titleKey: 'footer.services', itemKeys: 'footer.serviceItems' },
  { titleKey: 'footer.solutions', itemKeys: 'footer.solutionItems' },
  { titleKey: 'footer.support', itemKeys: 'footer.supportItems' },
  { titleKey: 'footer.about', itemKeys: 'footer.aboutItems' },
];

export default function Footer() {
  const { t } = useTranslation();

  const FOOTER_COLS = FOOTER_KEYS.map(col => ({
    title: t(col.titleKey),
    items: t(col.itemKeys),
  }));
  return (
    <footer style={styles.footer}>
      <div style={styles.main}>
        <div style={styles.inner}>
          <div style={styles.brandCol}>
            <div style={styles.logo}>
              <img src={logo} alt="WisdomCloud" style={styles.logoImg} />
              <div>
                <div style={styles.logoName}>WISDOMCLOUD</div>
                <div style={styles.logoSub}>Nền tảng dịch vụ số toàn diện</div>
              </div>
            </div>
            <p style={styles.brandDesc}>{t('footer.brandDesc')}</p>
            <div style={styles.contact}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <span>1900 1234</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <span>support@cloudservices.vn</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>
          {FOOTER_COLS.map((col, i) => (
            <div key={i} style={styles.col}>
              <div style={styles.colTitle}>{col.title}</div>
              {col.items.map((item, j) => (
                <a key={j} href="#" style={styles.colLink}>{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.bottom}>
        <div style={styles.bottomInner}>
          <p style={styles.copyright}>
            &copy; 2026 WisdomCloud. {t('footer.copyright')}
          </p>
          <div style={styles.social}>
            <a href="#" style={styles.socialLink}>Facebook</a>
            <a href="#" style={styles.socialLink}>YouTube</a>
            <a href="#" style={styles.socialLink}>Zalo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    fontFamily: "'Inter', sans-serif",
    background: '#0f172a',
    color: '#cbd5e1',
    marginTop: 60,
  },
  main: {
    padding: '48px 24px 32px',
    borderBottom: '1px solid #1e293b',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
    gap: 32,
  },
  brandCol: {},
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  logoIcon: { fontSize: 28 },
  logoImg: { width: 32, height: 32, borderRadius: 6, objectFit: 'contain' },
  logoName: {
    fontSize: 16,
    fontWeight: 800,
    color: '#f1f5f9',
    letterSpacing: 1,
  },
  logoSub: { fontSize: 11, color: '#64748b' },
  brandDesc: {
    fontSize: 13,
    lineHeight: 1.7,
    color: '#94a3b8',
    marginBottom: 20,
  },
  contact: { display: 'flex', flexDirection: 'column', gap: 8 },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
    color: '#94a3b8',
  },
  contactIcon: { fontSize: 14 },
  col: {},
  colTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#f1f5f9',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colLink: {
    display: 'block',
    padding: '4px 0',
    fontSize: 13,
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: { padding: '20px 24px' },
  bottomInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 13,
  },
  copyright: { color: '#64748b', margin: 0 },
  social: { display: 'flex', gap: 16 },
  socialLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontWeight: 500,
  },
};
