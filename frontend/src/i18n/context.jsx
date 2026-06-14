import React, { createContext, useState, useCallback } from 'react';
import vi from './vi';
import en from './en';

const LANGUAGES = { vi, en };
const DEFAULT_LANG = 'vi';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let val = LANGUAGES[lang];
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        // fallback to vi
        let fallback = LANGUAGES['vi'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return fallback;
      }
    }
    return val;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'vi' ? 'en' : 'vi');
  }, []);

  const translations = LANGUAGES[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
