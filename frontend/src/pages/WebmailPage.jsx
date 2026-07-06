import React, { useState, useEffect, useCallback } from 'react';
import { getInbox, getSentEmails, sendEmail, getEmail, markAsRead, deleteEmail } from '../api/cloudApi';

const sectionInner = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' };

export default function WebmailPage({ user, onNavigate }) {
  const [folder, setFolder] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeForm, setComposeForm] = useState({ to: '', subject: '', body: '' });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const data = folder === 'inbox' ? await getInbox() : await getSentEmails();
      setEmails(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [folder]);

  useEffect(() => {
    if (user) fetchEmails();
  }, [user, fetchEmails]);

  const handleSelect = async (id) => {
    setSelectedId(id);
    try {
      const email = await getEmail(id);
      setSelectedEmail(email);
      if (folder === 'inbox' && !email.read) {
        await markAsRead(id);
        setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await deleteEmail(id);
    if (selectedId === id) { setSelectedId(null); setSelectedEmail(null); }
    setEmails(prev => prev.filter(e => e.id !== id));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!composeForm.to || !composeForm.subject || !composeForm.body) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setSending(true);
    setError('');
    try {
      await sendEmail(composeForm);
      setSuccess('Gửi email thành công!');
      setShowCompose(false);
      setComposeForm({ to: '', subject: '', body: '' });
      if (folder === 'sent') fetchEmails();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi gửi email');
    }
    setSending(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  if (!user) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={sectionInner}>
          <h2>Vui lòng đăng nhập để sử dụng Webmail</h2>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dang-nhap'); }} style={{ color: '#2563eb', fontWeight: 600 }}>Đăng nhập ngay</a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={sectionInner}>
        <div style={styles.layout}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <button style={styles.composeBtn} onClick={() => { setShowCompose(true); setSelectedId(null); setSelectedEmail(null); }}>
              ✏️ Soạn thư
            </button>
            <div style={styles.folderList}>
              <div
                style={{ ...styles.folderItem, ...(folder === 'inbox' ? styles.folderActive : {}) }}
                onClick={() => { setFolder('inbox'); setSelectedId(null); setSelectedEmail(null); }}
              >
                📥 Hộp thư đến
              </div>
              <div
                style={{ ...styles.folderItem, ...(folder === 'sent' ? styles.folderActive : {}) }}
                onClick={() => { setFolder('sent'); setSelectedId(null); setSelectedEmail(null); }}
              >
                📤 Thư đã gửi
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={styles.main}>
            {success && <div style={styles.successBar}>{success}</div>}

            {/* Compose form */}
            {showCompose ? (
              <div style={styles.composePanel}>
                <div style={styles.composeHeader}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Soạn thư mới</h3>
                  <button style={styles.closeBtn} onClick={() => { setShowCompose(false); setError(''); }}>✕</button>
                </div>
                <form onSubmit={handleSend}>
                  <div style={styles.field}>
                    <label style={styles.label}>Người nhận</label>
                    <input
                      style={styles.input}
                      type="email"
                      placeholder="email@domain.com"
                      value={composeForm.to}
                      onChange={e => setComposeForm({ ...composeForm, to: e.target.value })}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Tiêu đề</label>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Tiêu đề email"
                      value={composeForm.subject}
                      onChange={e => setComposeForm({ ...composeForm, subject: e.target.value })}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Nội dung</label>
                    <textarea
                      style={styles.textarea}
                      rows={12}
                      placeholder="Nội dung email..."
                      value={composeForm.body}
                      onChange={e => setComposeForm({ ...composeForm, body: e.target.value })}
                    />
                  </div>
                  {error && <div style={styles.errorText}>{error}</div>}
                  <div style={styles.composeActions}>
                    <button type="submit" style={styles.sendBtn} disabled={sending}>
                      {sending ? 'Đang gửi...' : '📨 Gửi email'}
                    </button>
                    <button type="button" style={styles.cancelBtn} onClick={() => { setShowCompose(false); setError(''); }}>
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            ) : selectedEmail ? (
              /* Email detail */
              <div style={styles.detailPanel}>
                <div style={styles.detailHeader}>
                  <button style={styles.backBtn} onClick={() => { setSelectedId(null); setSelectedEmail(null); }}>
                    ← Quay lại
                  </button>
                  <button style={styles.delBtn} onClick={(e) => handleDelete(selectedEmail.id, e)}>
                    🗑 Xóa
                  </button>
                </div>
                <h2 style={styles.detailSubject}>{selectedEmail.subject}</h2>
                <div style={styles.detailMeta}>
                  <div style={styles.metaRow}><strong>Từ:</strong> {selectedEmail.fromName || selectedEmail.from} &lt;{selectedEmail.from}&gt;</div>
                  <div style={styles.metaRow}><strong>Đến:</strong> {selectedEmail.to}</div>
                  <div style={styles.metaRow}><strong>Ngày:</strong> {new Date(selectedEmail.sentAt).toLocaleString('vi-VN')}</div>
                </div>
                <div style={styles.detailBody}>{selectedEmail.body}</div>
              </div>
            ) : (
              /* Email list */
              <div style={styles.listPanel}>
                <h3 style={styles.listTitle}>
                  {folder === 'inbox' ? '📥 Hộp thư đến' : '📤 Thư đã gửi'}
                </h3>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Đang tải...</div>
                ) : emails.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                    {folder === 'inbox' ? 'Hộp thư trống' : 'Chưa có thư nào được gửi'}
                  </div>
                ) : (
                  <div style={styles.emailList}>
                    {emails.map(email => (
                      <div
                        key={email.id}
                        style={{ ...styles.emailRow, ...(selectedId === email.id ? styles.emailRowActive : {}), ...(!email.read && folder === 'inbox' ? styles.emailRowUnread : {}) }}
                        onClick={() => handleSelect(email.id)}
                      >
                        <div style={styles.emailRowLeft}>
                          <span style={styles.emailFrom}>
                            {folder === 'inbox' ? email.fromName || email.from : email.to}
                          </span>
                          <span style={styles.emailSubject}>{email.subject}</span>
                        </div>
                        <div style={styles.emailRowRight}>
                          <span style={styles.emailDate}>{formatDate(email.sentAt)}</span>
                          <button style={styles.rowDelBtn} onClick={(e) => handleDelete(email.id, e)} title="Xóa">
                            🗑
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: '#f8fafc',
    minHeight: 'calc(100vh - 200px)',
    padding: '24px 0',
    fontFamily: "'Inter', sans-serif",
  },
  layout: {
    display: 'flex',
    gap: 24,
    background: '#fff',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    minHeight: 600,
    overflow: 'hidden',
  },
  sidebar: {
    width: 220,
    borderRight: '1px solid #e2e8f0',
    padding: 20,
    flexShrink: 0,
    background: '#fafbfc',
  },
  composeBtn: {
    width: '100%', padding: '12px 0', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
    cursor: 'pointer', marginBottom: 20,
  },
  folderList: { display: 'flex', flexDirection: 'column', gap: 4 },
  folderItem: {
    padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', gap: 8,
  },
  folderActive: { background: '#eff6ff', color: '#2563eb', fontWeight: 600 },
  main: { flex: 1, padding: 20, overflow: 'hidden' },
  successBar: {
    padding: '10px 16px', background: '#ecfdf5', color: '#065f46', borderRadius: 8,
    marginBottom: 16, fontSize: 14, fontWeight: 500,
  },

  // Compose
  composePanel: { maxWidth: 640 },
  composeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  closeBtn: {
    background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94a3b8',
  },
  field: { marginBottom: 16 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 },
  input: {
    width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8,
    fontSize: 14, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, outline: 'none', boxSizing: 'border-box',
  },
  errorText: { color: '#dc2626', fontSize: 13, marginBottom: 12 },
  composeActions: { display: 'flex', gap: 12 },
  sendBtn: {
    padding: '10px 28px', background: '#2563eb', color: '#fff', border: 'none',
    borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
  cancelBtn: {
    padding: '10px 28px', background: '#f1f5f9', color: '#475569', border: 'none',
    borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
  },

  // List
  listPanel: {},
  listTitle: { fontSize: 18, fontWeight: 700, margin: '0 0 16px' },
  emailList: { border: '1px solid #f1f5f9', borderRadius: 8, overflow: 'hidden' },
  emailRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer', transition: 'background 0.15s',
  },
  emailRowActive: { background: '#eff6ff' },
  emailRowUnread: { background: '#f8fafc', fontWeight: 600 },
  emailRowLeft: { display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 },
  emailFrom: { fontSize: 14, color: '#1e293b' },
  emailSubject: { fontSize: 13, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  emailRowRight: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
  emailDate: { fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' },
  rowDelBtn: {
    background: 'none', border: 'none', fontSize: 14, cursor: 'pointer',
    opacity: 0.5, padding: 4, lineHeight: 1,
  },

  // Detail
  detailPanel: {},
  detailHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: {
    padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: 8,
    fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#475569',
  },
  delBtn: {
    padding: '8px 16px', background: '#fef2f2', color: '#dc2626', border: 'none',
    borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
  },
  detailSubject: { fontSize: 22, fontWeight: 700, margin: '0 0 16px', color: '#1e293b' },
  detailMeta: {
    background: '#f8fafc', borderRadius: 8, padding: 16, marginBottom: 20,
    fontSize: 14, color: '#475569', lineHeight: 1.8,
  },
  metaRow: {},
  detailBody: {
    fontSize: 14, lineHeight: 1.8, color: '#334155',
    whiteSpace: 'pre-wrap', padding: '0 4px',
  },
};
