import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import {
  Settings,
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Cog,
  Truck,
  CheckCircle,
  Monitor,
  Award,
  Target,
} from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import conseilAccompagnementImage from "@/assets/conseil-accompagnement.jpeg";

const fonctions = [
  {
    icon: BarChart3,
    title: "Finance",
    description: "Nous accompagnons les directions financières dans la structuration, l'organisation et l'optimisation de la fonction Finance, afin d'en faire un véritable levier de pilotage de la performance et d'aide à la décision stratégique.",
    subtitle: "Un accompagnement global et intégré",
    subtitleDesc: "Notre intervention couvre l'ensemble de la chaîne financière, depuis l'organisation des équipes jusqu'au pilotage opérationnel, en passant par la fiabilisation de l'information financière.",
    sectionTitle: "Objectifs de l'accompagnement",
    details: [
      "Renforcer la qualité et la fiabilité des données financières",
      "Améliorer le pilotage de la performance et la visibilité financière",
      "Soutenir la prise de décision stratégique",
      "Optimiser les processus et l'organisation de la fonction Finance",
    ]
  },
  {
    icon: Users,
    title: "Ressources Humaines (RH)",
    description: "Nous accompagnons la fonction RH dans sa structuration afin de soutenir la performance humaine et organisationnelle.",
    sectionTitle: "Nos actions couvrent :",
    details: [
      "Diagnostic et structuration de la fonction RH",
      "Mise en place de politiques RH (organisation, fiches de poste, processus)",
      "Gestion des compétences, plans de formation et accompagnement du changement",
      "Appui au recrutement de profils clés",
      "Optimisation des processus administratifs RH",
    ],
    objectif: "Aligner les ressources humaines avec la stratégie de l'entreprise et renforcer l'engagement et la performance des équipes."
  },
  {
    icon: ShoppingCart,
    title: "Achats",
    description: "Nous aidons les entreprises à professionnaliser et optimiser leur fonction achats pour générer des économies durables et sécuriser les approvisionnements.",
    sectionTitle: "Nos interventions incluent :",
    details: [
      "Diagnostic et restructuration de la fonction achats",
      "Mise en place de procédures et politiques achats",
      "Optimisation des coûts et gestion des fournisseurs",
      "Analyse des dépenses et suivi de la performance achats",
      "Mise en place d'indicateurs de pilotage achats",
    ],
    objectif: "Réduction des coûts, sécurisation des approvisionnements et amélioration de la rentabilité."
  },
  {
    icon: TrendingUp,
    title: "Commercial",
    description: "Nous accompagnons la fonction commerciale dans l'amélioration de sa performance et de son pilotage.",
    sectionTitle: "Nos actions portent sur :",
    details: [
      "Structuration de l'organisation commerciale",
      "Définition des objectifs, indicateurs de performance et reporting commercial",
      "Optimisation des processus de vente et de suivi clients",
      "Aide à la fixation des prix et à l'analyse de la rentabilité client",
      "Alignement entre stratégie commerciale et objectifs financiers",
    ],
    objectif: "Croissance du chiffre d'affaires, amélioration des marges et fidélisation clients."
  },
  {
    icon: Cog,
    title: "Production",
    description: "Nous accompagnons les entreprises industrielles dans l'optimisation de leur fonction production afin d'améliorer la productivité et la maîtrise des coûts.",
    sectionTitle: "Nos interventions comprennent :",
    details: [
      "Analyse des processus de production",
      "Mise en place de KPI industriels",
      "Optimisation des coûts de production et des rendements",
      "Amélioration de la planification et du suivi de production",
      "Accompagnement à la mise en place du contrôle de gestion industriel",
    ],
    objectif: "Amélioration de la performance industrielle, réduction des pertes et maîtrise des coûts."
  },
  {
    icon: Truck,
    title: "Logistique",
    description: "Nous accompagnons la fonction logistique dans l'optimisation des flux physiques et d'information.",
    sectionTitle: "Nos actions portent sur :",
    details: [
      "Diagnostic des flux logistiques et de la chaîne d'approvisionnement",
      "Optimisation des stocks et des délais",
      "Mise en place d'indicateurs de performance logistique",
      "Amélioration de la coordination entre achats, production et distribution",
      "Réduction des coûts logistiques globaux",
    ],
    objectif: "Fluidité des flux, réduction des coûts et amélioration du niveau de service."
  },
  {
    icon: Monitor,
    title: "Systèmes d'Information (SI)",
    description: "CGC accompagne les entreprises dans la structuration, l'optimisation et la transformation de leurs systèmes d'information, en cohérence avec leur stratégie, leur organisation et leurs enjeux métiers.",
    sectionTitle: "Nos interventions couvrent notamment :",
    details: [
      "Diagnostic et alignement stratégique du SI : analyse de l'existant, évaluation de l'adéquation du SI avec les objectifs stratégiques",
      "Accompagnement à la mise en place ou au changement de SI : assistance au choix des solutions (ERP, outils financiers, RH, achats, reporting, BI)",
      "Définition des besoins fonctionnels et rédaction des cahiers des charges",
      "Optimisation des processus et fiabilisation de l'information : digitalisation et automatisation des processus clés",
      "Mise en place de reportings et tableaux de bord de pilotage",
    ],
    objectif: "Un système d'information fiable, cohérent, orienté décision, au service de la performance opérationnelle et stratégique."
  },
  {
    icon: Award,
    title: "Certifications & Normalisation",
    description: "CGC accompagne les entreprises dans leurs démarches de certification, de structuration et de conformité, en faisant de ces projets un levier d'organisation, de crédibilité et de performance.",
    details: [
      "Préparation et accompagnement aux certifications : diagnostic de conformité et analyse des écarts",
      "Structuration des processus et procédures, mise en place des référentiels et indicateurs",
      "Mise en place de systèmes de management et clarification des rôles et responsabilités",
      "Formation et sensibilisation des équipes aux exigences des normes",
      "Développement d'une culture qualité, performance et conformité",
    ],
    objectif: "Sécuriser les pratiques, renforcer la gouvernance, améliorer la performance interne et valoriser l'entreprise auprès de ses partenaires, clients et institutions."
  },
];

const valeurAjoutee = [
  "Une approche terrain, concrète et opérationnelle",
  "Une expertise multisectorielle",
  "Un accompagnement sur mesure, de la réflexion stratégique à l'exécution",
  "Une obsession du résultat mesurable",
];

const Accompagnement = () => {
  const { data: accompagnementImage } = useSiteImage("accompagnement_image");

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
              Conseil & Accompagnement
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Optimisation des Fonctions Stratégiques
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Au Cabinet Général de Consulting (CGC), nous accompagnons les entreprises dans la réorganisation et l'optimisation de leurs fonctions stratégiques, afin de renforcer durablement leur performance globale, leur agilité opérationnelle et leur capacité de pilotage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Notre Approche
                </h2>
              </div>

              <p className="text-foreground mb-6">
                Notre approche est pragmatique, structurée et orientée résultats. Elle repose sur trois piliers complémentaires :
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Diagnostic approfondi des organisations, des processus et des modes de gouvernance",
                  "Recommandations opérationnelles sur mesure, alignées avec les réalités du terrain et les enjeux stratégiques",
                  "Accompagnement à la mise en œuvre, en proximité avec les équipes, pour sécuriser l'exécution et l'impact",
                ].map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <p className="text-foreground">{pillar}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground font-medium">
                  <Target className="w-5 h-5 text-accent inline mr-2" />
                  <strong>Objectif :</strong> Transformer les constats en actions concrètes, génératrices de valeur mesurable et de performance durable.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={accompagnementImage?.image_url || conseilAccompagnementImage}
                alt={accompagnementImage?.alt_text || "Conseil et accompagnement - Notre approche"}
                loading="lazy"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fonctions */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Domaines d'Intervention
            </h2>
            <p className="text-foreground max-w-2xl mx-auto">
              Nous intervenons sur l'ensemble des fonctions clés de l'entreprise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {fonctions.map((fonction, index) => (
              <motion.div
                key={fonction.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <fonction.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  {fonction.title}
                </h3>

                <p className="text-foreground text-sm mb-4">
                  {fonction.description}
                </p>

                {fonction.subtitle && (
                  <div className="mb-4">
                    <p className="text-foreground font-medium text-sm mb-2">{fonction.subtitle}</p>
                    <p className="text-foreground text-xs">{fonction.subtitleDesc}</p>
                  </div>
                )}

                {fonction.sectionTitle && (
                  <p className="text-foreground font-semibold text-sm mb-3">{fonction.sectionTitle}</p>
                )}

                <ul className="space-y-2 mb-4">
                  {fonction.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {fonction.objectif && (
                  <p className="text-xs text-accent font-medium mt-4 pt-4 border-t border-border">
                    <Target className="w-4 h-4 inline mr-1" />
                    {fonction.objectif}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeur Ajoutée */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-white">
              <Target className="w-8 h-8 inline mr-2 text-white" />
              Notre valeur ajoutée CGC
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {valeurAjoutee.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                >
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