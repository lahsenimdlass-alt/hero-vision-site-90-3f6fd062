import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { GraduationCap, CheckCircle, FileText, Users, Building2, Star, Settings, User, PiggyBank, Handshake, Monitor } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import useDocumentSEO from "@/hooks/useDocumentSEO";
import formationDefaultImage from "@/assets/formation.jpeg";

const Formation = () => {
  const { data: formationImage } = useSiteImage("formation_image");
  const { t } = useLanguage();

  useDocumentSEO({
    title: "Formation Professionnelle au Maroc | CGC Casablanca",
    description: "Formations professionnelles sur-mesure à Casablanca : management, finance, RH, achats, digital. Éligibles CSF/OFPPT. Cabinet Général de Consulting.",
    path: "/formation",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Formation Professionnelle",
      "provider": { "@type": "Organization", "name": "Cabinet Général de Consulting" },
      "description": "Formations professionnelles sur-mesure : management, finance, RH, achats, digital. Éligibles CSF/OFPPT.",
      "areaServed": { "@type": "Country", "name": "Morocco" },
      "serviceType": "Formation professionnelle",
    },
  });

  const trainingDomains = [
    { icon: Star, title: t('formation.domain1'), description: t('formation.domain1_desc') },
    { icon: Settings, title: t('formation.domain2'), description: t('formation.domain2_desc') },
    { icon: User, title: t('formation.domain3'), description: t('formation.domain3_desc') },
    { icon: PiggyBank, title: t('formation.domain4'), description: t('formation.domain4_desc') },
    { icon: Handshake, title: t('formation.domain5'), description: t('formation.domain5_desc') },
    { icon: Monitor, title: t('formation.domain6'), description: t('formation.domain6_desc') }
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white font-medium uppercase tracking-wide mb-4">{t('formation.label')}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('formation.title')}</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">{t('formation.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction with Image */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <GraduationCap className="w-10 h-10 text-accent" />
              </div>
              <p className="text-lg text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t('formation.intro').replace('experts pluridisciplinaires', '<strong>experts pluridisciplinaires</strong>').replace('plus de 20 ans d\'expérience', '<strong>plus de 20 ans d\'expérience</strong>').replace('multidisciplinary experts', '<strong>multidisciplinary experts</strong>').replace('over 20 years of experience', '<strong>over 20 years of experience</strong>') }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <img src={formationImage?.image_url || formationDefaultImage} alt={formationImage?.alt_text || t('formation.title')} loading="lazy" className="rounded-2xl shadow-xl w-full h-64 lg:h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domaines de formation */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t('formation.domains_title')}</h2>
            <p className="text-foreground max-w-2xl mx-auto">{t('formation.domains_subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingDomains.map((domain, index) => (
              <motion.div key={domain.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="pt-8 text-center">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{domain.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed">{domain.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            
            {/* Éligibilité CSF / OFPPT */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('formation.csf_title')}</h2>
              </div>
              
              <p className="text-foreground mb-4">{t('formation.csf_desc1')}</p>
              <p className="text-foreground mb-6">{t('formation.csf_desc2')}</p>

              <h3 className="font-semibold text-foreground mb-4">🔹 {t('formation.csf_support')}</h3>
              <p className="text-foreground mb-4">{t('formation.csf_support_intro')}</p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.csf_item1')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.csf_item2')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.csf_item3')}</span></li>
              </ul>
              
              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground"><strong>🎯 {t('formation.csf_objective')}</strong></p>
              </div>
            </motion.div>

            {/* Étude d'ingénierie de formation */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('formation.engineering_title')}</h2>
              </div>
              
              <p className="text-accent font-semibold mb-4">{t('formation.engineering_subtitle')}</p>
              <p className="text-foreground mb-6">{t('formation.engineering_desc')}</p>

              <h3 className="font-semibold text-foreground mb-4">{t('formation.engineering_benefits')}</h3>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.engineering_benefit1')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.engineering_benefit2')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.engineering_benefit3')}</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" /><span className="text-foreground">{t('formation.engineering_benefit4')}</span></li>
              </ul>
              
              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground font-semibold">🎯 {t('formation.engineering_cta')}</p>
              </div>
            </motion.div>

            {/* Formations intra-entreprise */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('formation.intra_title')}</h2>
              </div>
              
              <p className="text-foreground mb-6">{t('formation.intra_desc')}</p>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ {t('formation.intra_point1_title')}</h4>
                  <p className="text-foreground">{t('formation.intra_point1_desc')}</p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ {t('formation.intra_point2_title')}</h4>
                  <p className="text-foreground">{t('formation.intra_point2_desc')}</p>
                </div>
              </div>
            </motion.div>

            {/* Formations inter-entreprise */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('formation.inter_title')}</h2>
              </div>
              
              <p className="text-accent font-semibold mb-6">{t('formation.inter_subtitle')}</p>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ {t('formation.inter_point1_title')}</h4>
                  <p className="text-foreground">{t('formation.inter_point1_desc')}</p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ {t('formation.inter_point2_title')}</h4>
                  <p className="text-foreground">{t('formation.inter_point2_desc')}</p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ {t('formation.inter_point3_title')}</h4>
                  <p className="text-foreground">{t('formation.inter_point3_desc')}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Formation;
