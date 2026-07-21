import React, { useState } from 'react';
import { getCategoryNav, getSubPages } from '../data/subPages';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

const FEATURES_VI = [
  { icon: '🎨', title: 'Dễ dàng tạo chữ ký theo ý thích', desc: 'Cung cấp nhiều mẫu chữ ký Email được thiết kế theo nhu cầu thực tế, lĩnh vực hoạt động, dựa trên bộ nhận diện thương hiệu của doanh nghiệp. Cam kết đảm bảo tính độc quyền, riêng biệt cho mỗi mẫu chữ ký Email. Bạn cũng có thể tự thiết kế nhằm cá nhân hóa chữ ký của mình.', img: 'https://support.pavietnam.vn/datafile/banner/2024_05/157599-17142907-toi-uu-tang-toc-truy-cap.png' },
  { icon: '🏆', title: 'Tạo dựng uy tín, chuyên nghiệp', desc: 'Sử dụng chữ ký email nhất quán cho toàn bộ nhân viên trong doanh nghiệp giúp đảm bảo sự thống nhất trong giao tiếp. Điều này không chỉ tạo ra một hình ảnh chuyên nghiệp mà còn giúp khách hàng dễ dàng nhận diện và nhớ đến doanh nghiệp mỗi khi nhận email.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24160244-de-dang-tich-hop.jpg' },
  { icon: '🔗', title: 'Kết nối khách hàng nhanh chóng', desc: 'Chữ ký email có thể tích hợp các liên kết quan trọng như trang web công ty, blog, các trang mạng xã hội, hoặc các chiến dịch marketing hiện tại. Điều này không chỉ giúp khách hàng dễ dàng tìm hiểu thêm về doanh nghiệp mà còn thúc đẩy họ tham gia vào các hoạt động marketing.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24104926-ket-noi-khach-hang.jpg' },
  { icon: '🧠', title: 'Xây dựng khả năng ghi nhớ thương hiệu', desc: 'Chữ ký email là một công cụ hiệu quả để quảng bá thương hiệu một cách tinh tế. Việc sử dụng logo, màu sắc, và phông chữ đặc trưng của thương hiệu trong chữ ký giúp tăng cường nhận diện thương hiệu mỗi khi khách hàng nhận được email từ bạn.', img: 'https://support.pavietnam.vn/datafile/banner/2024_07/157599-24104926-ket-noi-khach-hang.jpg' },
];

const FEATURES_EN = [
  { icon: '🎨', title: 'Easy to create your desired signature', desc: 'We provide many Email signature templates designed for actual needs, business fields, based on your corporate identity. We guarantee exclusivity for each Email signature template. You can also design your own to personalize.', img: '' },
  { icon: '🏆', title: 'Build credibility and professionalism', desc: 'Using consistent email signatures for all employees ensures uniform communication. This not only creates a professional image but also helps customers easily recognize and remember your business.', img: '' },
  { icon: '🔗', title: 'Connect with customers quickly', desc: 'Email signatures can integrate important links such as company website, blog, social media, or current marketing campaigns. This helps customers learn more about your business and engage with your brand.', img: '' },
  { icon: '🧠', title: 'Build brand recognition', desc: 'Email signature is an effective tool for subtle brand promotion. Using your logo, colors, and characteristic fonts in the signature helps strengthen brand recognition every time customers receive your email.', img: '' },
];

const PRICING_PLANS_VI = [
  {
    name: 'EMAIL SIGN #1',
    price: '9.000',
    unit: 'đ /tháng',
    features: ['Thêm Avatar/Logo', 'Có thể thay đổi Kiểu dáng & Màu sắc', 'Không giới hạn lần sử dụng'],
    popular: false,
  },
  {
    name: 'EMAIL SIGN #2',
    price: '28.000',
    unit: 'đ /tháng',
    features: ['Thêm Avatar/Logo', 'Có thể thay đổi Kiểu dáng & Màu sắc', 'Thông tin tùy chọn', 'Mạng xã hội', 'Nhúng HTML', 'Không giới hạn lần sử dụng'],
    popular: true,
  },
];

const PRICING_PLANS_EN = [
  {
    name: 'EMAIL SIGN #1',
    price: '9,000',
    unit: 'VND /month',
    features: ['Add Avatar/Logo', 'Customizable Style & Color', 'Unlimited usage'],
    popular: false,
  },
  {
    name: 'EMAIL SIGN #2',
    price: '28,000',
    unit: 'VND /month',
    features: ['Add Avatar/Logo', 'Customizable Style & Color', 'Optional information', 'Social media links', 'HTML embed', 'Unlimited usage'],
    popular: true,
  },
];

const FAQS_VI = [
  { q: 'Thế nào là một chữ ký email phù hợp và chuyên nghiệp?', a: 'Để có thiết kế chữ ký email chuyên nghiệp, hãy đảm bảo chi tiết ngắn gọn và chính xác. Bạn không phải thêm mọi liên kết và tài khoản mạng xã hội, hãy ưu tiên hai hoặc ba liên kết mà bạn muốn đặt. Hình ảnh cũng có sức mạnh và giúp xây dựng niềm tin. Vì vậy, hãy thêm logo hoặc ảnh chân dung đơn giản.' },
  { q: 'Tôi có nên dùng hình ảnh trong chữ ký email không?', a: 'Chữ ký email có hình ảnh, logo sẽ hiệu quả hơn các khối chỉ có văn bản thuần túy. Hình ảnh giúp tăng thêm sự tinh tế cho những bức thư đơn giản. Tính trực quan cao của hình ảnh mang lại hiệu quả cho người nhận email ngày nay.' },
  { q: 'Làm thế nào để thêm chữ ký email trong Outlook?', a: 'Bạn có thể thay đổi chữ ký email trong phần Settings (Cài đặt) > Mail (Thư) > Compose and reply (Soạn và trả lời). Ở đó, bạn có thể tạo hoặc sửa đổi chữ ký email.' },
  { q: 'Tôi có thể sử dụng chữ ký email trên thiết bị di động không?', a: 'Có, chữ ký email của chúng tôi tương thích với tất cả các thiết bị di động và ứng dụng email phổ biến như Outlook, Thunderbird, Gmail và Apple Mail.' },
];

const FAQS_EN = [
  { q: 'What makes a suitable and professional email signature?', a: 'For a professional email signature design, ensure details are concise and accurate. You don\'t have to add every link and social media account — prioritize two or three links you want to place. Images also have power and help build trust, so add a logo or simple portrait photo.' },
  { q: 'Should I use images in my email signature?', a: 'Email signatures with images and logos are more effective than text-only blocks. Images add sophistication to simple letters. The high visual impact of images is effective for email recipients today.' },
  { q: 'How to add email signature in Outlook?', a: 'You can change your email signature in Settings > Mail > Compose and reply. There, you can create or modify your email signature.' },
  { q: 'Can I use the email signature on mobile devices?', a: 'Yes, our email signature is compatible with all mobile devices and popular email applications like Outlook, Thunderbird, Gmail, and Apple Mail.' },
];

export default function EmailSignaturePage({ pageKey, onNavigate, lang }) {
  const p = getSubPages(lang)[pageKey];
  const nav = getCategoryNav(lang)['email'];
  const [expandedFaq, setExpandedFaq] = useState(null);

  const features = lang === 'en' ? FEATURES_EN : FEATURES_VI;
  const plans = lang === 'en' ? PRICING_PLANS_EN : PRICING_PLANS_VI;
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
            <h1 style={styles.heroTitle}>{lang === 'en' ? 'Email Signature' : 'Chữ Ký Email'}</h1>
            <p style={styles.heroSubtitle}>
              {lang === 'en'
                ? 'Professional, diverse templates for experts'
                : 'Chuyên nghiệp, nhiều mẫu cho chuyên gia'}
            </p>
            <div style={styles.heroBanner}>
              <img
                src="https://support.pavietnam.vn/datafile/banner/2024_05/157599-14100630-email-server.png"
                alt="Email Signature"
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
              <div key={i} style={styles.featureRow}>
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
            {lang === 'en' ? 'EMAIL SIGNATURE PRICING' : 'BẢNG GIÁ CHỮ KÝ EMAIL'}
          </h2>
          <div style={styles.pricingGrid}>
            {plans.map((plan, i) => (
              <div key={i} style={{ ...styles.planCard, ...(plan.popular ? styles.planCardPopular : {}) }}>
                {plan.popular && <div style={styles.planBadge}>PHỔ BIẾN</div>}
                <h3 style={styles.planName}>{plan.name}</h3>
                <div style={styles.planPriceWrap}>
                  <span style={styles.planPrice}>{plan.price}</span>
                  <span style={styles.planUnit}>{plan.unit}</span>
                </div>
                <ul style={styles.planFeatures}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={styles.planFeature}>
                      <span style={styles.checkIcon}>✓</span> {f}
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

      {/* INTRODUCTION */}
      <section style={styles.introSection}>
        <div style={sectionInner}>
          <h2 style={styles.sectionTitle}>
            {lang === 'en' ? 'ABOUT EMAIL SIGNATURE' : 'GIỚI THIỆU DỊCH VỤ CHỮ KÝ EMAIL'}
          </h2>
          <div style={styles.introGrid}>
            {[
              { icon: '📋', title: lang === 'en' ? 'BUSINESS CARD' : 'DANH THIẾP', desc: lang === 'en' ? 'Rich email signature templates for businesses and experts, helping email signatures become email business cards.' : 'Kho mẫu chữ ký cho doanh nghiệp và chuyên gia vô cùng phong phú, chúng tôi giúp chữ ký email trở thành danh thiếp email.' },
              { icon: '💼', title: lang === 'en' ? 'PROFESSIONAL' : 'CHUYÊN NGHIỆP', desc: lang === 'en' ? 'Help you look professional in front of customers, supporting them to identify the sender: job position, title, company, contact information, social media.' : 'Giúp bạn trở nên Pro hơn trong mắt khách hàng, hỗ trợ khách hàng nhận dạng được người gửi: vị trí công việc, chức vụ, công ty, thông tin liên hệ, mạng xã hội.' },
              { icon: '⚡', title: lang === 'en' ? 'SIMPLE' : 'ĐƠN GIẢN', desc: lang === 'en' ? 'All signature operations are simple and quick through an intuitive drag-and-drop interface. In just a few minutes, you have your own business card.' : 'Mọi thao tác chữ ký đều rất đơn giản và nhanh gọn thông qua giao diện trực quan kéo thả, chỉ với vài phút bạn đã có ngay danh thiếp cho mình.' },
              { icon: '🎯', title: lang === 'en' ? 'EFFECTIVE' : 'HIỆU QUẢ', desc: lang === 'en' ? 'Attract recipients to read your email along with the email business card, increasing trust with partners.' : 'Thu hút người nhận chọn ngay vào đọc email đi kèm danh thiếp email, và tăng độ tin cậy với đối tác.' },
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

  hero: { padding: '40px 0 0', background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', overflow: 'hidden' },
  heroInner: { textAlign: 'center' },
  heroBadge: { fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px' },
  heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '0 0 24px' },
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
  pricingGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' },
  planCard: {
    background: '#fff', borderRadius: 16, padding: 32, border: '2px solid #e2e8f0',
    textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', gap: 16,
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
  planPriceWrap: { display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 },
  planPrice: { fontSize: 36, fontWeight: 800, color: '#1e293b' },
  planUnit: { fontSize: 14, color: '#666' },
  planFeatures: { listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', flex: 1 },
  planFeature: { fontSize: 14, color: '#475569', padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 },
  checkIcon: { color: '#d97706', fontWeight: 700, fontSize: 16 },
  planCta: {
    display: 'inline-block', padding: '12px 28px', borderRadius: 8,
    fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center',
    border: '2px solid #d97706', color: '#d97706', background: '#fff',
  },
  planCtaPopular: {
    background: '#d97706', color: '#fff', border: '2px solid #d97706',
  },

  introSection: { padding: '50px 0', background: '#fff' },
  introGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  introCard: { textAlign: 'center', padding: 24 },
  introIcon: { fontSize: 40, display: 'block', marginBottom: 12 },
  introTitle: { fontSize: 14, fontWeight: 800, color: '#d97706', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 },
  introDesc: { fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 },

  whySection: { padding: '50px 0', background: '#f8fafc' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 },
  whyCard: { background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #f1f5f9' },
  whyIcon: { fontSize: 36, display: 'block', marginBottom: 10 },
  whyTitle: { fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: '#1e293b' },
  whyDesc: { fontSize: 13, color: '#666', lineHeight: 1.5, margin: 0 },

  faqSection: { padding: '50px 0', background: '#fff' },
};
