import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import MotDirectionPreview from "@/components/home/MotDirectionPreview";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import ValuesSection from "@/components/home/ValuesSection";
import useDocumentSEO from "@/hooks/useDocumentSEO";

const Index = () => {
  useDocumentSEO({
    title: "Cabinet Général de Consulting | Conseil & Accompagnement Maroc",
    description: "CGC, cabinet de conseil à Casablanca. Accompagnement stratégique, contrôle de gestion, formation professionnelle et recrutement. +23 ans d'expertise au Maroc.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Cabinet Général de Consulting",
      "alternateName": "CGC",
      "url": "https://cabinetgeneraldeconsulting.ma",
      "description": "Cabinet de conseil stratégique spécialisé en accompagnement d'entreprises, contrôle de gestion, formation et recrutement au Maroc.",
      "foundingDate": "2002",
      "telephone": "+212701221464",
      "address": { "@type": "PostalAddress", "addressLocality": "Casablanca", "addressCountry": "MA" },
      "areaServed": { "@type": "Country", "name": "Morocco" },
      "serviceType": ["Conseil stratégique", "Accompagnement d'entreprises", "Contrôle de gestion", "Formation professionnelle", "Recrutement"],
    },
  });

  return (
    <Layout>
      <HeroSection />
      <MotDirectionPreview />
      <AboutPreview />
      <WhyChooseUs />
      <ValuesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
