import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import MotDirectionPreview from "@/components/home/MotDirectionPreview";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import ValuesSection from "@/components/home/ValuesSection";

const Index = () => {
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
