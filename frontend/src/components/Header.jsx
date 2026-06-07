import React, { useState } from 'react';

const MENU_ITEMS = [
  {
    label: 'Tên miền',
    href: '#',
    columns: [
      {
        title: 'TÊN MIỀN',
        items: [
          { label: 'Đăng Ký Tên Miền', desc: 'Đừng kinh doanh khi chưa có tên miền' },
          { label: 'Bảng Giá Tên Miền', desc: 'Giá & thông tin các loại tên miền' },
          { label: 'Chuyển Về', desc: 'Chuyển tên miền từ nơi khác về' },
          { label: 'Tìm Tên Miền', desc: 'Khám phá thế giới tên miền' },
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
    href: '#',
    columns: [
      {
        title: 'HOSTING',
        items: [
          { label: 'Web Hosting', desc: 'Hosting chuyên nghiệp, hiệu suất vượt trội' },
          { label: 'WordPress', desc: 'Thiết kế đặc biệt tối ưu tốc độ' },
          { label: 'Enterprise Hosting', desc: 'Chuẩn doanh nghiệp, tốc độ cao' },
        ],
      },
      {
        title: 'SERVER',
        items: [
          { label: 'Cloud Server', desc: 'Hiệu suất cao dễ dàng mở rộng' },
          { label: 'VPS', desc: 'Virtual Private Server' },
          { label: 'Dedicated Server', desc: 'Phần cứng chính hãng' },
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
    href: '#',
    columns: [
      {
        title: 'EMAIL SERVER',
        items: [
          { label: 'Máy Chủ Email Doanh Nghiệp', desc: 'Đáp ứng nhu cầu phức tạp nhất' },
          { label: 'Google Workspace', desc: 'Email và các ứng dụng làm việc nhóm' },
          { label: 'Microsoft 365', desc: 'Email và làm việc nhóm trực tuyến' },
        ],
      },
      {
        title: 'DỊCH VỤ',
        items: [
          { label: 'Chữ Ký Email', desc: '' },
          { label: 'Chữ Ký Số Email', desc: '' },
          { label: 'Quản Trị Email Server', desc: '' },
          { label: 'Bảo Mật Email', desc: '' },
        ],
      },
    ],
  },
  {
    label: 'Cloud',
    href: '#',
    active: true,
    columns: [
      {
        title: 'CLOUD SERVER',
        items: [
          { label: 'Cloud Server P.A', desc: 'Intel Xeon, Unlimited bandwidth' },
          { label: 'Cloud Server Pro', desc: 'Intel Xeon Silver, hiệu suất cao' },
          { label: 'Cloud Server Super', desc: 'Intel Xeon Platinum, cao cấp' },
        ],
      },
      {
        title: 'CLOUD EMAIL',
        items: [
          { label: 'Email Doanh Nghiệp Nhỏ', desc: '5-10 tài khoản' },
          { label: 'Email Doanh Nghiệp Vừa', desc: '50-100 tài khoản' },
          { label: 'Email Doanh Nghiệp Lớn', desc: '200-1000 tài khoản' },
        ],
      },
      {
        title: 'CLOUD SECURITY',
        items: [
          { label: 'Bảo Mật Website', desc: 'Tường lửa bảo vệ Web' },
          { label: 'CloudBric WAF', desc: 'Bảo vệ website khỏi DDoS' },
          { label: 'SSL Certificate', desc: 'Chứng chỉ bảo mật' },
        ],
      },
    ],
  },
  {
    label: 'Security',
    href: '#',
    columns: [
      {
        title: 'CHỨNG CHỈ SSL',
        items: [
          { label: 'Sectigo', desc: 'Tiêu chuẩn cao cấp nhất' },
          { label: 'Rapid & Geotrust', desc: 'Chứng chỉ bảo mật chất lượng' },
          { label: 'Digicert', desc: 'Chứng chỉ bảo mật cao cấp' },
        ],
      },
      {
        title: 'BẢO MẬT',
        items: [
          { label: 'Bảo Mật Website', desc: 'Tường lửa bảo vệ Web' },
          { label: 'CloudBric WAF', desc: 'Bảo vệ website hạn chế DDoS' },
          { label: 'Imunify360', desc: 'Tường lửa web, hạn chế mã độc' },
        ],
      },
    ],
  },
  {
    label: 'Liên hệ',
    href: '#',
    columns: [],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        <div style={styles.topInner}>
          <div style={styles.topLeft}>
            <span style={styles.topItem}>Hỗ trợ: 1900 1234</span>
            <span style={styles.topDivider}>|</span>
            <span style={styles.topItem}>Email: support@cloudservices.vn</span>
          </div>
          <div style={styles.topRight}>
            <a href="#" style={styles.topLink}>Đăng nhập</a>
            <a href="#" style={styles.topLink}>Đăng ký</a>
          </div>
        </div>
      </div>
      <div style={styles.mainBar}>
        <div style={styles.mainInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>☁️</span>
            <div>
              <div style={styles.logoName}>CLOUD SERVICES</div>
              <div style={styles.logoSub}>Giải pháp Cloud toàn diện</div>
            </div>
          </div>
          <nav style={styles.nav}>
            {MENU_ITEMS.map((item, i) => (
              <div
                key={i}
                style={styles.navItem}
                onMouseEnter={() => item.columns.length > 0 && setOpenMenu(i)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  style={{
                    ...styles.navLink,
                    ...(item.active ? styles.navActive : {}),
                  }}
                >
                  {item.label}
                  {item.columns.length > 0 && <span style={styles.arrow}>▾</span>}
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
        </div>
      </div>
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
  topLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: 500,
  },
  mainBar: {
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
  },
  mainInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },
  logoIcon: { fontSize: 32 },
  logoName: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1e293b',
    letterSpacing: 1,
  },
  logoSub: {
    fontSize: 11,
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  nav: { display: 'flex', gap: 4, height: '100%' },
  navItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
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
  },
  navActive: {
    color: '#2563eb',
    borderBottomColor: '#2563eb',
  },
  arrow: { fontSize: 10, color: '#94a3b8' },
  megaMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: '#fff',
    borderTop: '1px solid #e2e8f0',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    zIndex: 100,
    minWidth: 600,
  },
  megaInner: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 0,
    padding: 24,
  },
  megaCol: {
    borderRight: '1px solid #f1f5f9',
    padding: '0 20px',
  },
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
  megaLink: {
    display: 'block',
    padding: '8px 0',
    textDecoration: 'none',
    borderBottom: '1px solid #f8fafc',
  },
  megaLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1e293b',
  },
  megaDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
};
