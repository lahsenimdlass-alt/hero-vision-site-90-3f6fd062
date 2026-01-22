import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroPotentielImage from "@/assets/hero-potentiel.jpeg";

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-background">
      <div className="container-custom px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden relative"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mb-6 sm:mb-8">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary group text-sm sm:text-base">
                  {t('cta.get_quote')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+212701221464"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition-all duration-300 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  +212 701 221 464
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={heroPotentielImage} 
                alt={t('cta.title')} 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
