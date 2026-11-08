'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language, dictionaries } from './dictionaries';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof dictionaries)['en'];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: dictionaries.en,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  // English-only website mode
  const [language] = useState<Language>('en');

  const setLanguage = () => {};
  const toggleLanguage = () => {};

  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage,
        toggleLanguage,
        t: dictionaries.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
