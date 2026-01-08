import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { UserCheck, CheckCircle, Target, Users, Search, Award, Handshake } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import handshakeImage from "@/assets/business-handshake.jpg";
import officeImage from "@/assets/business-woman-office.jpg";

const profils = [
  "Chef Comptable",
  "Responsables financiers",
  "Directeur Administratif et Financier (DAF)",
  "Contrôleur de Gestion (Junior, Senior)",
  "Directeur du Contrôle de Gestion",
];

const approche = [
  {
    icon: Target,
    title: "Analyse approfondie du besoin",
    items: [
      "Compréhension des enjeux stratégiques, organisationnels et financiers",
      "Définition précise du poste, des responsabilités et des objectifs",
      "Alignement avec la culture et les valeurs de l'entreprise",
    ]
  },
  {
    icon: Search,
    title: "Sourcing ciblé et qualifié",
    items: [
      "Recherche de profils à forte valeur ajoutée",
      "Sélection basée sur l'expertise technique, l'expérience terrain et le potentiel",
      "Approche directe et réseau professionnel spécialisé finance & gestion",
    ]
  },
  {
    icon: Award,
    title: "Évaluation complète des candidats",
    items: [
      "Évaluation technique (finance, comptabilité, contrôle de gestion, pilotage)",
      "Analyse des compétences managériales et des soft skills",
      "Vérification des références professionnelles",
    ]
  },
  {
    icon: Handshake,
    title: "Accompagnement jusqu'à l'intégration",
    items: [
      "Présentation de short-lists qualifiées",
      "Accompagnement du client dans la prise de décision",
    ]
  },
];

const objectifs = [
  "Sécuriser les recrutements sur des fonctions critiques",
  "Garantir une adéquation durable entre le poste, le profil et les enjeux",
  "Apporter des talents immédiatement opérationnels",
];

const Recrutement = () => {
  const { data: recrutementImage } = useSiteImage("recrutement_image");

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
              Recrutement
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Profils Financiers & Management
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Le Cabinet Général de Consulting (CGC) est spécialisé dans le recrutement ciblé de profils financiers, avec une expertise reconnue dans l'identification, l'évaluation et la sélection de talents capables d'accompagner la structuration, la performance et la croissance des organisations.
            </p>
            <p className="text-primary-foreground/80 text-base mt-4">
              Nous intervenons sur des postes clés et stratégiques, aussi bien en junior, senior que top management, en parfaite adéquation avec les enjeux métiers et sectoriels de nos clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profils recrutés */}
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
                  <UserCheck className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Profils Recrutés
                  </h2>
                  <p className="text-muted-foreground">
                    Nous recrutons notamment les profils suivants :
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                {profils.map((profil, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground font-medium">{profil}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <p className="text-foreground">
                  À ce titre, nous accompagnons nos clients dans l'identification et le recrutement de profils à haute valeur ajoutée, capables de répondre aux défis actuels et futurs de la fonction finance.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={recrutementImage?.image_url || handshakeImage} 
                alt={recrutementImage?.alt_text || "Poignée de main professionnelle"}
                loading="lazy"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Approche */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Notre Approche Recrutement
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Notre démarche est rigoureuse, confidentielle et orientée performance, fondée sur une parfaite compréhension des réalités terrain des fonctions financières.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {approche.map((etape, index) => (
              <motion.div
                key={etape.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <etape.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {etape.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {etape.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              Objectifs
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {objectifs.map((objectif, idx) => (
                <div 
                  key={idx}
                  className="p-6 bg-white/10 rounded-xl backdrop-blur-sm"
                >
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