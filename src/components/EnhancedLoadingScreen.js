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

const TypewriterText = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-primary"
      >
        |
      </motion.span>
    </span>
  );
};

const CircularProgress = ({ progress }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        {/* Cercle de fond */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-gray-800"
        />
        {/* Cercle de progression */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="text-primary"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </svg>

      {/* Pourcentage au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={progress}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold text-white"
        >
          {progress}%
        </motion.span>
      </div>
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

        const newProgress = prev + Math.random() * 15 + 5;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));

        return Math.min(newProgress, 100);
      });
    }, 300);

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
              className="flex justify-center space-x-6 mb-6"
            >
              {icons.map((Icon, index) => (
                <LoaderIcon key={index} icon={Icon} delay={index * 0.2} />
              ))}
            </motion.div>

            {/* Texte de statut avec effet typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-gray-300 text-lg h-8"
            >
              {currentStep < loadingSteps.length && (
                <TypewriterText text={loadingSteps[currentStep]} speed={50} />
              )}
            </motion.div>

            {/* Barre de progression secondaire */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "300px" }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mx-auto h-1 bg-gray-800 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-violet-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
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
