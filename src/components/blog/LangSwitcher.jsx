import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'cz', name: 'Čeština', flag: '🇨🇿' }
];

const LangSwitcher = ({ availableLanguages, currentSlug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSlugForLanguage = (langCode) => {
    // if (langCode === 'en') return currentSlug.replace(/-[a-z]{2}$/, '');
    return `${currentSlug.replace(/-[a-z]{2}$/, '')}-${langCode}`;
  };

  const handleLanguageChange = (langCode) => {
    const newSlug = getSlugForLanguage(langCode);
    setLanguage(languages.find(lang => lang.code === langCode));
    setIsOpen(false);
    navigate(`/blog/${newSlug}`);
  };

  const currentLang = languages.find(lang => lang.code === language.code);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 
                   hover:bg-gray-50 dark:hover:bg-gray-700 
                   shadow-sm hover:shadow-md transition-all duration-200
                   border border-gray-200 dark:border-gray-700
                   text-gray-700 dark:text-gray-300"
        aria-label="Toggle language menu"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium flex items-center gap-2">
          <span>{currentLang.flag}</span>
          <span>{currentLang.name}</span>
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg 
                    bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                    transform transition-all duration-200 origin-top-right
                    ${isOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 translate-y-2 invisible'
                    }`}
      >
        <div className="p-1 divide-y divide-gray-100 dark:divide-gray-700" role="menu">
          {languages
            .filter(lang => availableLanguages.includes(lang.code))
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg
                          flex items-center justify-between
                          ${language.code === lang.code 
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                          transition-colors duration-150`}
                role="menuitem"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </span>
                {language.code === lang.code && (
                  <Check className="h-4 w-4 text-blue-500" />
                )}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LangSwitcher;