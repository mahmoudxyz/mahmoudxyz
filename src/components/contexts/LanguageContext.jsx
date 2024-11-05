// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: {
    code: 'en',
    dir: 'ltr',
    name: 'English'
  },
  ar: {
    code: 'ar',
    dir: 'rtl',
    name: 'العربية'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(languages.en);

  useEffect(() => {
    // Set direction on html element
    document.documentElement.dir = language.dir;
    document.documentElement.lang = language.code;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev.code === 'en' ? languages.ar : languages.en);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);