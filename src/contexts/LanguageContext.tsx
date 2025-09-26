import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'vi';
import { en, vi } from '../translations';
// Complete fallback translation object that matches the full structure
const fallbackTranslations = {
  en,
  vi
};

// Try to import actual translations, fall back to our comprehensive fallback

let TranslationKeys: any;

try {
 
  TranslationKeys = TranslationKeys;
} catch (error) {
  console.warn('Using fallback translations due to import error:', error);
  TranslationKeys = typeof en;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any; // Use any to avoid TypeScript issues with fallback
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en,
  vi
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mmo2025_language');
      return (saved === 'en' || saved === 'vi') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mmo2025_language', lang);
    } catch (error) {
      console.warn('Could not save language preference to localStorage:', error);
    }
  };

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Ensure we always have valid translations with proper fallback
  const currentTranslations = translations[language] || translations.en || en;

  const value = {
    language,
    setLanguage,
    t: currentTranslations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook for accessing translations directly
export function useTranslation() {
  try {
    const context = useContext(LanguageContext);
    if (!context || !context.t) {
      console.warn('Translation context not available, falling back to English');
      return en || fallbackTranslations.en;
    }
    
    // Ensure the translation object has the required structure
    const translation = context.t;
    if (!translation.nav || !translation.landing || !translation.landing.overview) {
      console.warn('Incomplete translation object, falling back to English');
      return en || fallbackTranslations.en;
    }
    
    return translation;
  } catch (error) {
    // If context access fails, fallback to English
    console.warn('Error accessing translation context, falling back to English:', error);
    return en || fallbackTranslations.en;
  }
}