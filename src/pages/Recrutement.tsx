import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { UserCheck, CheckCircle, Target, Search, Award, Handshake } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import handshakeImage from "@/assets/business-handshake.jpg";

const Recrutement = () => {
  const { data: recrutementImage } = useSiteImage("recrutement_image");
  const { t } = useLanguage();

  const profils = [
    t('recrutement.profile1'),
    t('recrutement.profile2'),
    t('recrutement.profile3'),
    t('recrutement.profile4'),
    t('recrutement.profile5'),
  ];

  const approche = [
    {
      icon: Target,
      title: t('recrutement.step1_title'),
      items: [t('recrutement.step1_item1'), t('recrutement.step1_item2'), t('recrutement.step1_item3')]
    },
    {
      icon: Search,
      title: t('recrutement.step2_title'),
      items: [t('recrutement.step2_item1'), t('recrutement.step2_item2'), t('recrutement.step2_item3')]
    },
    {
      icon: Award,
      title: t('recrutement.step3_title'),
      items: [t('recrutement.step3_item1'), t('recrutement.step3_item2'), t('recrutement.step3_item3')]
    },
    {
      icon: Handshake,
      title: t('recrutement.step4_title'),
      items: [t('recrutement.step4_item1'), t('recrutement.step4_item2')]
    },
  ];

  const objectifs = [t('recrutement.obj1'), t('recrutement.obj2'), t('recrutement.obj3')];

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white font-medium uppercase tracking-wide mb-4">{t('recrutement.label')}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('recrutement.title')}</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">{t('recrutement.description')}</p>
            <p className="text-primary-foreground/80 text-base mt-4">{t('recrutement.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Profils recrutés */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('recrutement.profiles_title')}</h2>
                  <p className="text-foreground">{t('recrutement.profiles_subtitle')}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {profils.map((profil, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground font-medium">{profil}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground">{t('recrutement.profiles_note')}</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={recrutementImage?.image_url || handshakeImage} alt={recrutementImage?.alt_text || t('recrutement.title')} loading="lazy" className="rounded-2xl shadow-xl w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Approche */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t('recrutement.approach_title')}</h2>
            <p className="text-foreground max-w-2xl mx-auto">{t('recrutement.approach_desc')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {approche.map((etape, index) => (
              <motion.div key={etape.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <etape.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{etape.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {etape.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">{t('recrutement.objectives_title')}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {objectifs.map((objectif, idx) => (
                <div key={idx} className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-8 h-8 text-white mx-auto mb-4" />
                  <p className="text-white/90">{objectif}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Recrutement;
