import React, { useState, useRef } from "react";
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

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Cercle de fond */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-gray-700"
          />
          {/* Cercle de progression */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className={`text-${color}`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
            }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>

        {/* Icône au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className={`text-2xl text-${color} group-hover:scale-110 transition-transform`}
          />
        </div>

        {/* Pourcentage */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-lg font-bold text-white bg-gray-900/80 rounded-full w-12 h-12 flex items-center justify-center">
            {percentage}%
          </span>
        </motion.div>
      </div>

      <p className="text-center text-gray-300 font-medium">{label}</p>
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
      value: "25",
      color: "violet-500",
    },
    {
      icon: FaHeart,
      label: t("about.stats.clients"),
      value: "40",
      color: "red-500",
    },
    {
      icon: FaAward,
      label: t("about.stats.certifications"),
      value: "30",
      color: "yellow-500",
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
            {" "}
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              {t("about.statsTitle")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <CircularProgress
                  key={index}
                  percentage={parseInt(stat.value)}
                  label={stat.label}
                  icon={stat.icon}
                  color={stat.color}
                />
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
