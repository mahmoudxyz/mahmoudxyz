import React, { createContext, useContext, useState } from 'react';

const defaultLanguage = {
  code: 'en',
  name: 'English',
  flag: '🇬🇧',
  dir: 'ltr'
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const value = {
    language,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;