import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const valeurs = ["INTÉGRITÉ", "TRANSPARENCE", "ENGAGEMENT"];

const ValuesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valeurs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-navy relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />
      
      <div className="container-custom px-4 sm:px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="h-px w-12 bg-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <motion.div 
              className="h-px w-12 bg-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Nos Valeurs
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.div 
              className="h-px w-16 bg-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div 
              className="h-px w-16 bg-white/30"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Marquee Animation - Single Line */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...valeurs, ...valeurs, ...valeurs, ...valeurs].map((valeur, index) => (
              <span
                key={index}
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/90 mx-8 sm:mx-12 tracking-wider"
              >
                {valeur}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Value indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-3 mt-12"
        >
          {valeurs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-white scale-125" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
