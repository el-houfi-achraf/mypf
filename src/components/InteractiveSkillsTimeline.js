import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAngular,
  FaJava,
  FaSchool,
  FaUniversity,
  FaDatabase,
  FaCloud,
  FaCode,
  FaChartBar,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiKubernetes,
  SiDjango,
  SiCplusplus,
  SiC,
  SiDotnet,
  SiMysql,
  SiOracle,
  SiApachespark,
  SiTensorflow,
  SiQt,
  SiSpring,
} from "react-icons/si";
import { useTranslation } from "../hooks/useTranslation";
import "./SkillsProgress.css";

// Composant pour l'animation des pourcentages
const AnimatedPercentage = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  React.useEffect(() => {
    if (!isActive) return;

    const increment = value / (duration / 16);
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

  return (
    <span ref={ref} className="percentage-display">
      {Math.floor(count)}%
    </span>
  );
};

const SkillIcon = ({ icon: Icon, name, level, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="relative group skill-item"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="skill-card relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer h-36 flex flex-col justify-between smooth-transition"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Badge de niveau */}
        <div className="level-badge">
          {level >= 90 ? "★" : level >= 80 ? "◆" : level >= 70 ? "●" : "○"}
        </div>

        {/* Tooltip */}
        <div className="skill-tooltip">
          Niveau: {level}% •{" "}
          {level >= 90
            ? "Expert"
            : level >= 80
            ? "Avancé"
            : level >= 70
            ? "Intermédiaire"
            : "Débutant"}
        </div>

        {/* Icône et nom */}
        <div className="flex flex-col items-center mb-3">
          <motion.div
            className="skill-icon mb-2"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="text-4xl text-primary group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <h3 className="text-sm font-semibold text-center text-gray-300 group-hover:text-white transition-colors">
            {name}
          </h3>
        </div>

        {/* Barre de progression avec pourcentage */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">Maîtrise</span>
            <AnimatedPercentage value={level} delay={delay + 500} />
          </div>
          <div className="skill-progress-bar w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="skill-progress-fill h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isVisible ? `${level}%` : 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: delay + 0.3,
              }}
            />
          </div>
          {/* Indicateur de niveau textuel */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              {level >= 90
                ? "Expert"
                : level >= 80
                ? "Avancé"
                : level >= 70
                ? "Intermédiaire"
                : "Débutant"}
            </span>
          </div>
        </div>

        {/* Overlay de hover avec progression circulaire */}
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="circular-progress relative">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isHovered ? level / 100 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  strokeDasharray: "100, 100",
                }}
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="circular-progress-text">
              <span className="text-lg font-bold">{level}%</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const TimelineItem = ({ item, index, isLast }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-start group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Ligne de timeline */}
      <div className="absolute left-8 top-12 w-0.5 bg-gradient-to-b from-primary to-violet-500 h-full">
        {!isLast && (
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-violet-500"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
          />
        )}
      </div>

      {/* Point de timeline */}
      <motion.div
        className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-primary/25"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <item.icon className="text-2xl text-white" />

        {/* Effet de pulsation */}
        <motion.div
          className="absolute inset-0 bg-primary rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Contenu */}
      <motion.div
        className="ml-8 flex-1 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 group-hover:border-primary/30 transition-colors duration-300"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
            {item.period}
          </span>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

        {item.technologies && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-white/10 text-white text-xs rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 + techIndex * 0.05 + 0.5 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InteractiveSkillsTimeline = () => {
  const { t } = useTranslation();
  const skills = [
    // Frontend
    { icon: FaReact, name: "React", level: 90, category: "frontend" },
    { icon: SiTypescript, name: "TypeScript", level: 85, category: "frontend" },
    { icon: FaAngular, name: "Angular", level: 80, category: "frontend" },
    {
      icon: SiTailwindcss,
      name: "Tailwind CSS",
      level: 88,
      category: "frontend",
    },
    { icon: FaJs, name: "JavaScript", level: 90, category: "frontend" },

    // Backend & Languages
    { icon: FaPython, name: "Python", level: 85, category: "backend" },
    { icon: SiDjango, name: "Django", level: 80, category: "backend" },
    { icon: SiSpring, name: "Spring Boot", level: 82, category: "backend" },
    { icon: SiCplusplus, name: "C++", level: 75, category: "backend" },
    { icon: SiC, name: "C", level: 70, category: "backend" },
    { icon: FaJava, name: "Java", level: 80, category: "backend" },
    { icon: FaCode, name: "C#", level: 75, category: "backend" },
    { icon: SiDotnet, name: "ASP.NET", level: 70, category: "backend" },

    // Databases
    { icon: SiPostgresql, name: "PostgreSQL", level: 85, category: "database" },
    { icon: SiMysql, name: "MySQL", level: 88, category: "database" },
    { icon: SiOracle, name: "Oracle", level: 75, category: "database" },
    { icon: FaDatabase, name: "SQL Server", level: 80, category: "database" },

    // DevOps & Tools
    { icon: FaGitAlt, name: "Git", level: 90, category: "devops" },
    { icon: FaDocker, name: "Docker", level: 85, category: "devops" },
    { icon: FaCloud, name: "Azure DevOps", level: 80, category: "devops" },
    { icon: SiKubernetes, name: "Kubernetes", level: 75, category: "devops" },

    // Data & AI
    { icon: SiApachespark, name: "Apache Spark", level: 70, category: "data" },
    { icon: SiTensorflow, name: "TensorFlow", level: 75, category: "data" },
    { icon: FaChartBar, name: "Power BI", level: 78, category: "data" },

    // Desktop Development
    { icon: SiQt, name: "PyQt", level: 70, category: "desktop" },
  ];

  const timeline = [
    {
      icon: FaUniversity,
      title: "Cycle Ingénieurie",
      period: "2023 - Présent",
      description:
        "Futur ingénieur en informatique et réseaux option méthodes informatiques appliquées à la gestion des entreprises .",
      technologies: ["Informatique", "Réseaux", "Gestion des entreprises"],
    },
    {
      icon: FaUniversity,
      title: "Cycle Préparatoire Intégré",
      period: "2021 - 2023",
      description: "Formation aux fondamentaux du développement.",
      technologies: [
        "Programmation",
        "Algorithmique",
        "Bases de données",
        "Web",
      ],
    },
    {
      icon: FaUniversity,
      title: "Brevet de Technicien Supérieur",
      period: "2020 - 2021",
      description: "Technicien Supérieur en systèmes électroniques.",
      technologies: ["Electronique", "Programmation", "Réseaux"],
    },
    {
      icon: FaSchool,
      title: "Baccalauréat science expérimentale",
      period: "2019 - 2020",
      description: "Baccalauréat science expérimentale Option physique.",
      technologies: ["Physique", "Chimie", "Mathématiques"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    { key: "all", label: t("skills.categories.all") },
    { key: "frontend", label: t("skills.categories.frontend") },
    { key: "backend", label: t("skills.categories.backend") },
    { key: "database", label: t("skills.categories.database") },
    { key: "devops", label: t("skills.categories.devops") },
    { key: "data", label: t("skills.categories.data") },
    { key: "desktop", label: t("skills.categories.desktop") },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/80 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {" "}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              {t("skills.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Section Compétences */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("skills.technologiesTitle")}
          </motion.h3>

          {/* Filtres de catégories */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`category-filter px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "active"
                    : "border-white/20 text-gray-300 hover:border-primary hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Grille de compétences */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            layout
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                layout
              >
                <SkillIcon
                  icon={skill.icon}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline du parcours */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("skills.timelineTitle")}
          </motion.h3>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  isLast={index === timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSkillsTimeline;
