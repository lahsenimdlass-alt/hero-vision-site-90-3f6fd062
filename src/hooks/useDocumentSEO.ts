import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "Cabinet Général de Consulting";
const BASE_URL = "https://cabinetgeneraldeconsulting.ma";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const setMetaTag = (property: string, content: string, isOg = false) => {
  const attr = isOg ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (el) {
    el.setAttribute("content", content);
  } else {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  }
};

const useDocumentSEO = ({ title, description, path = "/", type = "website", jsonLd }: SEOProps) => {
  useEffect(() => {
    const fullUrl = `${BASE_URL}${path}`;

    // Title
    document.title = title;

    // Meta description
    setMetaTag("description", description);

    // Open Graph
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:url", fullUrl, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:image", OG_IMAGE, true);
    setMetaTag("og:site_name", SITE_NAME, true);
    setMetaTag("og:locale", "fr_FR", true);

    // Twitter
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", OG_IMAGE);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = fullUrl;
    } else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = fullUrl;
      document.head.appendChild(canonical);
    }

    // JSON-LD
    let scriptEl = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Reset to defaults
      document.title = `${SITE_NAME} | Conseil Stratégique & Accompagnement au Maroc`;
      setMetaTag("description", "Cabinet Général de Consulting (CGC) - Experts en accompagnement stratégique, contrôle de gestion, formation professionnelle et recrutement à Casablanca, Maroc.");
      setMetaTag("og:url", BASE_URL, true);
      setMetaTag("og:title", `${SITE_NAME} | Conseil Stratégique au Maroc`, true);
      if (canonical) canonical.href = `${BASE_URL}/`;
      const s = document.querySelector('script[data-seo-jsonld]');
      if (s) s.remove();
    };
  }, [title, description, path, type, jsonLd]);
};

export default useDocumentSEO;
