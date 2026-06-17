import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n';

const MENU_CONFIG = [
  {
    key: 'domains',
    page: null,
    columns: [
      {
        titleKey: 'header.domainRegister',
        items: [
          { labelKey: 'header.domainRegister', descKey: 'header.domainRegisterDesc', page: 'dang-ky-ten-mien' },
          { labelKey: 'header.domainPrice', descKey: 'header.domainPriceDesc', page: 'bang-gia-ten-mien' },
          { labelKey: 'header.domainTransfer', descKey: 'header.domainTransferDesc', page: 'chuyen-ve' },
          { labelKey: 'header.domainSearch', descKey: 'header.domainSearchDesc', page: 'tim-ten-mien' },
          { labelKey: 'header.domainFree', descKey: 'header.domainFreeDesc', page: 'mien-mien-phi' },
          { labelKey: 'header.domainExpired', descKey: 'header.domainExpiredDesc', page: 'mien-tu-do' },
        ],
      },
      {
        titleKey: 'common.support',
        items: [
          { labelKey: 'header.domainSecurity', descKey: 'header.domainSecurityDesc', page: 'bao-mat-ten-mien' },
          { labelKey: 'header.domainDns', descKey: 'header.domainDnsDesc', page: 'tien-ich-dns' },
          { labelKey: 'header.domainTransferService', descKey: 'header.domainTransferServiceDesc', page: 'chuyen-nhuong-ten-mien' },
        ],
      },
    ],
  },
  {
    key: 'webHosting',
    page: null,
    columns: [
      {
        titleKey: 'categoryNav.hosting.title',
        items: [
          { labelKey: 'header.hosting', descKey: 'header.hostingDesc', page: 'web-hosting' },
          { labelKey: 'header.wordpress', descKey: 'header.wordpressDesc', page: 'wordpress' },
          { labelKey: 'header.enterpriseHosting', descKey: 'header.enterpriseHostingDesc', page: 'enterprise-hosting' },
          { labelKey: 'header.dedicatedHosting', descKey: 'header.dedicatedHostingDesc', page: 'chuyen-dung' },
        ],
      },
      {
        titleKey: 'header.cloudServer',
        items: [
          { labelKey: 'header.cloudServer', descKey: 'header.cloudServerDesc', page: 'cloud-server' },
          { labelKey: 'header.vpc', descKey: 'header.vpcDesc', page: 'vpc' },
          { labelKey: 'header.dedicatedServer', descKey: 'header.dedicatedServerDesc', page: 'dedicated-server' },
          { labelKey: 'header.colocation', descKey: 'header.colocationDesc', page: 'co-location' },
        ],
      },
      {
        titleKey: 'common.viewMore',
        items: [
          { labelKey: 'header.quickWebsite', descKey: 'header.quickWebsiteDesc', page: 'tao-website-nhanh' },
          { labelKey: 'header.websiteCare', descKey: 'header.websiteCareDesc', page: 'cham-soc-website' },
        ],
      },
      {
        titleKey: 'common.wisdomcloud',
        items: [
          { labelKey: 'header.cdn', descKey: 'header.cdnDesc', page: 'cdn' },
          { labelKey: 'header.cloudDrive', descKey: 'header.cloudDriveDesc', page: 'cloud-drive' },
          { labelKey: 'header.backup', descKey: 'header.backupDesc', page: 'backup-luu-tru' },
        ],
      },
    ],
  },
  {
    key: 'email',
    page: null,
    columns: [
      {
        titleKey: 'header.emailServer',
        items: [
          { labelKey: 'header.emailServer', descKey: 'header.emailServerDesc', page: 'may-chu-email' },
          { labelKey: 'header.googleWorkspace', descKey: 'header.googleWorkspaceDesc', page: 'google-workspace' },
          { labelKey: 'header.microsoft365', descKey: 'header.microsoft365Desc', page: 'microsoft-365' },
          { labelKey: 'header.hybridEmail', descKey: 'header.hybridEmailDesc', page: 'hybrid-email' },
        ],
      },
      {
        titleKey: 'common.wisdomcloud',
        items: [
          { labelKey: 'header.emailSignature', descKey: 'header.emailSignatureDesc', page: 'chu-ky-email' },
          { labelKey: 'header.emailDigitalSignature', descKey: 'header.emailDigitalSignatureDesc', page: 'chu-ky-so-email' },
          { labelKey: 'header.emailAdmin', descKey: 'header.emailAdminDesc', page: 'quan-tri-email' },
          { labelKey: 'header.emailSecurity', descKey: 'header.emailSecurityDesc', page: 'bao-mat-email' },
        ],
      },
    ],
  },
  {
    key: 'sslSecurity',
    page: null,
    columns: [
      {
        titleKey: 'common.wisdomcloud',
        items: [
          { labelKey: 'header.sectigo', descKey: 'header.sectigoDesc', page: 'sectigo' },
          { labelKey: 'header.sectigoComodo', descKey: 'header.sectigoComodoDesc', page: 'sectigo-comodo' },
          { labelKey: 'header.rapidGeotrust', descKey: 'header.rapidGeotrustDesc', page: 'rapid-geotrust' },
          { labelKey: 'header.digicert', descKey: 'header.digicertDesc', page: 'digicert' },
          { labelKey: 'header.thawte', descKey: 'header.thawteDesc', page: 'thawte' },
        ],
      },
      {
        titleKey: 'common.wisdomcloud',
        items: [
          { labelKey: 'header.websiteSecurity', descKey: 'header.websiteSecurityDesc', page: 'bao-mat-website' },
          { labelKey: 'header.cloudbric', descKey: 'header.cloudbricDesc', page: 'cloudbric-waf' },
        ],
      },
    ],
  },

];

export default function Header({ onNavigate, currentPage, user, onLogout }) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(null);

  const MENU_ITEMS = MENU_CONFIG.map(cfg => ({
    label: t(`header.${cfg.key}`),
    page: cfg.page,
    columns: cfg.columns.map(col => ({
      title: t(col.titleKey),
      items: col.items.map(item => ({
        label: t(item.labelKey),
        desc: t(item.descKey),
        page: item.page,
      })),
    })),
  }));

  const handleToggle = (i, e) => {
    e.preventDefault();
    setOpenMenu(openMenu === i ? null : i);
  };

  const handleNavClick = (item, e) => {
    if (item.columns.length > 0) {
      handleToggle(MENU_ITEMS.indexOf(item), e);
    } else if (item.page && onNavigate) {
      e.preventDefault();
      onNavigate(item.page);
      setOpenMenu(null);
    }
  };

  const handleBackdrop = () => {
    setOpenMenu(null);
  };

  const isActive = (item) => {
    return currentPage && item.page && currentPage === item.page;
  };

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        <div style={styles.topInner}>
          <div style={styles.topLeft}>
            <span style={styles.topItem}>{t('common.support')}: 1900 1234</span>
            <span style={styles.topDivider}>|</span>
            <span style={styles.topItem}>{t('common.email')}: support@wisdomcloud.vn</span>
          </div>
          <div style={styles.topRight}>
            {user ? (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('ho-so'); }} style={styles.topLink}>{user.fullName}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onLogout && onLogout(); }} style={styles.topLink}>{t('common.logout')}</a>
              </>
            ) : (
              <>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('dang-nhap'); }} style={styles.topLink}>{t('common.login')}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('dang-ky'); }} style={styles.topLink}>{t('common.register')}</a>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div style={styles.mainBar}>
        <div style={styles.mainInner}>
          <div style={styles.logo} onClick={() => onNavigate && onNavigate('home')}>
            <img src={logo} alt="WisdomCloud" style={styles.logoImg} />
            <div>
              <div style={styles.logoName}>WISDOMCLOUD</div>
              <div style={styles.logoSub}>{t('common.subtitle')}</div>
            </div>
          </div>
          <nav style={styles.nav}>
            {MENU_ITEMS.map((item, i) => (
              <div key={i} style={styles.navItem}>
                <a
                  href={item.page ? `/${item.page}` : '#'}
                  onClick={(e) => handleNavClick(item, e)}
                  style={{
                    ...styles.navLink,
                    ...(isActive(item) ? styles.navActive : {}),
                  }}
                >
                  {item.label}
                  {item.columns.length > 0 && (
                    <span style={{...styles.arrow, transform: openMenu === i ? 'rotate(180deg)' : 'none'}}>▾</span>
                  )}
                </a>
                {openMenu === i && item.columns.length > 0 && (
                  <div style={styles.megaMenu}>
                    <div style={styles.megaInner}>
                      {item.columns.map((col, j) => (
                        <div key={j} style={styles.megaCol}>
                          <div style={styles.megaTitle}>{col.title}</div>
                          {col.items.map((link, k) => (
                            <a key={k} href="#" onClick={(e) => { e.preventDefault(); if (onNavigate && link.page) { onNavigate(link.page); setOpenMenu(null); }}} style={styles.megaLink}>
                              <div style={styles.megaLabel}>{link.label}</div>
                              {link.desc && <div style={styles.megaDesc}>{link.desc}</div>}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
            <a href="#" style={styles.promoBtn}>
              <span style={styles.promoDot}>🔥</span>
              {t('common.promoFlash')}
            </a>
        </div>
      </div>
      {openMenu !== null && <div style={styles.backdrop} onClick={handleBackdrop} />}
      <style>{`
        @keyframes promoPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(220,38,38,0.3); transform: scale(1); }
          50% { box-shadow: 0 0 30px rgba(220,38,38,0.6); transform: scale(1.05); }
        }
      `}</style>
    </header>
  );
}

const styles = {
  header: {
    fontFamily: "'Inter', sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topBar: {
    background: '#1e293b',
    color: '#94a3b8',
    fontSize: 13,
    borderBottom: '1px solid #334155',
  },
  topInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  topRight: { display: 'flex', gap: 16, alignItems: 'center' },
  topItem: { color: '#94a3b8' },
  topDivider: { color: '#475569' },
  topLink: { color: '#94a3b8', textDecoration: 'none', fontWeight: 500 },
  mainBar: { background: '#fff', borderBottom: '1px solid #e2e8f0' },
  mainInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
  logoIcon: { fontSize: 32 },
  logoImg: { width: 36, height: 36, borderRadius: 8, objectFit: 'contain' },
  logoName: { fontSize: 18, fontWeight: 800, color: '#1e293b', letterSpacing: 1 },
  logoSub: { fontSize: 11, color: '#94a3b8', letterSpacing: 0.5 },
  nav: { display: 'flex', gap: 4, height: '100%', marginLeft: 200 },
  navItem: { position: 'static', display: 'flex', alignItems: 'center' },
  navLink: {
    padding: '0 16px',
    textDecoration: 'none',
    color: '#475569',
    fontSize: 14,
    fontWeight: 600,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    borderBottom: '3px solid transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  navActive: { color: '#2563eb', borderBottomColor: '#2563eb' },
  arrow: { fontSize: 10, color: '#94a3b8', transition: 'transform 0.2s' },
  megaMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    borderTop: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    zIndex: 1001,
    minWidth: 700,
  },
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  megaInner: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 0,
    padding: 24,
    textAlign: 'left',
  },
  megaCol: { borderRight: '1px solid #f1f5f9', padding: '0 20px' },
  megaTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#2563eb',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '2px solid #2563eb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  megaLink: { display: 'block', padding: '8px 0', textDecoration: 'none', borderBottom: '1px solid #f8fafc' },
  megaLabel: { fontSize: 14, fontWeight: 600, color: '#1e293b' },
  megaDesc: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  promoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 20px',
    background: 'linear-gradient(135deg, #dc2626, #ef4444)',
    color: '#fff',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    marginLeft: 12,
    boxShadow: '0 0 20px rgba(220,38,38,0.3)',
    animation: 'promoPulse 2s ease-in-out infinite',
  },
  promoDot: { fontSize: 16 },
};
