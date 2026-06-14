import React, { useState } from 'react';
import { getCategoryNav, getSubPages } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const PROCESS_STEPS = {
  'chuyen-ve': [
    { icon: '🔑', title: 'Nhận EPP Code', desc: 'Yêu cầu mã EPP/AuthCode từ nhà cung cấp hiện tại' },
    { icon: '📝', title: 'Đăng ký chuyển về', desc: 'Điền thông tin tên miền và mã EPP tại WisdomCloud' },
    { icon: '📧', title: 'Xác thực email', desc: 'Xác nhận yêu cầu chuyển qua email của chủ sở hữu' },
    { icon: '✅', title: 'Hoàn tất', desc: 'Tên miền được chuyển về trong vòng 5-7 ngày' },
  ],
  'tim-ten-mien': [
    { icon: '🔍', title: 'Nhập tên miền', desc: 'Gõ tên miền mong muốn vào ô tìm kiếm' },
    { icon: '📊', title: 'Kiểm tra kết quả', desc: 'Xem tên miền còn trống hoặc đã có người đăng ký' },
    { icon: '💡', title: 'Xem gợi ý', desc: 'Nhận đề xuất tên miền thay thế nếu tên đã được đăng ký' },
    { icon: '🛒', title: 'Đăng ký ngay', desc: 'Chọn tên miền và tiến hành đăng ký' },
  ],
  'mien-mien-phi': [
    { icon: '📦', title: 'Chọn gói Hosting', desc: 'Chọn gói hosting phù hợp từ 12 tháng trở lên' },
    { icon: '🔍', title: 'Chọn tên miền', desc: 'Kiểm tra và chọn tên miền .com, .net hoặc .org' },
    { icon: '🎁', title: 'Nhận miễn phí', desc: 'Tên miền được tặng kèm, miễn phí năm đầu tiên' },
    { icon: '🚀', title: 'Kích hoạt', desc: 'Website của bạn sẵn sàng hoạt động' },
  ],
  'mien-tu-do': [
    { icon: '📋', title: 'Tra cứu danh sách', desc: 'Xem danh sách tên miền .VN hết hạn hàng ngày' },
    { icon: '🔍', title: 'Chọn tên miền', desc: 'Tìm tên miền phù hợp từ danh sách' },
    { icon: '🛒', title: 'Đăng ký trước', desc: 'Cạnh tranh hoặc mua ngay với giá ưu đãi' },
    { icon: '✅', title: 'Sở hữu', desc: 'Xác nhận và thanh toán, sở hữu tên miền' },
  ],
  'bao-mat-ten-mien': [
    { icon: '🔒', title: 'Khóa tên miền', desc: 'Kích hoạt tính năng khóa chống chuyển nhượng' },
    { icon: '🛡️', title: 'Bảo vệ WHOIS', desc: 'Ẩn thông tin cá nhân khỏi WHOIS lookup' },
    { icon: '📱', title: 'Bật 2FA', desc: 'Xác thực hai yếu tố khi thao tác quan trọng' },
    { icon: '🔄', title: 'Tự động gia hạn', desc: 'Tránh mất tên miền do quên gia hạn' },
  ],
  'tien-ich-dns': [
    { icon: '📋', title: 'Quản lý bản ghi', desc: 'Thêm/sửa/xóa bản ghi A, CNAME, MX, TXT' },
    { icon: '📐', title: 'DNS Template', desc: 'Tạo mẫu cấu hình áp dụng cho nhiều tên miền' },
    { icon: '🔀', title: 'Chuyển hướng', desc: 'URL forwarding, email forwarding' },
    { icon: '🔍', title: 'DNS Checker', desc: 'Kiểm tra phân giải DNS toàn cầu' },
  ],
  'chuyen-nhuong-ten-mien': [
    { icon: '💰', title: 'Thương lượng giá', desc: 'Thỏa thuận giá giữa bên bán và bên mua' },
    { icon: '📝', title: 'Ký hợp đồng', desc: 'WisdomCloud hỗ trợ soạn thảo và xác thực' },
    { icon: '🔄', title: 'Thực hiện chuyển', desc: 'Chuyển nhượng qua quy trình chuẩn ICANN' },
    { icon: '✅', title: 'Hoàn tất', desc: 'Tên miền thuộc về chủ sở hữu mới' },
  ],
};

const PROCESS_STEPS_EN = {
  'chuyen-ve': [
    { icon: '🔑', title: 'Get EPP Code', desc: 'Request EPP/AuthCode from current provider' },
    { icon: '📝', title: 'Register Transfer', desc: 'Enter domain info and EPP code at WisdomCloud' },
    { icon: '📧', title: 'Email Verification', desc: 'Confirm transfer request via owner email' },
    { icon: '✅', title: 'Complete', desc: 'Domain transferred within 5-7 days' },
  ],
  'tim-ten-mien': [
    { icon: '🔍', title: 'Enter Domain', desc: 'Type your desired domain name in the search box' },
    { icon: '📊', title: 'Check Results', desc: 'See if domain is available or already registered' },
    { icon: '💡', title: 'View Suggestions', desc: 'Get alternative domain suggestions if taken' },
    { icon: '🛒', title: 'Register Now', desc: 'Select domain and proceed to register' },
  ],
  'mien-mien-phi': [
    { icon: '📦', title: 'Choose Hosting Plan', desc: 'Select a hosting plan from 12 months or more' },
    { icon: '🔍', title: 'Select Domain', desc: 'Check and choose .com, .net or .org domain' },
    { icon: '🎁', title: 'Get Free Domain', desc: 'Free domain included, first year free' },
    { icon: '🚀', title: 'Activate', desc: 'Your website is ready to go live' },
  ],
  'mien-tu-do': [
    { icon: '📋', title: 'Browse List', desc: 'View daily expired .VN domain list' },
    { icon: '🔍', title: 'Select Domain', desc: 'Find a suitable domain from the list' },
    { icon: '🛒', title: 'Register Early', desc: 'Compete or buy instantly at promotional price' },
    { icon: '✅', title: 'Own It', desc: 'Confirm and pay to own the domain' },
  ],
  'bao-mat-ten-mien': [
    { icon: '🔒', title: 'Domain Lock', desc: 'Enable transfer lock protection' },
    { icon: '🛡️', title: 'WHOIS Protection', desc: 'Hide personal info from WHOIS lookup' },
    { icon: '📱', title: 'Enable 2FA', desc: 'Two-factor authentication for important operations' },
    { icon: '🔄', title: 'Auto-Renewal', desc: 'Avoid losing domain due to expired renewal' },
  ],
  'tien-ich-dns': [
    { icon: '📋', title: 'Manage Records', desc: 'Add/edit/delete A, CNAME, MX, TXT records' },
    { icon: '📐', title: 'DNS Template', desc: 'Create config templates for multiple domains' },
    { icon: '🔀', title: 'Forwarding', desc: 'URL forwarding, email forwarding' },
    { icon: '🔍', title: 'DNS Checker', desc: 'Check global DNS resolution' },
  ],
  'chuyen-nhuong-ten-mien': [
    { icon: '💰', title: 'Price Negotiation', desc: 'Agree on price between seller and buyer' },
    { icon: '📝', title: 'Sign Contract', desc: 'WisdomCloud assists with drafting and verification' },
    { icon: '🔄', title: 'Execute Transfer', desc: 'Transfer via standard ICANN process' },
    { icon: '✅', title: 'Complete', desc: 'Domain belongs to new owner' },
  ],
};

const SIDE_ARTICLES = {
  'chuyen-ve': {
    title: 'Lưu ý khi chuyển tên miền',
    items: [
      'Tên miền phải được đăng ký tối thiểu 60 ngày trước khi chuyển',
      'Mã EPP do nhà cung cấp cũ cấp, có hiệu lực 30 ngày',
      'Không thay đổi thông tin WHOIS trong 14 ngày trước khi chuyển',
      'Phí gia hạn thêm 1 năm được tính khi chuyển về',
    ],
  },
  'tim-ten-mien': {
    title: 'Mẹo chọn tên miền',
    items: [
      'Chọn tên miền ngắn gọn, dễ nhớ, dễ đánh vần',
      'Sử dụng từ khóa liên quan đến lĩnh vực kinh doanh',
      'Tránh dấu gạch ngang và ký tự đặc biệt',
      'Ưu tiên đuôi .com, .vn hoặc .com.vn',
    ],
  },
  'mien-mien-phi': {
    title: 'Điều kiện nhận tên miền miễn phí',
    items: [
      'Đăng ký gói Hosting từ 12 tháng trở lên',
      'Tên miền được tặng: .com, .net, .org (tùy gói)',
      'Miễn phí năm đầu tiên, gia hạn giá ưu đãi',
      'Kèm SSL cơ bản và email miễn phí',
    ],
  },
  'mien-tu-do': {
    title: 'Thông tin bổ sung',
    items: [
      'Tên miền .VN hết hạn thường có thời gian chờ 30 ngày',
      'Danh sách được cập nhật hàng ngày từ VNNIC',
      'Có thể đăng ký trực tiếp hoặc tham gia đấu giá',
      'Giá tùy thuộc vào độ hot của tên miền',
    ],
  },
  'bao-mat-ten-mien': {
    title: 'Các mối đe dọa thường gặp',
    items: [
      'Domain Hijacking: Chiếm quyền sở hữu tên miền',
      'DNS Spoofing: Giả mạo bản ghi DNS',
      'Social Engineering: Lừa đảo lấy thông tin tài khoản',
      'Phishing email: Email giả mạo yêu cầu xác nhận tên miền',
    ],
  },
  'tien-ich-dns': {
    title: 'Các loại bản ghi DNS',
    items: [
      'A Record: Ánh xạ tên miền đến địa chỉ IPv4',
      'CNAME: Bí danh tên miền đến tên miền khác',
      'MX Record: Định tuyến email đến máy chủ thư',
      'TXT Record: Xác thực SPF, DKIM, DMARC',
    ],
  },
  'chuyen-nhuong-ten-mien': {
    title: 'Quyền lợi khi chuyển nhượng',
    items: [
      'Hợp đồng chuyển nhượng có giá trị pháp lý',
      'WisdomCloud làm trung gian thanh toán an toàn',
      'Hỗ trợ tư vấn định giá tên miền chuyên nghiệp',
      'Bảo mật thông tin hai bên trong suốt quá trình',
    ],
  },
};

const SIDE_ARTICLES_EN = {
  'chuyen-ve': {
    title: 'Notes on Domain Transfer',
    items: [
      'Domain must be registered for at least 60 days before transfer',
      'EPP code issued by current provider, valid for 30 days',
      'Do not change WHOIS info 14 days before transfer',
      'One year renewal fee is charged when transferring in',
    ],
  },
  'tim-ten-mien': {
    title: 'Domain Selection Tips',
    items: [
      'Choose short, memorable, easy-to-spell domain names',
      'Use keywords related to your business field',
      'Avoid hyphens and special characters',
      'Prioritize .com, .vn or .com.vn extensions',
    ],
  },
  'mien-mien-phi': {
    title: 'Free Domain Conditions',
    items: [
      'Register a Hosting plan from 12 months or more',
      'Free domains: .com, .net, .org (depending on plan)',
      'First year free, renewal at promotional price',
      'Includes basic SSL and free email',
    ],
  },
  'mien-tu-do': {
    title: 'Additional Information',
    items: [
      'Expired .VN domains typically have a 30-day grace period',
      'List updated daily from VNNIC',
      'Can register directly or participate in auction',
      'Price depends on domain popularity',
    ],
  },
  'bao-mat-ten-mien': {
    title: 'Common Security Threats',
    items: [
      'Domain Hijacking: Taking over domain ownership',
      'DNS Spoofing: Fake DNS records',
      'Social Engineering: Account info fraud',
      'Phishing email: Fake domain confirmation emails',
    ],
  },
  'tien-ich-dns': {
    title: 'DNS Record Types',
    items: [
      'A Record: Maps domain to IPv4 address',
      'CNAME: Domain alias to another domain',
      'MX Record: Routes email to mail server',
      'TXT Record: SPF, DKIM, DMARC authentication',
    ],
  },
  'chuyen-nhuong-ten-mien': {
    title: 'Transfer Benefits',
    items: [
      'Legally binding transfer contract',
      'WisdomCloud acts as secure payment intermediary',
      'Professional domain valuation consulting',
      'Confidentiality for both parties throughout process',
    ],
  },
};

export default function DomainServicePage({ pageKey, onNavigate, lang }) {
  const p = getSubPages(lang)[pageKey];
  const nav = getCategoryNav(lang)['domain'];
  const steps = lang === 'en' ? (PROCESS_STEPS_EN[pageKey] || []) : (PROCESS_STEPS[pageKey] || []);
  const article = lang === 'en' ? SIDE_ARTICLES_EN[pageKey] : SIDE_ARTICLES[pageKey];
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div>
      {/* SUB-NAV */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>{lang === 'en' ? 'DOMAINS' : 'TÊN MIỀN'}</span>
            {nav.items.map((item, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate(item.page); }}
                style={item.page === pageKey ? styles.snActive : styles.snLink}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ ...styles.hero, background: p.bg || '#f8fafc' }}>
        <div style={sectionInner}>
          <div style={styles.heroInner}>
            <span style={{ fontSize: 52, display: 'block', marginBottom: 6 }}>{p.icon}</span>
            <div style={styles.heroBadge}>{lang === 'en' ? 'DOMAIN SERVICES' : 'DỊCH VỤ TÊN MIỀN'}</div>
            <h1 style={styles.heroTitle}>{p.title}</h1>
            <p style={styles.heroDesc}>{p.desc}</p>
            <div style={{ fontSize: 18, fontWeight: 700, color: p.color, marginBottom: 20 }}>{p.price}</div>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dang-ky-ten-mien'); }} style={styles.heroCta}>
              {lang === 'en' ? 'Register Now →' : 'Đăng ký ngay →'}
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>{lang === 'en' ? 'KEY FEATURES' : 'TÍNH NĂNG CHÍNH'}</h2>
          <div style={styles.featGrid}>
            {p.features.map((f, i) => (
              <div key={i} style={styles.featCard}>
                <span style={styles.featNum}>0{i + 1}</span>
                <div>
                  <h4 style={styles.featTitle}>
                    {f.includes(' — ') ? f.split(' — ')[0] : f.includes(', ') ? f.split(', ')[0] : f}
                  </h4>
                  <p style={styles.featDesc}>
                    {f.includes(' — ') ? f.split(' — ').slice(1).join(' — ') : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      {steps.length > 0 && (
        <section style={{ padding: '50px 0', background: '#f8fafc' }}>
          <div style={sectionInner}>
            <h2 style={styles.sectionTitle}>{lang === 'en' ? 'HOW IT WORKS' : 'QUY TRÌNH THỰC HIỆN'}</h2>
            <div style={styles.stepsGrid}>
              {steps.map((s, i) => (
                <div key={i} style={styles.stepCard}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>{s.icon}</span>
                  <h4 style={styles.stepTitle}>{s.title}</h4>
                  <p style={styles.stepDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SIDE ARTICLE + RELATED SERVICES */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={{ ...sectionInner, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {article && (
            <div style={{ background: p.bg, borderRadius: 12, padding: 28, border: '1px solid #e8e8e8' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>{article.title}</h3>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {article.items.map((item, i) => (
                  <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 14, color: '#475569', display: 'flex', gap: 10 }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e8e8e8' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', margin: '0 0 16px' }}>{lang === 'en' ? 'RELATED SERVICES' : 'DỊCH VỤ LIÊN QUAN'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {nav.items.filter(n => n.page !== pageKey).slice(0, 5).map((n, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => { e.preventDefault(); onNavigate(n.page); }}
                  style={{
                    padding: '10px 14px', background: '#f8fafc', borderRadius: 8, textDecoration: 'none',
                    fontSize: 14, color: '#1e293b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ color: p.color }}>→</span> {n.label}
                </a>
              ))}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('dang-ky-ten-mien'); }}
                style={{
                  padding: '10px 14px', background: p.color, borderRadius: 8, textDecoration: 'none',
                  fontSize: 14, color: '#fff', fontWeight: 700, textAlign: 'center', marginTop: 6,
                }}
              >
                {lang === 'en' ? 'Register Domain Now' : 'Đăng ký tên miền ngay'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>{lang === 'en' ? 'FAQ' : 'CÂU HỎI THƯỜNG GẶP'}</h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {[
              { q: lang === 'en' ? `What is ${p.title}?` : `${p.title} là gì?`, a: lang === 'en' ? `${p.desc} WisdomCloud supports you throughout your service usage.` : `${p.desc} WisdomCloud hỗ trợ bạn trong suốt quá trình sử dụng dịch vụ.` },
              { q: lang === 'en' ? 'How to use this service?' : 'Làm thế nào để sử dụng dịch vụ?', a: lang === 'en' ? 'You can register online via website or contact hotline for detailed consultation. Quick and simple process.' : 'Bạn có thể đăng ký trực tuyến qua website hoặc liên hệ hotline để được tư vấn chi tiết. Quy trình nhanh chóng, đơn giản.' },
              { q: lang === 'en' ? 'What makes WisdomCloud different?' : 'WisdomCloud có gì khác biệt?', a: lang === 'en' ? 'We provide services with the best prices, 24/7 technical support, high security, and fast processing.' : 'Chúng tôi cung cấp dịch vụ với giá tốt nhất, hỗ trợ kỹ thuật 24/7, bảo mật cao và quy trình xử lý nhanh chóng.' },
              { q: lang === 'en' ? 'I need more support?' : 'Tôi cần hỗ trợ thêm?', a: lang === 'en' ? 'Please contact hotline or email our support team at WisdomCloud. We are ready to help you 24/7.' : 'Vui lòng liên hệ hotline hoặc gửi email cho đội ngũ hỗ trợ của WisdomCloud. Chúng tôi sẵn sàng giúp đỡ bạn 24/7.' },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '16px 0', border: 'none',
                    background: 'none', cursor: 'pointer', fontSize: 14,
                    fontWeight: 500, color: expandedFaq === i ? p.color : '#1e293b',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 700, minWidth: 24, color: p.color }}>{i + 1}.</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{faq.q}</span>
                  <span style={{
                    color: '#aaa', fontSize: 11,
                    transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}>▼</span>
                </button>
                <div style={{
                  maxHeight: expandedFaq === i ? '300px' : '0',
                  opacity: expandedFaq === i ? 1 : 0,
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

const styles = {
  subNav: {
    background: '#fff', borderBottom: '1px solid #e8e8e8',
    position: 'sticky', top: 0, zIndex: 50,
  },
  subNavInner: {
    display: 'flex', alignItems: 'center', gap: 20,
    padding: '10px 0', overflowX: 'auto',
  },
  subNavTitle: { fontSize: 13, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap', letterSpacing: 1 },
  snLink: { padding: '6px 14px', fontSize: 13, color: '#555', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 },
  snActive: { padding: '6px 14px', fontSize: 13, color: '#fff', background: '#2563eb', borderRadius: 6, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 600 },

  hero: { padding: '50px 0', background: '#f8fafc', borderBottom: '1px solid #e8e8e8' },
  heroInner: { textAlign: 'center' },
  heroBadge: { fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  heroTitle: { fontSize: 30, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' },
  heroDesc: { fontSize: 15, color: '#666', maxWidth: 600, margin: '0 auto 12px', lineHeight: 1.6 },
  heroCta: { padding: '12px 30px', background: '#2563eb', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-block' },

  sectionTitle: { fontSize: 22, fontWeight: 800, color: '#1e293b', textAlign: 'center', margin: '0 0 28px', textTransform: 'uppercase' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  featCard: { display: 'flex', gap: 16, alignItems: 'flex-start', background: '#fff', padding: 20, borderRadius: 10, border: '1px solid #f1f5f9' },
  featNum: { width: 36, height: 36, borderRadius: 8, background: '#f1f5f9', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 800 },
  featTitle: { fontSize: 14, fontWeight: 700, color: '#1e293b', margin: '0 0 4px' },
  featDesc: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.4 },

  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 },
  stepCard: { background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #f1f5f9', position: 'relative' },
  stepNum: { position: 'absolute', top: -10, right: 16, width: 28, height: 28, borderRadius: 14, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 },
  stepTitle: { fontSize: 15, fontWeight: 700, color: '#1e293b', margin: '0 0 6px' },
  stepDesc: { fontSize: 13, color: '#666', margin: 0, lineHeight: 1.5 },
};
