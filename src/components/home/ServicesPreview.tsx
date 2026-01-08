import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Settings, 
  MonitorSmartphone, 
  GraduationCap, 
  UserCheck, 
  BarChart3, 
  ShieldCheck 
} from "lucide-react";

const services = [
  {
    icon: Settings,
    title: "Conseil & Accompagnement",
    description: "Optimisation des fonctions stratégiques : Finance, RH, Achats, Commercial, Production et Logistique.",
    path: "/expertises#accompagnement",
  },
  {
    icon: MonitorSmartphone,
    title: "Systèmes d'Information",
    description: "Structuration, optimisation et transformation de vos systèmes d'information en cohérence avec votre stratégie.",
    path: "/expertises#si",
  },
  {
    icon: ShieldCheck,
    title: "Certifications & Normalisation",
    description: "Accompagnement aux certifications, structuration et conformité comme levier de performance.",
    path: "/expertises#certification",
  },
  {
    icon: UserCheck,
    title: "Recrutement",
    description: "Recrutement ciblé de profils financiers : DAF, Contrôleurs de Gestion, Chefs Comptables.",
    path: "/expertises#recrutement",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Formations éligibles CSF/OFPPT, ingénierie de formation, formations intra et inter-entreprise.",
    path: "/expertises#formation",
  },
  {
    icon: BarChart3,
    title: "Contrôle de Gestion",
    description: "Mise en place et accompagnement du contrôle de gestion et du reporting pour un pilotage optimal.",
    path: "/expertises#controle-gestion",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-accent font-medium uppercase tracking-wide mb-4">
            Nos Expertises
          </p>
          <h2 className="section-title text-foreground mb-6">
            Aux côtés de vos réflexions, de l'idée à sa mise en œuvre
          </h2>
          <p className="section-subtitle mx-auto">
            Chez CGC, nous offrons un engagement de réussite avec des solutions 
            concrètes, évolutives et innovantes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={service.path}
                className="card-service h-full flex flex-col group"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-accent font-medium text-sm">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/expertises" className="btn-primary">
            Voir toutes nos expertises
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
