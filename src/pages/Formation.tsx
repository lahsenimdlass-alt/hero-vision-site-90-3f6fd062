import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { GraduationCap, CheckCircle, FileText, Users, Building2, Target, Star, Settings, User, PiggyBank, Handshake } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import formationDefaultImage from "@/assets/formation.jpeg";

const trainingDomains = [
  {
    icon: Star,
    title: "Leadership et Management",
    description: "Pilotage stratégique, gestion d'équipe, conduite du changement."
  },
  {
    icon: Settings,
    title: "Techniques et Fonctionnelles",
    description: "Achats, logistique, production, RH, systèmes d'information."
  },
  {
    icon: User,
    title: "Développement Personnel",
    description: "Communication, gestion du stress, confiance en soi, soft skills."
  },
  {
    icon: PiggyBank,
    title: "Gestion Financière",
    description: "Comptabilité, contrôle de gestion, analyse des coûts."
  },
  {
    icon: Handshake,
    title: "Relation Client et Commercial",
    description: "Optimisation des ventes, fidélisation, gestion de la relation client."
  }
];

const Formation = () => {
  const { data: formationImage } = useSiteImage("formation_image");

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
              Formation
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Formation & Développement des Compétences
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Le Cabinet CGC offre des formations structurées, animées par des experts pluridisciplinaires cumulant plus de 20 ans d'expérience, pour un apprentissage concret et impactant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction with Image */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <GraduationCap className="w-10 h-10 text-accent" />
              </div>
              <p className="text-lg text-foreground leading-relaxed">
                Le Cabinet CGC offre des formations structurées, animées par des <strong>experts pluridisciplinaires</strong> cumulant <strong>plus de 20 ans d'expérience</strong>, pour un apprentissage concret et impactant.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img 
                src={formationImage?.image_url || formationDefaultImage} 
                alt={formationImage?.alt_text || "Formation professionnelle"}
                loading="lazy"
                className="rounded-2xl shadow-xl w-full h-64 lg:h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Domaines de formation */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Domaines de Formation
            </h2>
            <p className="text-foreground max-w-2xl mx-auto">
              Des programmes adaptés à chaque besoin pour développer les compétences de vos équipes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingDomains.map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon connector line */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <domain.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="pt-8 text-center">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {domain.title}
                  </h3>
                  <p className="text-foreground text-sm leading-relaxed">
                    {domain.description}
                  </p>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Éligibilité CSF / OFPPT
                </h2>
              </div>
              
              <p className="text-foreground mb-4">
                Le Cabinet Général de Consulting (CGC) est un organisme de formation éligible aux Contrats Spéciaux de Formation (CSF), dispositif géré par l'OFPPT.
              </p>
              <p className="text-foreground mb-6">
                À ce titre, CGC accompagne les entreprises dans la mobilisation des financements et la sécurisation de leurs plans de formation, tout en assurant une prise en charge complète des démarches.
              </p>

              <h3 className="font-semibold text-foreground mb-4">
                🔹 Notre accompagnement CSF
              </h3>
              <p className="text-foreground mb-4">
                Nous intervenons sur l'ensemble du processus, notamment :
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Ingénierie de formation : analyse des besoins, conception des programmes et structuration du plan de formation, avec un taux de remboursement pouvant atteindre jusqu'à 70 %</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Financement du plan de formation par l'OFPPT, conformément aux dispositifs en vigueur</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Prise en charge complète des démarches administratives : constitution des dossiers, dépôt auprès des instances concernées, suivi des demandes et gestion des pièces justificatives</span>
                </li>
              </ul>
              
              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground">
                  <Target className="w-5 h-5 text-accent inline mr-2" />
                  <strong>🎯 Objectifs :</strong> Permettre aux entreprises de former leurs équipes à moindre coût, tout en garantissant la conformité réglementaire, la qualité des actions de formation et la sécurisation des remboursements.
                </p>
              </div>
            </motion.div>

            {/* Étude d'ingénierie de formation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Étude d'ingénierie de formation
                </h2>
              </div>
              
              <p className="text-accent font-semibold mb-4">
                Un accompagnement clé en main – de A à Z
              </p>
              <p className="text-foreground mb-6">
                Le Cabinet Général de Consulting (CGC) prend en charge l'intégralité des dossiers d'ingénierie de formation, de l'analyse des besoins jusqu'au suivi final, en passant par la constitution, le dépôt et le suivi administratif.
              </p>

              <h3 className="font-semibold text-foreground mb-4">
                Les avantages pour votre entreprise
              </h3>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Gain de temps : CGC gère l'ensemble des démarches</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Sécurisation des dossiers et conformité aux exigences</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Optimisation du financement et maximisation des remboursements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 shrink-0" />
                  <span className="text-foreground">Simplicité et sérénité : un interlocuteur unique, un accompagnement complet</span>
                </li>
              </ul>
              
              <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground font-semibold">
                  🎯 Vous vous concentrez sur votre activité, CGC s'occupe du reste.
                </p>
              </div>
            </motion.div>

            {/* Formations intra-entreprise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Formations intra-entreprise
                </h2>
              </div>
              
              <p className="text-foreground mb-6">
                Le Cabinet Général de Consulting (CGC) conçoit et déploie des formations intra-entreprise entièrement adaptées à vos enjeux métiers, à votre secteur d'activité et à vos objectifs stratégiques.
              </p>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ Une approche ancrée dans la réalité terrain</h4>
                  <p className="text-foreground">
                    Nos programmes sont construits à partir de vos pratiques internes et de vos problématiques réelles, garantissant une application immédiate des acquis dans votre environnement professionnel.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ Des formations opérationnelles et orientées résultats</h4>
                  <p className="text-foreground">
                    Grâce à une pédagogie pragmatique et interactive, nous renforçons durablement les compétences de vos équipes et contribuons directement à la performance globale de votre organisation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Formations inter-entreprise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 lg:p-12 border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Formations inter-entreprise
                </h2>
              </div>
              
              <p className="text-accent font-semibold mb-6">
                En présentiel ou à distance
              </p>

              <div className="space-y-6">
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ Des formations actualisées et orientées terrain</h4>
                  <p className="text-foreground">
                    CGC propose des formations inter-entreprise conçues pour les entreprises et les professionnels souhaitant renforcer leurs compétences sur des thématiques clés et actuelles.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ Un cadre propice au partage et à l'enrichissement</h4>
                  <p className="text-foreground">
                    Nos programmes favorisent le partage d'expériences, l'apprentissage collectif et l'enrichissement mutuel entre participants issus de différents horizons.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-accent/30">
                  <h4 className="font-semibold text-foreground mb-2">✓ Une pédagogie pratique et immédiatement applicable</h4>
                  <p className="text-foreground">
                    Animées par des experts métiers, nos formations combinent apports pratiques, échanges concrets et cas réels, permettant une mise en application immédiate en contexte professionnel.
                  </p>
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