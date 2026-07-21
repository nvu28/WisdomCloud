import React, { useState } from 'react';
import { getCategoryNav, getSubPages } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const FEATURES_VI = [
  { icon: '🪪', title: 'Xác thực danh tính người gửi email', desc: 'Chữ ký số được gắn với thông tin cá nhân hoặc tổ chức của người gửi, giúp người nhận xác định chính xác người gửi email.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24102855-xac-thuc-danh-tinh-nguoi-goi-email.jpg' },
  { icon: '✅', title: 'Đảm bảo tính toàn vẹn và tin cậy của email', desc: 'Chữ ký số cung cấp một cơ chế để kiểm tra tính toàn vẹn của email, đảm bảo rằng nội dung của nó không bị thay đổi từ lúc nó được ký điện tử.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24103115-dam-bao-email-toan-ven.jpg' },
  { icon: '🔒', title: 'Bảo mật dữ liệu, tránh giả mạo email', desc: 'Thông tin được ký điện tử bằng chữ ký số được mã hóa, đảm bảo rằng nó không bị thay đổi hoặc làm giả mạo trong quá trình truyền tải.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24103340-bao-mat-email.jpg' },
  { icon: '📱', title: 'Tương thích nhiều nền tảng và thiết bị khác nhau', desc: 'Chữ ký số email tương thích với nhiều nền tảng và thiết bị khác nhau, bao gồm cả máy tính và thiết bị di động. Hỗ trợ Outlook, Thunderbird.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24103614-tuong-thich-moi-nen-tang.jpg' },
];

const FEATURES_EN = [
  { icon: '🪪', title: 'Verify sender identity', desc: 'The digital signature is linked to the personal or organizational information of the sender, helping recipients accurately identify the email sender.', img: '' },
  { icon: '✅', title: 'Ensure email integrity and reliability', desc: 'Digital signatures provide a mechanism to verify email integrity, ensuring content has not been changed since it was electronically signed.', img: '' },
  { icon: '🔒', title: 'Data security, prevent email spoofing', desc: 'Information electronically signed with digital signatures is encrypted, ensuring it cannot be altered or forged during transmission.', img: '' },
  { icon: '📱', title: 'Compatible with multiple platforms and devices', desc: 'Email digital signatures are compatible with multiple platforms and devices, including computers and mobile devices. Supports Outlook, Thunderbird.', img: '' },
];

const PRICING_PLANS_VI = [
  {
    name: 'CPAC Basic',
    fullName: 'Comodo Personal Authentication Certificates Basic',
    price: '42.000',
    unit: 'đ /tháng',
    features: ['Chứng thực qua domain', 'Hiển thị Email', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Đăng ký 1 - 2 năm'],
    popular: false,
  },
  {
    name: 'CPAC Pro',
    fullName: 'Comodo Personal Authentication Certificates Pro',
    price: '99.000',
    unit: 'đ /tháng',
    features: ['Chứng thực qua thông tin doanh nghiệp', 'Hiển thị Email & Fullname', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Đăng ký 1 - 2 năm'],
    popular: true,
  },
  {
    name: 'CPAC Enterprise',
    fullName: 'Comodo Personal Authentication Certificates Enterprise',
    price: '130.000',
    unit: 'đ /tháng',
    features: ['Chứng thực qua thông tin doanh nghiệp', 'Hiển thị Email, Fullname, Company Name, Address', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Đăng ký 1 - 2 năm'],
    popular: false,
  },
];

const PRICING_PLANS_EN = [
  {
    name: 'CPAC Basic',
    fullName: 'Comodo Personal Authentication Certificates Basic',
    price: '42,000',
    unit: 'VND /month',
    features: ['Domain validation', 'Display Email', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Register 1 - 2 years'],
    popular: false,
  },
  {
    name: 'CPAC Pro',
    fullName: 'Comodo Personal Authentication Certificates Pro',
    price: '99,000',
    unit: 'VND /month',
    features: ['Business info validation', 'Display Email & Fullname', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Register 1 - 2 years'],
    popular: true,
  },
  {
    name: 'CPAC Enterprise',
    fullName: 'Comodo Personal Authentication Certificates Enterprise',
    price: '130,000',
    unit: 'VND /month',
    features: ['Business info validation', 'Display Email, Fullname, Company Name, Address', 'Email Encryption ✓', 'Email Signing ✓', 'Document Signing ✓', 'Client Authentication ✓', 'Register 1 - 2 years'],
    popular: false,
  },
];

const COMPARISON_FEATURES_VI = [
  { label: 'Phương thức chứng thực', values: ['Chứng thực qua domain', 'Chứng thực qua thông tin doanh nghiệp', 'Chứng thực qua thông tin doanh nghiệp'] },
  { label: 'Thông tin hiển thị trên chứng chỉ', values: ['Email', 'Email & Fullname', 'Email & Fullname, Company Name, Company Address'] },
  { label: 'Email Encryption', values: ['✓', '✓', '✓'] },
  { label: 'Email Signing', values: ['✓', '✓', '✓'] },
  { label: 'Document Signing', values: ['✓', '✓', '✓'] },
  { label: 'Client Authentication', values: ['✓', '✓', '✓'] },
  { label: 'Cho phép đăng ký', values: ['1 - 2 năm', '1 - 2 năm', '1 - 2 năm'] },
];

const COMPARISON_FEATURES_EN = [
  { label: 'Validation Method', values: ['Domain validation', 'Business info validation', 'Business info validation'] },
  { label: 'Certificate Display Info', values: ['Email', 'Email & Fullname', 'Email, Fullname, Company Name, Address'] },
  { label: 'Email Encryption', values: ['✓', '✓', '✓'] },
  { label: 'Email Signing', values: ['✓', '✓', '✓'] },
  { label: 'Document Signing', values: ['✓', '✓', '✓'] },
  { label: 'Client Authentication', values: ['✓', '✓', '✓'] },
  { label: 'Registration Period', values: ['1 - 2 years', '1 - 2 years', '1 - 2 years'] },
];

const FAQS_VI = [
  { q: 'Dịch vụ chữ ký số email phù hợp với đối tượng nào?', a: 'Cá nhân, doanh nghiệp thường xuyên giao dịch qua email, đặc biệt là các giao dịch quan trọng liên quan đến tài chính, hợp đồng. Doanh nghiệp cần đảm bảo tính bảo mật cho các thông tin liên lạc qua email. Ngân Hàng và Tài Chính, Tổ Chức Chính Phủ.' },
  { q: 'Để sử dụng dịch vụ chữ ký số email, tôi cần làm gì?', a: 'Đăng ký dịch vụ chữ ký số tại WisdomCloud. Cài đặt phần mềm chữ ký số trên máy tính. Tạo và đăng ký sử dụng chữ ký số.' },
  { q: 'Sự khác nhau giữa xác thực qua tên miền và xác thực qua thông tin doanh nghiệp là gì?', a: 'Xác thực qua tên miền tập trung vào xác thực tính hợp lệ của tên miền, trong khi xác thực qua thông tin doanh nghiệp tập trung vào xác thực thông tin của công ty hoặc tổ chức cụ thể bao gồm thông tin pháp lý, địa chỉ, ngành nghề hoạt động.' },
  { q: 'Vì sao nên chọn chữ ký số email?', a: 'Chữ ký số được gắn với thông tin cá nhân hoặc tổ chức, chống giả mạo email, mã hóa thông tin email, tăng cường niềm tin giữa người gửi và người nhận email, thể hiện sự chuyên nghiệp và uy tín.' },
];

const FAQS_EN = [
  { q: 'Who is the email digital signature service suitable for?', a: 'Individuals and businesses that frequently communicate via email, especially important transactions related to finance and contracts. Businesses that need to ensure confidentiality of email communications. Banks, Financial institutions, Government organizations.' },
  { q: 'What do I need to use the email digital signature service?', a: 'Register for the digital signature service at WisdomCloud. Install the digital signature software on your computer. Create and register to use the digital signature.' },
  { q: 'What is the difference between domain validation and business info validation?', a: 'Domain validation focuses on validating the legitimacy of the domain name, while business info validation focuses on validating the information of a specific company or organization including legal information, address, and business activities.' },
  { q: 'Why choose email digital signature?', a: 'Digital signatures are linked to personal or organizational information, preventing email spoofing, encrypting email information, increasing trust between sender and recipient, and demonstrating professionalism and credibility.' },
];

export default function EmailDigitalSignaturePage({ pageKey, onNavigate, lang }) {
  const p = getSubPages(lang)[pageKey];
  const nav = getCategoryNav(lang)['email'];
  const [expandedFaq, setExpandedFaq] = useState(null);

  const features = lang === 'en' ? FEATURES_EN : FEATURES_VI;
  const plans = lang === 'en' ? PRICING_PLANS_EN : PRICING_PLANS_VI;
  const comparisonData = lang === 'en' ? COMPARISON_FEATURES_EN : COMPARISON_FEATURES_VI;
  const faqs = lang === 'en' ? FAQS_EN : FAQS_VI;

  return (
    <div>
      {/* SERVICE SUB-MENU */}
      <nav style={styles.subNav}>
        <div style={sectionInner}>
          <div style={styles.subNavInner}>
            <span style={styles.subNavTitle}>EMAIL</span>
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

      {/* HERO BANNER */}
      <section style={styles.hero}>
        <div style={sectionInner}>
          <div style={styles.heroInner}>
            <div style={styles.heroBadge}>DỊCH VỤ</div>
            <h1 style={styles.heroTitle}>{lang === 'en' ? 'Email Digital Signature' : 'Chữ Ký Số Email'}</h1>
            <p style={styles.heroSubtitle}>
              {lang === 'en'
                ? 'Professional digital signature service for email security'
                : 'Giải pháp bảo mật thông tin, xác thực danh tính trong giao tiếp qua email'}
            </p>
            <div style={styles.heroBanner}>
              <img
                src="https://support.pavietnam.vn/datafile/banner/2024_05/157599-14100630-email-server.png"
                alt="Email Digital Signature"
                style={styles.heroImg}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section style={styles.featureSection}>
        <div style={sectionInner}>
          <div style={styles.featureList}>
            {features.map((f, i) => (
              <div key={i} style={{ ...styles.featureRow, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div style={styles.featureContent}>
                  <div style={styles.featureIconWrap}>
                    <span style={styles.featureIcon}>{f.icon}</span>
                  </div>
                  <h3 style={styles.featureTitle}>{f.title}</h3>
                  <p style={styles.featureDesc}>{f.desc}</p>
                </div>
                {f.img && (
                  <div style={styles.featureImgWrap}>
                    <img
                      src={f.img}
                      alt={f.title}
                      style={styles.featureImg}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section style={styles.pricingSection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'EMAIL DIGITAL SIGNATURE PRICING' : 'BẢNG GIÁ CHỮ KÝ SỐ EMAIL'}
          </h2>
          <div style={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <div key={i} style={{ ...styles.planCard, ...(plan.popular ? styles.planCardPopular : {}) }}>
                {plan.popular && <div style={styles.planBadge}>PHỔ BIẾN</div>}
                <h3 style={styles.planName}>{plan.name}</h3>
                <p style={styles.planFullName}>{plan.fullName}</p>
                <div style={styles.planPriceWrap}>
                  <span style={styles.planPrice}>{plan.price}</span>
                  <span style={styles.planUnit}>{plan.unit}</span>
                </div>
                <ul style={styles.planFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={styles.planFeature}>
                      <span style={f === '✓' ? styles.checkIconYes : styles.checkIcon}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#" style={{ ...styles.planCta, ...(plan.popular ? styles.planCtaPopular : {}) }}>
                  {lang === 'en' ? 'Register now' : 'Đăng ký ngay'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section style={styles.comparisonSection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'FEATURE COMPARISON' : 'SO SÁNH TÍNH NĂNG CHỮ KÝ SỐ'}
          </h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{lang === 'en' ? 'FEATURE' : 'TÍNH NĂNG'}</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>CPAC BASIC</th>
                  <th style={{ ...styles.th, textAlign: 'center', background: '#d97706' }}>CPAC PRO</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>CPAC ENTERPRISE</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.tdLabel}>{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} style={{
                        ...styles.tdCenter,
                        background: j === 1 ? '#fffbeb' : undefined,
                      }}>
                        {v === '✓' ? <span style={{ color: '#059669', fontWeight: 700 }}>✓</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section style={styles.introSection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'ABOUT EMAIL DIGITAL SIGNATURE' : 'GIỚI THIỆU DỊCH VỤ CHỮ KÝ SỐ EMAIL'}
          </h2>
          <p style={styles.introText}>
            {lang === 'en'
              ? 'Email digital signatures can only be signed by the owner of the signature, no one can forge or copy it. This confirms the authenticity of the sender, helping to prevent email spoofing.'
              : 'Chữ ký số email chỉ có thể được ký bởi chủ sở hữu của chữ ký đó, không ai có thể giả mạo, sao chép. Từ đó giúp xác nhận tính xác thực của người gửi, giúp ngăn chặn vấn nạn giả mạo email.'}
          </p>
          <div style={styles.introGrid}>
            {[
              { icon: '🪪', title: lang === 'en' ? 'IDENTITY VERIFICATION' : 'XÁC THỰC DANH TÍNH', desc: lang === 'en' ? 'Verifies sender identity by electronically signing each sent email. A unique encrypted string generated using private and public keys.' : 'Dịch vụ chữ ký số email giúp xác thực danh tính của người gửi bằng cách ký điện tử trên mỗi email gửi đi. Chữ ký số là một chuỗi mã hóa duy nhất được tạo ra bằng cách sử dụng khóa riêng và khóa công khai.' },
              { icon: '🔐', title: lang === 'en' ? 'DATA SECURITY' : 'BẢO MẬT DỮ LIỆU', desc: lang === 'en' ? 'Information electronically signed with digital signatures is encrypted, ensuring it cannot be altered or counterfeited during transmission.' : 'Thông tin được ký điện tử bằng chữ ký số được mã hóa, đảm bảo rằng nó không bị thay đổi hoặc làm giả mạo trong quá trình truyền tải.' },
              { icon: '✅', title: lang === 'en' ? 'INTEGRITY & RELIABILITY' : 'TÍNH TOÀN VẸN VÀ TIN CẬY', desc: lang === 'en' ? 'Digital signatures provide a mechanism to check email integrity, ensuring content has not been changed since it was electronically signed.' : 'Chữ ký số cung cấp một cơ chế để kiểm tra tính toàn vẹn của email, đảm bảo rằng nội dung của nó không bị thay đổi từ lúc nó được ký điện tử.' },
              { icon: '🔗', title: lang === 'en' ? 'SYSTEM INTEGRATION' : 'TÍCH HỢP HỆ THỐNG', desc: lang === 'en' ? 'Compatible with multiple platforms and devices, supporting Outlook, Thunderbird and other popular email applications.' : 'Các tính năng của dịch vụ chữ ký số email tương thích với nhiều nền tảng và thiết bị, hỗ trợ Outlook, Thunderbird và các ứng dụng email phổ biến.' },
            ].map((item, i) => (
              <div key={i} style={styles.introCard}>
                <span style={styles.introIcon}>{item.icon}</span>
                <h4 style={styles.introTitle}>{item.title}</h4>
                <p style={styles.introDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={styles.whySection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'WHY CHOOSE WISDOMCLOUD' : 'VÌ SAO NÊN CHỌN WISDOMCLOUD'}
          </h2>
          <div style={styles.whyGrid}>
            {[
              { icon: '💰', title: lang === 'en' ? 'Best Price' : 'Giá tốt nhất thị trường', desc: lang === 'en' ? 'We commit to having the best price for you' : 'Chúng tôi cam kết giá tại đây luôn tốt nhất cho bạn' },
              { icon: '🤝', title: lang === 'en' ? 'Reliable' : 'Đáng tin cậy', desc: lang === 'en' ? 'Top 1 domain registrations for over 2 decades, data from VNNIC' : 'Giữ vị trí top 1 số lượng đăng ký .VN hơn 2 thập kỉ qua' },
              { icon: '🏅', title: lang === 'en' ? '25 Years Leading' : '25 năm dẫn đầu', desc: lang === 'en' ? 'Over 25 years in domain, hosting, email, cloud and value-added services' : 'Hơn 25 năm trong lĩnh vực cung cấp tên miền, lưu trữ website, email cho doanh nghiệp' },
              { icon: '📞', title: lang === 'en' ? '24/7 Support' : 'Hỗ trợ 24/7', desc: lang === 'en' ? 'Our support center is always online and ready to help you anytime, call 1900 9477' : 'Trung tâm hỗ trợ khách hàng luôn trực tuyến và sẵn sàng trợ giúp bạn mọi lúc, gọi ngay 1900 9477' },
            ].map((w, i) => (
              <div key={i} style={styles.whyCard}>
                <span style={styles.whyIcon}>{w.icon}</span>
                <h4 style={styles.whyTitle}>{w.title}</h4>
                <p style={styles.whyDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.faqSection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'FREQUENTLY ASKED QUESTIONS' : 'CÂU HỎI THƯỜNG GẶP'}
          </h2>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '14px 0', border: 'none',
                    background: 'none', cursor: 'pointer', fontSize: 14,
                    fontWeight: 500, color: expandedFaq === i ? '#dd1b5c' : '#1e293b',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
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

  hero: { padding: '40px 0 0', background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', overflow: 'hidden' },
  heroInner: { textAlign: 'center' },
  heroBadge: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px' },
  heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '0 0 24px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' },
  heroBanner: { maxWidth: 700, margin: '0 auto' },
  heroImg: { width: '100%', height: 'auto', display: 'block' },

  featureSection: { padding: '50px 0', background: '#fff' },
  featureList: { display: 'flex', flexDirection: 'column', gap: 40 },
  featureRow: { display: 'flex', gap: 40, alignItems: 'center' },
  featureContent: { flex: 1 },
  featureIconWrap: { width: 52, height: 52, borderRadius: 12, background: '#d9770612', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  featureIcon: { fontSize: 24 },
  featureTitle: { fontSize: 20, fontWeight: 800, color: '#1e293b', margin: '0 0 10px' },
  featureDesc: { fontSize: 14, color: '#666', lineHeight: 1.7, margin: 0 },
  featureImgWrap: { flex: 1, maxWidth: 400 },
  featureImg: { width: '100%', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },

  pricingSection: { padding: '50px 0', background: '#f8fafc' },
  sectionTitle: { fontSize: 22, fontWeight: 800, color: '#1e293b', textAlign: 'center', margin: '0 0 32px', textTransform: 'uppercase' },
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
  planCard: {
    background: '#fff', borderRadius: 16, padding: 28, border: '2px solid #e2e8f0',
    textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', gap: 12,
  },
  planCardPopular: {
    border: '2px solid #d97706',
    boxShadow: '0 4px 24px rgba(217,119,6,0.15)',
    transform: 'scale(1.03)',
  },
  planBadge: {
    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
    background: '#d97706', color: '#fff', fontSize: 11, fontWeight: 700,
    padding: '4px 20px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1,
  },
  planName: { fontSize: 16, fontWeight: 700, color: '#1e293b', margin: 0 },
  planFullName: { fontSize: 11, color: '#999', margin: '0 0 8px', lineHeight: 1.3 },
  planPriceWrap: { display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 },
  planPrice: { fontSize: 32, fontWeight: 800, color: '#1e293b' },
  planUnit: { fontSize: 13, color: '#666' },
  planFeatures: { listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', flex: 1 },
  planFeature: { fontSize: 13, color: '#475569', padding: '7px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 },
  checkIcon: { color: '#d97706', fontWeight: 700, fontSize: 14 },
  checkIconYes: { color: '#059669', fontWeight: 700, fontSize: 14 },
  planCta: {
    display: 'inline-block', padding: '12px 28px', borderRadius: 8,
    fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
    border: '2px solid #d97706', color: '#d97706', background: '#fff',
  },
  planCtaPopular: {
    background: '#d97706', color: '#fff', border: '2px solid #d97706',
  },

  comparisonSection: { padding: '50px 0', background: '#fff' },
  tableWrap: { overflowX: 'auto', borderRadius: 12, border: '1px solid #e8e8e8' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { background: '#1e293b', color: '#fff', padding: '12px 16px', fontWeight: 600, whiteSpace: 'nowrap' },
  tdLabel: { padding: '12px 16px', borderBottom: '1px solid #e8e8e8', color: '#475569', fontWeight: 600, whiteSpace: 'nowrap' },
  tdCenter: { padding: '12px 16px', borderBottom: '1px solid #e8e8e8', color: '#475569', textAlign: 'center' },
  trEven: { background: '#fff' },
  trOdd: { background: '#f8fafc' },

  introSection: { padding: '50px 0', background: '#f8fafc' },
  introText: { fontSize: 15, color: '#666', lineHeight: 1.8, textAlign: 'center', maxWidth: 800, margin: '0 auto 32px' },
  introGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  introCard: { background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #e2e8f0' },
  introIcon: { fontSize: 40, display: 'block', marginBottom: 12 },
  introTitle: { fontSize: 13, fontWeight: 800, color: '#d97706', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 },
  introDesc: { fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 },

  whySection: { padding: '50px 0', background: '#fff' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  whyCard: { background: '#f8fafc', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #f1f5f9' },
  whyIcon: { fontSize: 36, display: 'block', marginBottom: 10 },
  whyTitle: { fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: '#1e293b' },
  whyDesc: { fontSize: 13, color: '#666', lineHeight: 1.5, margin: 0 },

  faqSection: { padding: '50px 0', background: '#f8fafc' },
};
