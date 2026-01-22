import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { CheckCircle } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import controleGestionHeroImage from "@/assets/controle-gestion-hero.jpeg";

const ControleGestion = () => {
  const { data: controleImage } = useSiteImage("controle_gestion_image");
  const { t } = useLanguage();

  const interventions = [
    t('controle.intervention1'),
    t('controle.intervention2'),
    t('controle.intervention3'),
    t('controle.intervention4'),
    t('controle.intervention5'),
    t('controle.intervention6'),
  ];

  const objectifs = [
    { title: t('controle.obj1_title'), description: t('controle.obj1_desc') },
    { title: t('controle.obj2_title'), description: t('controle.obj2_desc') },
    { title: t('controle.obj3_title'), description: t('controle.obj3_desc') },
    { title: t('controle.obj4_title'), description: t('controle.obj4_desc') },
    { title: t('controle.obj5_title'), description: t('controle.obj5_desc') },
    { title: t('controle.obj6_title'), description: t('controle.obj6_desc') },
    { title: t('controle.obj7_title'), description: t('controle.obj7_desc') },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-white font-medium uppercase tracking-wide mb-4">
              {t('controle.label')}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('controle.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              {t('controle.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nos Interventions */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('controle.interventions_title')}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={controleImage?.image_url || controleGestionHeroImage} 
                alt={controleImage?.alt_text || t('controle.label')} 
                className="w-full h-80 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            <div className="bg-card rounded-2xl p-8 lg:p-10 border border-border">
              <ul className="space-y-6">
                {interventions.map((intervention, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-foreground text-lg">{intervention}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectif Global */}
      <section className="py-16 lg:py-20 bg-accent/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">🎯</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {t('controle.global_objective')}
              </h2>
            </div>
            <p className="text-foreground leading-relaxed">
              {t('controle.global_objective_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('controle.specific_objectives')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectifs.map((objectif, idx) => (
              <motion.div
                key={objectif.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white/10 rounded-xl backdrop-blur-sm text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2 text-white">
                  {objectif.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {objectif.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ControleGestion;
