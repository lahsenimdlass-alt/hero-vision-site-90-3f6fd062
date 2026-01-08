import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  label: string;
}

const AnimatedCounter = ({
  end,
  suffix = "",
  duration = 2,
  delay = 0,
  label,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }

      if (now >= endTime) {
        setCount(end);
        return;
      }

      const progress = (now - startTime) / (duration * 1000);
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="text-center group"
    >
      {/* Glow effect behind number */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className="absolute inset-0 blur-2xl bg-gradient-to-r from-accent/50 to-primary/30 rounded-full"
        />
        
        <div className="relative flex items-baseline justify-center">
          <motion.span
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums"
            style={{
              textShadow: "0 0 40px rgba(233, 171, 77, 0.4), 0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {count}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + duration }}
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-accent ml-0.5"
            style={{
              textShadow: "0 0 20px rgba(233, 171, 77, 0.6)",
            }}
          >
            {suffix}
          </motion.span>
        </div>
      </div>

      {/* Label with underline animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="relative mt-3"
      >
        <span className="text-xs sm:text-sm md:text-base text-white/80 font-medium tracking-wide">
          {label}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: delay + 0.6, ease: "easeOut" }}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent origin-center"
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCounter;
