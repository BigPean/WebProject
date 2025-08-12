import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../contexts/LanguageContext';

const languageNames = {
  en: 'EN',
  zh: '中',
  de: 'DE'
};

const languageFullNames = {
  en: 'English',
  zh: '中文',
  de: 'Deutsch'
};

export const LanguageToggle = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-background/80 backdrop-blur-sm border border-border",
          "hover:bg-accent hover:text-accent-foreground",
          "transition-all duration-200",
          "text-sm font-medium"
        )}
        aria-label={t('lang.switch')}
      >
        <Globe className="h-4 w-4" />
        <span>{languageNames[currentLanguage]}</span>
        <ChevronDown className={cn(
          "h-3 w-3 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className={cn(
            "absolute top-full right-0 mt-2 z-50",
            "bg-background border border-border rounded-lg shadow-lg",
            "min-w-[120px] py-1 backdrop-blur-sm"
          )}>
            {Object.keys(languageNames).map((langCode) => (
              <button
                key={langCode}
                onClick={() => handleLanguageChange(langCode)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  "transition-colors duration-150",
                  currentLanguage === langCode && "bg-accent text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{languageNames[langCode]}</span>
                  <span className="text-muted-foreground text-xs">
                    {languageFullNames[langCode]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
