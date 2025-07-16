import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaReact, FaJs, FaNodeJs } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

const LoaderIcon = ({ icon: Icon, delay }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 1,
      delay,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeInOut",
    }}
    className="text-primary"
  >
    <Icon size={24} />
  </motion.div>
);

// Composant pour animer le compteur de pourcentage
const AnimatedCounter = ({ value, duration = 800 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = count;
    const change = value - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Fonction d'easing pour une animation plus fluide
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + change * easeOutQuart;

      setCount(Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, count]);

  return (
    <span className="tabular-nums">
      {count.toFixed(0)}
      <span className="text-primary">%</span>
    </span>
  );
};

const CircularProgress = ({ progress }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      {/* Cercle de fond avec effet glow */}
      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
        {/* Cercle de fond */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-gray-800/50"
        />
        {/* Cercle de progression avec gradient */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#progressGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="drop-shadow-lg"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Définition du gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Pourcentage au centre avec effet de compteur animé */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            key={progress}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-3xl font-bold text-white mb-1"
          >
            <AnimatedCounter value={progress} />
          </motion.div>
          <motion.div
            className="text-xs text-gray-400 font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            LOADING
          </motion.div>
        </div>
      </div>

      {/* Effet de glow rotatif */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent)`,
          filter: "blur(2px)",
        }}
      />
    </div>
  );
};

const EnhancedLoadingScreen = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    t("loading.steps.init"),
    t("loading.steps.components"),
    t("loading.steps.animations"),
    t("loading.steps.optimization"),
    t("loading.steps.interface"),
    t("loading.steps.finalization"),
  ];

  const icons = [FaCode, FaReact, FaJs, FaNodeJs];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }

        // Progression plus fluide avec des paliers
        let increment;
        if (prev < 20) {
          increment = Math.random() * 8 + 2; // Démarrage rapide
        } else if (prev < 60) {
          increment = Math.random() * 6 + 1; // Vitesse moyenne
        } else if (prev < 90) {
          increment = Math.random() * 4 + 0.5; // Ralentissement
        } else {
          increment = Math.random() * 2 + 0.2; // Très lent vers la fin
        }

        const newProgress = prev + increment;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));

        return Math.min(newProgress, 100);
      });
    }, 200); // Interval plus fréquent pour plus de fluidité

    return () => clearInterval(interval);
  }, [loadingSteps.length]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Arrière-plan animé */}
          <div className="absolute inset-0">
            {/* Particules flottantes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Vagues de fond */}
            <motion.div
              className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-primary/10 to-transparent"
              animate={{
                scaleX: [1, 1.2, 1],
                scaleY: [1, 0.8, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 text-center space-y-8">
            {/* Logo animé */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-violet-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <FaCode className="text-3xl text-white" />
                </motion.div>

                {/* Effet de brillance */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </div>
            </motion.div>

            {/* Nom avec effet typewriter */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4"
            >
              {" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                {t("loading.title")}
              </span>
            </motion.h1>

            {/* Progress circulaire */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <CircularProgress progress={progress} />
            </motion.div>

            {/* Icônes animées */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex justify-center space-x-6 mb-8"
            >
              {icons.map((Icon, index) => (
                <LoaderIcon key={index} icon={Icon} delay={index * 0.2} />
              ))}
            </motion.div>

            {/* Barre de progression modernisée */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "400px" }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mx-auto h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-violet-500 to-amber-500 relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Effet de brillance qui se déplace */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                />

                {/* Particules flottantes dans la barre */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: "25%",
                    }}
                    animate={{
                      y: [0, -4, 0],
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Indicateur de progression détaillé */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center mt-4"
            >
              <div className="text-sm text-gray-400 font-mono">
                {progress < 100
                  ? `${progress.toFixed(1)}% • ${
                      loadingSteps[currentStep] || "Initialisation..."
                    }`
                  : "100% • Prêt !"}
              </div>
            </motion.div>

            {/* Message de bienvenue */}
            {progress > 90 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-medium"
              >
                Bienvenue dans mon univers !
              </motion.p>
            )}
          </div>

          {/* Effet de transition finale */}
          {isComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 50 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary rounded-full"
              style={{ transformOrigin: "center" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedLoadingScreen;
