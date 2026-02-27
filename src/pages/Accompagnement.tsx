import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Settings, BarChart3, Users, ShoppingCart, TrendingUp, Cog, Truck, CheckCircle, Monitor, Award, Target } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import useDocumentSEO from "@/hooks/useDocumentSEO";
import conseilAccompagnementImage from "@/assets/conseil-accompagnement.jpeg";

const Accompagnement = () => {
  const { data: accompagnementImage } = useSiteImage("accompagnement_image");
  const { t } = useLanguage();

  useDocumentSEO({
    title: "Accompagnement & Conseil Stratégique | CGC Casablanca Maroc",
    description: "Accompagnement stratégique des entreprises au Maroc : finance, RH, achats, commercial, production, logistique et SI. Cabinet Général de Consulting.",
    path: "/accompagnement",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Accompagnement & Conseil Stratégique",
      "provider": { "@type": "Organization", "name": "Cabinet Général de Consulting" },
      "description": "Accompagnement stratégique des entreprises : finance, RH, achats, commercial, production, logistique et systèmes d'information.",
      "areaServed": { "@type": "Country", "name": "Morocco" },
      "serviceType": "Conseil en management",
    },
  });

  const fonctions = [
    {
      icon: BarChart3,
      title: t('accompagnement.finance'),
      description: t('accompagnement.finance_desc'),
      subtitle: t('accompagnement.finance_subtitle'),
      subtitleDesc: t('accompagnement.finance_subtitle_desc'),
      sectionTitle: t('accompagnement.finance_objectives_title'),
      details: [t('accompagnement.finance_obj1'), t('accompagnement.finance_obj2'), t('accompagnement.finance_obj3'), t('accompagnement.finance_obj4')],
      objectifGlobal: t('accompagnement.finance_global_obj')
    },
    {
      icon: Users,
      title: t('accompagnement.hr'),
      description: t('accompagnement.hr_desc'),
      sectionTitle: t('accompagnement.hr_actions'),
      details: [
        "Diagnostic et structuration de la fonction RH",
        "Mise en place de politiques RH (organisation, fiches de poste, processus)",
        "Gestion des compétences, plans de formation et accompagnement du changement",
        "Appui au recrutement de profils clés",
        "Optimisation des processus administratifs RH",
      ],
      objectif: t('accompagnement.hr_obj')
    },
    {
      icon: ShoppingCart,
      title: t('accompagnement.purchasing'),
      description: t('accompagnement.purchasing_desc'),
      sectionTitle: t('accompagnement.purchasing_actions'),
      details: [
        "Diagnostic et restructuration de la fonction achats",
        "Mise en place de procédures et politiques achats",
        "Optimisation des coûts et gestion des fournisseurs",
        "Analyse des dépenses et suivi de la performance achats",
        "Mise en place d'indicateurs de pilotage achats",
      ],
      objectif: t('accompagnement.purchasing_obj')
    },
    {
      icon: TrendingUp,
      title: t('accompagnement.commercial'),
      description: t('accompagnement.commercial_desc'),
      sectionTitle: t('accompagnement.commercial_actions'),
      details: [
        "Structuration de l'organisation commerciale",
        "Définition des objectifs, indicateurs de performance et reporting commercial",
        "Optimisation des processus de vente et de suivi clients",
        "Aide à la fixation des prix et à l'analyse de la rentabilité client",
        "Alignement entre stratégie commerciale et objectifs financiers",
      ],
      objectif: t('accompagnement.commercial_obj')
    },
    {
      icon: Cog,
      title: t('accompagnement.production'),
      description: t('accompagnement.production_desc'),
      sectionTitle: t('accompagnement.production_actions'),
      details: [
        "Analyse des processus de production",
        "Mise en place de KPI industriels",
        "Optimisation des coûts de production et des rendements",
        "Amélioration de la planification et du suivi de production",
        "Accompagnement à la mise en place du contrôle de gestion industriel",
      ],
      objectif: t('accompagnement.production_obj')
    },
    {
      icon: Truck,
      title: t('accompagnement.logistics'),
      description: t('accompagnement.logistics_desc'),
      sectionTitle: t('accompagnement.logistics_actions'),
      details: [
        "Diagnostic des flux logistiques et de la chaîne d'approvisionnement",
        "Optimisation des stocks et des délais",
        "Mise en place d'indicateurs de performance logistique",
        "Amélioration de la coordination entre achats, production et distribution",
        "Réduction des coûts logistiques globaux",
      ],
      objectif: t('accompagnement.logistics_obj')
    },
    {
      icon: Monitor,
      title: t('accompagnement.it'),
      description: t('accompagnement.it_desc'),
      sectionTitle: t('accompagnement.it_actions'),
      details: [
        "Diagnostic et alignement stratégique du SI",
        "Accompagnement à la mise en place ou au changement de SI",
        "Définition des besoins fonctionnels et rédaction des cahiers des charges",
        "Optimisation des processus et fiabilisation de l'information",
        "Mise en place de reportings et tableaux de bord de pilotage",
      ],
      objectif: t('accompagnement.it_obj')
    },
    {
      icon: Award,
      title: t('accompagnement.certifications'),
      description: t('accompagnement.certifications_desc'),
      details: [
        "Préparation et accompagnement aux certifications",
        "Structuration des processus et procédures",
        "Mise en place de systèmes de management",
        "Formation et sensibilisation des équipes aux exigences des normes",
        "Développement d'une culture qualité, performance et conformité",
      ],
      objectif: t('accompagnement.certifications_obj')
    },
  ];

  const valeurAjoutee = [t('accompagnement.value1'), t('accompagnement.value2'), t('accompagnement.value3'), t('accompagnement.value4')];

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white font-medium uppercase tracking-wide mb-4">{t('accompagnement.label')}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('accompagnement.title')}</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">{t('accompagnement.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{t('accompagnement.approach_title')}</h2>
              </div>

              <p className="text-foreground mb-6">{t('accompagnement.approach_desc')}</p>

              <div className="space-y-4 mb-8">
                {[t('accompagnement.pillar1'), t('accompagnement.pillar2'), t('accompagnement.pillar3')].map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <p className="text-foreground">{pillar}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground font-medium"><span className="mr-2">🎯</span><strong>{t('accompagnement.objective')}</strong></p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={accompagnementImage?.image_url || conseilAccompagnementImage} alt={accompagnementImage?.alt_text || t('accompagnement.approach_title')} loading="lazy" className="rounded-2xl shadow-xl w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fonctions */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t('accompagnement.domains_title')}</h2>
            <p className="text-foreground max-w-2xl mx-auto">{t('accompagnement.domains_subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {fonctions.map((fonction, index) => (
              <motion.div key={fonction.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <fonction.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-4">{fonction.title}</h3>
                <p className="text-foreground text-sm mb-4">{fonction.description}</p>

                {fonction.subtitle && (
                  <div className="mb-4">
                    <p className="text-foreground font-medium text-sm mb-2">{fonction.subtitle}</p>
                    <p className="text-foreground text-sm">{fonction.subtitleDesc}</p>
                  </div>
                )}

                {fonction.sectionTitle && <p className="text-foreground font-semibold text-sm mb-3">{fonction.sectionTitle}</p>}

                <ul className="space-y-2 mb-4">
                  {fonction.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {fonction.objectifGlobal && (
                  <div className="p-4 bg-accent/10 rounded-xl border border-accent/20 mt-4">
                    <p className="text-sm text-foreground font-medium"><span className="mr-1">🎯</span><strong>{t('common.global_objective')} :</strong> {fonction.objectifGlobal}</p>
                  </div>
                )}

                {fonction.objectif && (
                  <p className="text-xs text-accent font-medium mt-4 pt-4 border-t border-border"><span className="mr-1">🎯</span>{fonction.objectif}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeur Ajoutée */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              <Target className="w-8 h-8 inline mr-2 text-white" />
              {t('accompagnement.value_title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {valeurAjoutee.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-white shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Accompagnement;
