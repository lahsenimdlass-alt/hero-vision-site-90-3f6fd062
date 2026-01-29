import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { translations, Language, TranslationKey } from '@/i18n/translations';
import { parseFormattedText } from '@/components/ui/FormattedText';

interface SiteContent {
  content_key: string;
  content: string;
}

interface FormattedContent {
  text: string;
  isBold: boolean;
  fontSize?: number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string) => string;
  tFormatted: (key: TranslationKey | string) => FormattedContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'fr') ? stored : 'fr';
  });

  // Fetch content from database for current language
  const { data: dbContent } = useQuery({
    queryKey: ['site_content', language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content_key, content')
        .eq('language', language);
      
      if (error) {
        console.error('Error fetching site content:', error);
        return [];
      }
      return data as SiteContent[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Create a map for quick lookups
  const contentMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    if (dbContent) {
      dbContent.forEach((item) => {
        map[item.content_key] = item.content;
      });
    }
    return map;
  }, [dbContent]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Get raw content (with formatting markers stripped for backwards compatibility)
  const t = (key: TranslationKey | string): string => {
    let rawContent: string;
    
    // First check if there's a database override
    if (contentMap[key]) {
      rawContent = contentMap[key];
    } else {
      // Fall back to static translations
      rawContent = (translations[language] as Record<string, string>)[key] || key;
    }
    
    // Strip formatting markers for backwards compatibility
    const { text } = parseFormattedText(rawContent);
    return text;
  };

  // Get formatted content with styling info
  const tFormatted = (key: TranslationKey | string): FormattedContent => {
    let rawContent: string;
    
    // First check if there's a database override
    if (contentMap[key]) {
      rawContent = contentMap[key];
    } else {
      // Fall back to static translations
      rawContent = (translations[language] as Record<string, string>)[key] || key;
    }
    
    return parseFormattedText(rawContent);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tFormatted }}>
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
