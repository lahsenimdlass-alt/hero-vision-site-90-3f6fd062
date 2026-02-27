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
