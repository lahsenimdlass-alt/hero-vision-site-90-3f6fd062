import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

interface FormattedTextProps {
  contentKey: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Parse text with formatting markers.
 * Format: [format:bold,size:18]Text content
 */
export const parseFormattedText = (content: string) => {
  const formatMatch = content.match(/^\[format:(.*?)\]/);
  if (!formatMatch) {
    return { text: content, isBold: false, fontSize: undefined };
  }

  const formatString = formatMatch[1];
  const isBold = formatString.includes("bold");
  const sizeMatch = formatString.match(/size:(\d+)/);
  const fontSize = sizeMatch ? parseInt(sizeMatch[1]) : undefined;
  const text = content.replace(/^\[format:.*?\]/, "");

  return { text, isBold, fontSize };
};

export const FormattedText: React.FC<FormattedTextProps> = ({
  contentKey,
  className = "",
  as: Component = "span",
}) => {
  const { language } = useLanguage();
  
  // Fetch content from database
  const { data: dbContent } = useQuery({
    queryKey: ['site_content_formatted', contentKey, language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('content_key', contentKey)
        .eq('language', language)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching formatted content:', error);
        return null;
      }
      return data?.content || null;
    },
    staleTime: 1000 * 60 * 5,
  });

  // Get the raw content - prioritize database, fallback to static
  const rawContent = dbContent || (translations[language] as Record<string, string>)[contentKey] || contentKey;
  
  const { text, isBold, fontSize } = parseFormattedText(rawContent);

  const style: React.CSSProperties = {};
  if (isBold) style.fontWeight = "bold";
  if (fontSize) style.fontSize = `${fontSize}px`;

  return (
    <Component className={className} style={style}>
      {text}
    </Component>
  );
};

export default FormattedText;
