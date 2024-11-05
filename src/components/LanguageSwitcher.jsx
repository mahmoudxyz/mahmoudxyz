// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useLanguage } from './contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
    >
      {language.code === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;