import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { BarChart3, CheckCircle, Target, TrendingUp, PieChart, LineChart, AlertCircle, Calculator } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import controleGestionDefaultImage from "@/assets/controle-gestion.jpeg";
import controleGestionHeroImage from "@/assets/controle-gestion-hero.jpeg";

const interventions = [
  "Diagnostic de la fonction contrôle de gestion : analyse des processus, des outils, des pratiques et des besoins décisionnels",
  "Mise en place du contrôle de gestion : élaboration des budgets, forecasts, tableaux de bord et dispositifs de suivi",
  "Comptabilité analytique et calcul des coûts : structuration des centres de coûts, méthodes de calcul et analyse des marges",
  "Accompagnement du reporting : conception, automatisation et fiabilisation des reportings financiers et opérationnels",
  "Analyse des écarts et recommandations : interprétation des résultats, alertes et plans d'actions correctifs",
  "Accompagnement terrain : montée en compétence des équipes et appui à la direction dans la prise de décision",
];

const objectifs = [
  {
    icon: LineChart,
    title: "Reporting Clair",
    description: "Disposer d'un reporting clair, fiable et orienté décision"
  },
  {
    icon: TrendingUp,
    title: "Pilotage Performance",
    description: "Améliorer le pilotage de la performance"
  },
  {
    icon: PieChart,
    title: "Maîtrise des Coûts",
    description: "Renforcer la maîtrise des coûts et des marges"
  },
  {
    icon: Target,
    title: "Décisions Stratégiques",
    description: "Soutenir des décisions stratégiques éclairées"
  },
  {
    icon: AlertCircle,
    title: "Anticipation des Écarts",
    description: "Anticiper les écarts et alerter en temps réel"
  },
  {
    icon: Calculator,
    title: "Optimisation Budgétaire",
    description: "Optimiser l'allocation des ressources et le budget"
  },
];

const ControleGestion = () => {
  const { data: controleImage } = useSiteImage("controle_gestion_image");

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-white font-medium uppercase tracking-wide mb-4">
              Contrôle de Gestion
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Mise en place et accompagnement du contrôle de gestion et du reporting
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Le Cabinet Général de Consulting (CGC) accompagne les entreprises dans la mise en place, la structuration et l'optimisation du contrôle de gestion, ainsi que dans le déploiement de reportings fiables et pertinents, véritables outils de pilotage et d'aide à la décision.
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
              Nos axes d'intervention
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
                alt={controleImage?.alt_text || "Contrôle de gestion"} 
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
                Objectif global
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transformer la fonction Finance en un véritable partenaire stratégique, garant de la fiabilité de l'information financière et acteur clé du pilotage de la performance et de la prise de décision.
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
              Objectifs
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Des résultats concrets pour votre entreprise
            </p>
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
                  <objectif.icon className="w-7 h-7 text-white" />
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