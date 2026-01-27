import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { translations, Language } from "@/i18n/translations";
import { useLanguage } from "@/contexts/LanguageContext";

interface SiteContent {
  id: string;
  content_key: string;
  language: string;
  content: string;
  page: string;
  section: string;
  updated_at: string;
  updated_by: string | null;
}

// Fetch all content for a specific language
export const useSiteContentByLanguage = (language: Language) => {
  return useQuery({
    queryKey: ["site_content", language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("language", language);

      if (error) throw error;
      return data as SiteContent[];
    },
  });
};

// Fetch all content (both languages) for admin
export const useAllSiteContent = () => {
  return useQuery({
    queryKey: ["site_content", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page")
        .order("section")
        .order("content_key");

      if (error) throw error;
      return data as SiteContent[];
    },
  });
};

// Hook to get translated content with database override
export const useTranslatedContent = () => {
  const { language } = useLanguage();
  const { data: dbContent } = useSiteContentByLanguage(language);

  const getContent = (key: string): string => {
    // First check if there's a database override
    const dbOverride = dbContent?.find((c) => c.content_key === key);
    if (dbOverride) {
      return dbOverride.content;
    }

    // Fall back to static translations
    const langTranslations = translations[language];
    return (langTranslations as Record<string, string>)[key] || key;
  };

  return { getContent, language };
};

// Mutation to upsert content
export const useUpsertContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: {
      content_key: string;
      language: string;
      content: string;
      page: string;
      section: string;
    }) => {
      const { data, error } = await supabase
        .from("site_content")
        .upsert(
          {
            content_key: content.content_key,
            language: content.language,
            content: content.content,
            page: content.page,
            section: content.section,
          },
          {
            onConflict: "content_key,language",
          }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};

// Mutation to delete content (reverts to static translation)
export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("site_content").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};

// Helper to get all translation keys organized by page/section
export const getTranslationStructure = () => {
  const structure: Record<string, Record<string, string[]>> = {};

  Object.keys(translations.fr).forEach((key) => {
    const parts = key.split(".");
    const page = parts[0];
    const section = parts.length > 2 ? parts[1] : "main";

    if (!structure[page]) {
      structure[page] = {};
    }
    if (!structure[page][section]) {
      structure[page][section] = [];
    }
    structure[page][section].push(key);
  });

  return structure;
};
