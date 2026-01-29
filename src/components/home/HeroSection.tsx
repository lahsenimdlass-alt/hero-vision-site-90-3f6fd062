import { motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormattedText } from "@/components/ui/FormattedText";

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToContent = () => {
    const element = document.getElementById("about-preview");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen md:min-h-[700px] flex items-center justify-center overflow-hidden py-20 md:py-0">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.2] md:scale-100"
        >
          <source src="/videos/hero-fluid-sphere.mp4" type="video/mp4" />
        </video>
        {/* Navy overlay pour l'identité visuelle */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(212,55%,12%,0.8)] via-[hsl(212,55%,18%,0.7)] to-[hsl(212,55%,15%,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-white px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-wide uppercase mb-3 md:mb-4"
          >
            <FormattedText contentKey="hero.company_name" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6 text-white"
          >
            {t('hero.title_line1')}<br />
            <span className="text-[hsl(212,55%,85%)]">{t('hero.title_line2')}</span><br />
            <span className="text-[hsl(212,55%,85%)]">{t('hero.title_line3')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mb-6 md:mb-8 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="tel:+212701221464"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 bg-white text-foreground rounded-md hover:bg-white/90 shadow-sm"
            >
              <Phone className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              +212 701 221 464
            </a>
          </motion.div>

          {/* Statistics with Animated Counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20"
          >
            <AnimatedCounter
              end={23}
              suffix="+"
              duration={2.5}
              delay={0}
              label={t('hero.years_experience')}
            />
            <AnimatedCounter
              end={5}
              suffix="+"
              duration={1.8}
              delay={0.2}
              label={t('hero.expertise_areas')}
            />
            <AnimatedCounter
              end={70}
              suffix="%"
              duration={2.2}
              delay={0.4}
              label={t('hero.subsidy_possible')}
            />
            <AnimatedCounter
              end={100}
              suffix="%"
              duration={2.8}
              delay={0.6}
              label={t('hero.custom_made')}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors cursor-pointer hidden sm:block"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
