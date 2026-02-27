import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

/**
 * Sets the document <title> and <meta name="description"> for the current page.
 * Ensures only one title and one meta description exist at a time.
 */
const useDocumentSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // Cleanup: restore default on unmount
    return () => {
      document.title = "Cabinet Général de Consulting | Conseil Stratégique & Accompagnement au Maroc";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", "Cabinet Général de Consulting (CGC) - Experts en accompagnement stratégique, contrôle de gestion, formation professionnelle et recrutement à Casablanca, Maroc. Plus de 23 ans d'expérience.");
      }
    };
  }, [title, description]);
};

export default useDocumentSEO;
