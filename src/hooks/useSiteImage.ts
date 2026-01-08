import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteImageRecord = {
  section_key: string;
  image_url: string;
  alt_text: string | null;
  updated_at: string;
};

function withCacheBuster(url: string, updatedAt?: string) {
  if (!url) return url;
  const v = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}v=${v}`;
}

export function useSiteImage(sectionKey: string) {
  return useQuery({
    queryKey: ["site_image", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("section_key,image_url,alt_text,updated_at")
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        image_url: withCacheBuster(data.image_url, data.updated_at),
      } as SiteImageRecord;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
