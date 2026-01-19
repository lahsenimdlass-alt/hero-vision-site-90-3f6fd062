import { motion } from "framer-motion";
import { useSiteImage } from "@/hooks/useSiteImage";
import directriceImage from "@/assets/directrice.jpg";

const MotDirectionPreview = () => {
  const { data: directriceImg } = useSiteImage("directrice_image");

  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-muted">
      <div className="container-custom px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-center">
            Mot de la Direction
          </h2>
          <p className="text-accent text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mb-6 sm:mb-8 text-center">
            Notre Vision & Engagement
          </p>

          <div className="bg-background rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
              {/* Photo de la directrice */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <img
                  src={directriceImg?.image_url || directriceImage}
                  alt={directriceImg?.alt_text || "Mme Khadija BOUHAJJI - Fondatrice & Directrice Générale"}
                  loading="lazy"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl sm:rounded-2xl object-cover shadow-lg"
                />
              </motion.div>

              {/* Contenu */}
              <div className="flex-1">
                <div className="text-muted-foreground text-sm sm:text-base space-y-4 sm:space-y-5">
                  <p className="leading-relaxed">
                    Professionnelle aguerrie, forte de plus de 23 années d'expérience dans les domaines financiers, RH, achats, comptabilité et contrôle de gestion, j'ai construit un parcours solide au sein de différentes secteurs d'activités.
                  </p>
                  <p className="leading-relaxed">
                    Cette diversité d'expériences m'a permis de développer une vision globale de l'entreprise, un pilotage rigoureux de la performance et une réelle capacité à accompagner les organisations dans leurs projets de structuration et de transformation.
                  </p>
                  <p className="leading-relaxed">
                    J'ai également eu le privilège de travailler avec des dirigeants de premier plan et d'anciens ministres, renforçant mon exigence en matière de gouvernance et de résultats.
                  </p>
                  <p className="leading-relaxed">
                    Forte de cette expertise, j'ai fondé le <strong className="text-foreground">Cabinet Général de Consulting (CGC)</strong> afin de proposer un accompagnement stratégique et opérationnel répondant aux exigences actuelles des entreprises.
                  </p>
                  <p className="leading-relaxed">
                    CGC intervient notamment en réorganisation, digitalisation, ingénierie de formation, mise en place du contrôle de gestion et recrutement de profils financiers.
                  </p>
                  <p className="leading-relaxed">
                    Notre approche repose sur la proximité, la rigueur et des solutions sur mesure, avec une attention particulière portée à la montée en compétences des équipes et à la création de valeur durable.
                  </p>
                  <p className="leading-relaxed">
                    Nous sommes convaincus que la performance repose sur une gouvernance efficace, une gestion optimisée et des décisions éclairées. C'est dans cet esprit que nous accompagnons nos clients vers des résultats concrets et pérennes.
                  </p>
                </div>

                <div className="border-t border-border pt-4 sm:pt-6 mt-6 sm:mt-8 text-center md:text-left">
                  <p className="font-display font-semibold text-foreground text-base sm:text-lg">
                    Mme Khadija BOUHAJJI
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Fondatrice & Directrice Générale
                  </p>
                  <p className="text-accent font-medium text-sm sm:text-base">
                    Cabinet Général de Consulting (CGC)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MotDirectionPreview;
