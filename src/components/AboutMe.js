import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ASHRAF from "../assets/images/ez.png";
import CV from "../assets/documents/CV_El_Houfi_Achraf.pdf";
import {
  FaCode,
  FaGraduationCap,
  FaHeart,
  FaGamepad,
  FaMusic,
  FaCamera,
  FaPlane,
  FaBook,
  FaAward,
  FaCertificate,
  FaDownload,
} from "react-icons/fa";
import LazyImage from "./LazyImage";
import { useTranslation } from "../hooks/useTranslation";

const ProgressiveReveal = ({ children, delay = 0 }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const CircularProgress = ({
  percentage,
  label,
  icon: Icon,
  color = "primary",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColorClass = (color) => {
    switch (color) {
      case "primary":
        return "text-blue-500";
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const getGradientId = (color) => {
    switch (color) {
      case "primary":
        return "blue-gradient";
      case "success":
        return "green-gradient";
      case "warning":
        return "yellow-gradient";
      case "error":
        return "red-gradient";
      default:
        return "blue-gradient";
    }
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="relative w-32 h-32 mb-6">
        {/* Effet de lueur de fond */}
        <motion.div
          className={`absolute inset-0 rounded-full ${getColorClass(
            color
          ).replace("text-", "bg-")}/20 blur-xl pulse-glow`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg
          className="w-32 h-32 transform -rotate-90 progress-circle"
          viewBox="0 0 100 100"
        >
          {/* Définition des gradients */}
          <defs>
            <linearGradient
              id="blue-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient
              id="green-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient
              id="yellow-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient
              id="red-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient
              id="gray-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Cercle de fond avec effet de brillance */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gray-gradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.3"
          />

          {/* Cercle de progression principal */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={`url(#${getGradientId(color)})`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          {/* Cercle de progression secondaire pour effet de profondeur */}
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke={`url(#${getGradientId(color)})`}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>

        {/* Icône au centre avec animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={`text-3xl ${getColorClass(
              color
            )} group-hover:scale-110 transition-transform`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon />
          </motion.div>
        </motion.div>

        {/* Pourcentage avec animation numérique */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span
              className="text-sm font-bold text-white"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatedCounter value={percentage} delay={800} />%
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Particules flottantes */}
        {isVisible && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`particle particle-${i + 1} ${getColorClass(
                  color
                ).replace("text-", "bg-")} float-particles`}
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${20 + i * 12}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <motion.p
        className="text-center text-gray-300 font-medium text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const InterestCard = ({ interest, index }) => {
  return (
    <motion.div
      className="group relative p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      {/* Icône */}
      <div className="mb-4">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <interest.icon className="text-2xl text-primary" />
        </div>
      </div>

      {/* Contenu */}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
        {interest.title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {interest.description}
      </p>

      {/* Effet de brillance */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

const CertificationBadge = ({ cert, index }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotate: 5 }}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-violet-500 rounded-full flex items-center justify-center relative overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
        {/* Effet de brillance rotatif */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <FaCertificate className="text-2xl text-white relative z-10" />
      </div>

      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {cert}
      </motion.div>
    </motion.div>
  );
};

// Composant pour animation numérique fluide
const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const increment = value / (duration / 16); // 60fps
    const timer = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount + increment;
        if (newCount >= value) {
          clearInterval(timer);
          return value;
        }
        return newCount;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [isActive, value, duration]);

  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <span ref={ref} className="font-mono">
      {Math.floor(count)}
    </span>
  );
};

const AboutMe = () => {
  const containerRef = useRef();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const stats = [
    {
      icon: FaCode,
      label: t("about.stats.projects"),
      value: "60",
      color: "primary",
    },
    {
      icon: FaGraduationCap,
      label: t("about.stats.experience"),
      value: "40",
      color: "success",
    },
    {
      icon: FaHeart,
      label: t("about.stats.clients"),
      value: "45",
      color: "error",
    },
    {
      icon: FaAward,
      label: t("about.stats.certifications"),
      value: "35",
      color: "warning",
    },
  ];

  const interests = [
    {
      icon: FaCode,
      title: t("about.interests.development.title"),
      description: t("about.interests.development.description"),
    },
    {
      icon: FaGamepad,
      title: t("about.interests.gaming.title"),
      description: t("about.interests.gaming.description"),
    },
    {
      icon: FaMusic,
      title: t("about.interests.music.title"),
      description: t("about.interests.music.description"),
    },
    {
      icon: FaCamera,
      title: t("about.interests.photography.title"),
      description: t("about.interests.photography.description"),
    },
    {
      icon: FaPlane,
      title: t("about.interests.travel.title"),
      description: t("about.interests.travel.description"),
    },
    {
      icon: FaBook,
      title: t("about.interests.reading.title"),
      description: t("about.interests.reading.description"),
    },
  ];

  const certifications = [
    "React Developer",
    "Software Engineering",
    "Docker, Kubernetes",
    "Azure Cloud Solutions",
    "Professional Scrum Master",
    "Software Design",
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black" />

      {/* Particules flottantes */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y, opacity }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* En-tête */}
        <ProgressiveReveal>
          {" "}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                {t("about.title")}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </ProgressiveReveal>

        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center ">
          {/* Photo et présentation */}
          <ProgressiveReveal delay={0.2}>
            <div className="relative">
              <motion.div
                className="relative w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl "
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <LazyImage
                  src={ASHRAF}
                  alt="Achraf - Développeur Full Stack"
                  className="w-full h-full object-cover object-top"
                  placeholder={
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                      <FaCode className="text-6xl text-white/50" />
                    </div>
                  }
                />

                {/* Bordure animée */}
                <motion.div
                  className="absolute inset-0 border-4 border-primary rounded-2xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Bouton CV */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={CV}
                  download
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {" "}
                  <FaDownload />
                  {t("about.downloadCV")}
                </motion.a>
              </motion.div>
            </div>
          </ProgressiveReveal>

          {/* Texte de présentation */}
          <ProgressiveReveal delay={0.4}>
            {" "}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("about.subtitle")}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t("about.description1")}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t("about.description2")}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t("about.description3")}
              </p>
            </div>
          </ProgressiveReveal>
        </div>

        {/* Statistiques circulaires */}
        <ProgressiveReveal delay={0.6}>
          <div className="mb-20">
            <motion.h3
              className="text-3xl font-bold text-white text-center mb-16 shimmer-effect"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">{t("about.statsTitle")}</span>
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CircularProgress
                    percentage={parseInt(stat.value)}
                    label={stat.label}
                    icon={stat.icon}
                    color={stat.color}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </ProgressiveReveal>

        {/* Centres d'intérêt */}
        <ProgressiveReveal delay={0.8}>
          <div className="mb-20">
            {" "}
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              {t("about.interestsTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <InterestCard key={index} interest={interest} index={index} />
              ))}
            </div>
          </div>
        </ProgressiveReveal>

        {/* Certifications */}
        <ProgressiveReveal delay={1.0}>
          <div>
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              {t("about.certificationsTitle")}
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {certifications.map((cert, index) => (
                <CertificationBadge key={index} cert={cert} index={index} />
              ))}
            </div>
          </div>
        </ProgressiveReveal>
      </div>
    </section>
  );
};

export default AboutMe;
