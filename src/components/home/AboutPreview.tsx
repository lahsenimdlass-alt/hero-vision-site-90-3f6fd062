import { motion } from "framer-motion";
import { Settings, Monitor, GraduationCap, UserCheck, BarChart3 } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import notreMissionImage from "@/assets/notre-mission.jpeg";

const services = [
  { icon: Settings, text: "Réorganisation & structuration" },
  { icon: Monitor, text: "Systèmes d'information & digitalisation" },
  { icon: GraduationCap, text: "Ingénierie de Formation" },
  { icon: UserCheck, text: "Recrutement de profils financiers" },
  { icon: BarChart3, text: "Tenue et optimisation du contrôle de gestion" },
];
const AboutPreview = () => {
  const { data: aboutImage } = useSiteImage("about_image");

  return (
    <section id="about-preview" className="py-12 sm:py-16 lg:py-28 bg-background">
      <div className="container-custom px-4 sm:px-6">
        {/* Qui sommes-nous */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Qui sommes-nous ?
          </h2>
          <p className="text-accent text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">
            Experts en accompagnement stratégique et en conseil opérationnel
          </p>
          <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10">
            Nous concevons des solutions sur mesure, à la fois innovantes et 
            parfaitement alignées avec les enjeux spécifiques de chaque secteur d'activité.
          </p>
          
          <p className="text-foreground font-bold text-lg sm:text-xl mb-6 sm:mb-8">Notre cabinet CGC vous accompagne dans :</p>
          
          <div className="flex flex-col gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 sm:p-5 bg-muted/50 rounded-xl border-l-4 border-accent"
              >
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent flex-shrink-0" />
                <span className="text-foreground text-sm sm:text-base md:text-lg font-medium text-left">{service.text}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Notre Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-14"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                Notre Mission
              </h3>
              <p className="text-accent text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide mb-6 sm:mb-8">
                Mettre de l'ordre, là où la performance stagne.
              </p>
              <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
                Faire passer votre organisation d'un pilotage approximatif à une performance maîtrisée.
              </p>
              <p className="text-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                Structurer, sécuriser et optimiser vos décisions grâce à une expertise terrain 
                et des solutions sur mesure et orientées résultats.
              </p>
            </div>
            <div>
              <img 
                src={aboutImage?.image_url || notreMissionImage} 
                alt={aboutImage?.alt_text || "Notre mission"}
                loading="lazy"
                className="rounded-xl shadow-lg w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
