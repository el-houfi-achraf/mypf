import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useIsMobile, useReducedMotion } from "../hooks/usePerformance";
import { useTranslation } from "../hooks/useTranslation";

const ParallaxHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Effets parallax avec spring pour plus de fluidité
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30,
  });

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), {
    stiffness: 100,
    damping: 30,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Suivi de la souris pour les particules interactives
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile, prefersReducedMotion]);

  // Particules interactives
  const particles = Array.from({ length: isMobile ? 10 : 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform"
      style={{ opacity, scale }}
    >
      {/* Couches parallax d'arrière-plan */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y2 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-violet-500/5" />
      </motion.div>

      {/* Particules interactives */}
      <div className="absolute inset-0 z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20 will-change-transform"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, mousePosition.x, 0],
              y: [0, mousePosition.y, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ y: y1 }}
      >
        {/* Titre principal avec effet typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          {" "}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-violet-500">
              {t("hero.greeting")}
            </span>
          </h1>{" "}
          <div className="text-6xl md:text-8xl font-black mb-6">
            <span className="text-white">{t("hero.name")}</span>
          </div>
          <div className="text-2xl md:text-4xl font-light text-primary h-16 flex items-center justify-center">
            {" "}
            <Typewriter
              options={{
                strings: t("hero.roles"),
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
                pauseFor: 2000,
              }}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {" "}
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-primary to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{t("hero.cta")}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("contact.title")}
          </motion.a>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Effet de brillance qui traverse */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12" />
      </motion.div>
    </motion.section>
  );
};

export default ParallaxHero;
