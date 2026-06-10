import React, { useState } from 'react';

const MENU_ITEMS = [
  {
    label: 'Tên miền',
    page: null,
    columns: [
      {
        title: 'TÊN MIỀN',
        items: [
          { label: 'Đăng Ký Tên Miền', desc: 'Đừng kinh doanh khi chưa có tên miền' },
          { label: 'Bảng Giá Tên Miền', desc: 'Giá & thông tin các loại tên miền' },
          { label: 'Chuyển Về', desc: 'Chuyển tên miền từ nơi khác về' },
          { label: 'Tìm Tên Miền', desc: 'Khám phá thế giới tên miền' },
          { label: 'Miền Miễn Phí', desc: 'Phù hợp mọi đối tượng, tiết kiệm chi phí' },
          { label: 'Miền Tự Do', desc: 'Tên miền .VN hết hạn có thể đăng ký' },
        ],
      },
      {
        title: 'DỊCH VỤ',
        items: [
          { label: 'Bảo Mật Tên Miền', desc: 'Bảo vệ an toàn tuyệt đối' },
          { label: 'Tiện Ích DNS', desc: 'Công cụ cần thiết và thiết yếu' },
          { label: 'Chuyển Nhượng Tên Miền', desc: 'Giao dịch an toàn và nhanh chóng' },
        ],
      },
    ],
  },
  {
    label: 'Web & Hosting',
    page: null,
    columns: [
      {
        title: 'HOSTING',
        items: [
          { label: 'Web Hosting', desc: 'Hosting chuyên nghiệp, hiệu suất vượt trội' },
          { label: 'WordPress', desc: 'Thiết kế đặc biệt tối ưu tốc độ' },
          { label: 'Enterprise Hosting', desc: 'Chuẩn doanh nghiệp, tốc độ cao' },
          { label: 'Chuyên Dụng', desc: 'NodeJS, Python, Java...' },
        ],
      },
      {
        title: 'SERVERs',
        items: [
          { label: 'Cloud Server', desc: 'Hiệu suất cao dễ dàng mở rộng' },
          { label: 'Virtual Private Cloud', desc: 'Hiệu suất cao dễ dàng mở rộng' },
          { label: 'Dedicated Server', desc: 'Phần cứng chính hãng' },
          { label: 'Co-Location', desc: 'Thuê chỗ đặt với chi phí tốt' },
        ],
      },
      {
        title: 'WEBSITE',
        items: [
          { label: 'Tạo Website Nhanh', desc: 'Có Web trong vài giây' },
          { label: 'Chăm Sóc Website', desc: 'Tận tâm chu đáo' },
        ],
      },
      {
        title: 'DỊCH VỤ',
        items: [
          { label: 'CDN', desc: 'Tăng tốc Web' },
          { label: 'Cloud Drive', desc: 'Lưu trữ dữ liệu' },
          { label: 'Backup & Lưu Trữ', desc: 'Giải pháp bảo vệ dữ liệu' },
        ],
      },
    ],
  },
  {
    label: 'Email',
    page: null,
    columns: [
      {
        title: 'EMAIL SERVER',
        items: [
          { label: 'Máy Chủ Email Doanh Nghiệp', desc: 'Đáp ứng nhu cầu phức tạp nhất' },
          { label: 'Google Workspace', desc: 'Email và các ứng dụng làm việc nhóm' },
          { label: 'Microsoft 365', desc: 'Email và làm việc nhóm trực tuyến' },
          { label: 'Hybrid Email', desc: 'Tối ưu chi phí đảm bảo chất lượng' },
        ],
      },
      {
        title: 'DỊCH VỤ',
        items: [
          { label: 'Chữ Ký Email', desc: '' },
          { label: 'Chữ Ký Số Email', desc: '' },
          { label: 'Quản Trị Email Server', desc: '' },
          { label: 'Bảo Mật & Bảo Vệ Email', desc: '' },
        ],
      },
    ],
  },
  {
    label: 'SSL & Bảo Mật',
    page: null,
    columns: [
      {
        title: 'CHỨNG CHỈ SỐ SSL',
        items: [
          { label: 'Sectigo', desc: 'Tiêu chuẩn cao cấp nhất' },
          { label: 'Sectigo Comodo', desc: 'Giá tốt từ thương hiệu Sectigo' },
          { label: 'Rapid & Geotrust', desc: 'Chứng chỉ bảo mật chất lượng' },
          { label: 'Digicert', desc: 'Chứng chỉ bảo mật cao cấp' },
          { label: 'Thawte', desc: 'Một sản phẩm thuộc Symantec' },
        ],
      },
      {
        title: 'BẢO MẬT',
        items: [
          { label: 'Bảo Mật Website', desc: 'Tường lửa bảo vệ Web' },
          { label: 'CloudBric WAF', desc: 'Bảo vệ website hạn chế DDoS' },
        ],
      },
    ],
  },
  {
    label: 'Cloud',
    page: 'cloud',
    columns: [],
  },
];

export default function Header({ onNavigate, currentPage }) {
  const [openMenu, setOpenMenu] = useState(null);

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
            <span style={styles.topItem}>Hỗ trợ: 1900 1234</span>
            <span style={styles.topDivider}>|</span>
            <span style={styles.topItem}>Email: support@wisdomcloud.vn</span>
          </div>
          <div style={styles.topRight}>
            <a href="#" style={styles.topLink}>Đăng nhập</a>
            <a href="#" style={styles.topLink}>Đăng ký</a>
          </div>
        </div>
      </div>
      <div style={styles.mainBar}>
        <div style={styles.mainInner}>
          <div style={styles.logo} onClick={() => onNavigate && onNavigate('home')}>
            <span style={styles.logoIcon}>☁️</span>
            <div>
              <div style={styles.logoName}>WISDOMCLOUD</div>
              <div style={styles.logoSub}>Nền tảng dịch vụ số toàn diện</div>
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
                            <a key={k} href="#" style={styles.megaLink}>
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
              Săn ngay ưu đãi
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
  topRight: { display: 'flex', gap: 16 },
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
  logoName: { fontSize: 18, fontWeight: 800, color: '#1e293b', letterSpacing: 1 },
  logoSub: { fontSize: 11, color: '#94a3b8', letterSpacing: 0.5 },
  nav: { display: 'flex', gap: 4, height: '100%' },
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
