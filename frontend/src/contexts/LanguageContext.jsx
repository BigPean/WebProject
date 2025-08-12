import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // 检测浏览器语言
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';
      const langCode = browserLang.split('-')[0].toLowerCase();

      // 检查是否支持该语言
      if (translations[langCode]) {
        return langCode;
      }
      // 默认返回英文
      return 'en';
    };

    const savedLanguage = localStorage.getItem('preferred-language');
    const initialLanguage = savedLanguage || detectBrowserLanguage();
    setCurrentLanguage(initialLanguage);
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
