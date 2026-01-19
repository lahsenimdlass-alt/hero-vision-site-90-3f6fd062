import { motion } from "framer-motion";
import { Award, Users, Target, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Expertise Sectorielle",
    description: "Nos consultants disposent des savoirs et savoir-faire approfondis dans divers secteurs d'activité.",
  },
  {
    icon: Users,
    title: "Équipe Mobilisée",
    description: "Nous offrons des solutions pragmatiques et adaptées aux besoins spécifiques de chaque client.",
  },
  {
    icon: Target,
    title: "Approche Personnalisée",
    description: "Chaque projet est unique, nous concevons des solutions sur mesure pour votre contexte.",
  },
  {
    icon: TrendingUp,
    title: "Résultats Mesurables",
    description: "Nous nous engageons à fournir des résultats tangibles et mesurables pour votre entreprise.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-[hsl(212,55%,22%)] text-white">
      <div className="container-custom px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Pourquoi choisir le Cabinet Général de Consulting ?
          </h2>
          <p className="text-accent-on-dark text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-6 sm:mb-8">
            Un partenaire de confiance pour votre croissance
          </p>
          <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
            Notre approche est fondée sur la proximité, la rigueur et des solutions 
            sur mesure pour une performance durable. Nous transformons vos ambitions en actions concrètes.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 sm:mb-5">
                <reason.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-on-dark" />
              </div>
              <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">
                {reason.title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Subvention Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 bg-[hsl(212,60%,45%)]/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center border border-[hsl(212,60%,45%)]/30"
        >
          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
            Accélérez Votre Croissance
          </h3>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
            Dans le cadre des dispositifs GIAC et CSF, vos projets peuvent être 
            <span className="font-semibold text-[hsl(212,60%,70%)]"> subventionnés jusqu'à 70%</span> par l'État.
            Nous vous accompagnons dans toutes les démarches.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
