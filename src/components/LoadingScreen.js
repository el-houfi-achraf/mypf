import { motion } from "framer-motion";

const LoadingScreen = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [-20, 0, -20],
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Logo animé */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cercles animés */}
        <motion.div
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary to-violet-500 opacity-20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="relative w-24 h-24 rounded-full bg-black border-2 border-primary flex items-center justify-center"
          animate={{
            borderColor: ["#0070f3", "#7928ca", "#0070f3"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            P
          </span>
        </motion.div>
      </motion.div>

      {/* Points de chargement */}
      <div className="flex gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-primary"
            style={{ opacity: 0 }}
            custom={i}
          />
        ))}
      </div>

      {/* Texte de chargement */}
      <motion.div variants={textVariants} className="text-center space-y-2">
        <h2 className="text-xl font-medium text-white">Loading</h2>
        <p className="text-sm text-gray-400">Please wait a moment</p>
      </motion.div>

      {/* Barre de progression */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-violet-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [null, Math.random() * -500],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
