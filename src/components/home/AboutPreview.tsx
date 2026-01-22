import { motion } from "framer-motion";
import { Settings, Monitor, GraduationCap, UserCheck, BarChart3 } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import notreMissionImage from "@/assets/notre-mission.jpeg";

const AboutPreview = () => {
  const { data: aboutImage } = useSiteImage("about_image");
  const { t } = useLanguage();

  const services = [
    { icon: Settings, text: t('about.service1') },
    { icon: Monitor, text: t('about.service2') },
    { icon: GraduationCap, text: t('about.service3') },
    { icon: UserCheck, text: t('about.service4') },
    { icon: BarChart3, text: t('about.service5') },
  ];

  return (
    <section id="about-preview" className="py-12 sm:py-16 lg:py-28 bg-background">
      <div className="container-custom px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            {t('about.who_are_we')}
          </h2>
          <p className="text-accent text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">
            {t('about.experts_subtitle')}
          </p>
          <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
            {t('about.intro_text')}
          </p>
          
          <p className="text-foreground font-bold text-lg sm:text-xl mb-6 sm:mb-8">{t('about.cgc_helps')}</p>
          
          <div className="flex flex-col gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 sm:p-5 bg-muted/50 rounded-xl border-l-4 border-accent"
              >
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base md:text-lg font-medium text-left">{service.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-14"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                {t('about.mission_title')}
              </h3>
              <p className="text-accent text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">
                {t('about.mission_subtitle')}
              </p>
              <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
                {t('about.mission_text1')}
              </p>
              <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                {t('about.mission_text2')}
              </p>
            </div>
            <div>
              <img 
                src={aboutImage?.image_url || notreMissionImage} 
                alt={aboutImage?.alt_text || t('about.mission_title')}
                loading="lazy"
                className="rounded-xl shadow-lg w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
