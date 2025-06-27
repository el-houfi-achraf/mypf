import { motion } from "framer-motion";

const AnimatedBackground = () => {
  // Réduire le nombre d'étoiles à 15 maximum pour optimiser les performances
  const stars = Array.from({ length: 15 }, (_, i) => ({
    // Réduit à 15 étoiles
    id: i,
    size: Math.random() * 1.5 + 0.5, // Étoiles plus petites
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random(), // Délai plus court
    duration: Math.random() + 1, // Duration plus courte
  }));

  // Réduire à 2 étoiles filantes
  const shootingStars = Array.from({ length: 2 }, (_, i) => ({
    id: i,
    delay: i * 4,
    duration: 1.5,
    x1: Math.random() * 100,
    y1: Math.random() * 50,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="relative w-full h-full">
        {/* Étoiles statiques scintillantes */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.2], // Réduire l'intensité
              scale: [1, 1.05, 1], // Réduire l'échelle
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Étoiles filantes */}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: `${star.x1}%`,
              top: `${star.y1}%`,
            }}
            animate={{
              x: [0, 200],
              y: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Nébuleuses colorées - Simplifier les animations */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15, // Plus lent mais moins gourmand en ressources
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-screen filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
