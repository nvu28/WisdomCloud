import React from 'react';
import { useTranslation } from '../i18n';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useTranslation();

  return (
    <div
      onClick={toggleLang}
      style={styles.switcher}
      title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      {lang === 'vi' ? '🇬🇧' : '🇻🇳'}
    </div>
  );
}

const styles = {
  switcher: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    background: '#fff',
    fontSize: 16,
    lineHeight: 1,
    transition: 'all 0.2s',
    userSelect: 'none',
    marginLeft: 'auto',
  },
};
