import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAngular,
  FaMobile,
  FaJava,
  FaSchool,
  FaCalendarPlus,
  FaSadCry,
  FaUniversity,
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
} from "react-icons/si";
import { FaDatabase, FaCloud, FaCode } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

const SkillIcon = ({ icon: Icon, name, level, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05, rotateY: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icône */}
        <div className="flex items-center justify-center mb-3">
          <Icon className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Nom de la compétence */}
        <p className="text-sm font-medium text-center text-gray-300 group-hover:text-white transition-colors">
          {name}
        </p>

        {/* Barre de progression circulaire */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              className="stroke-gray-700"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="16"
              cy="16"
              r="14"
              className="stroke-primary"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? level / 100 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                strokeDasharray: "88",
                strokeDashoffset: "88",
              }}
            />
          </svg>
          <span className="absolute text-xs font-bold text-white">
            {level}%
          </span>
        </div>

        {/* Effet de brillance */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
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
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-primary border-primary text-white"
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
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            layout
          >
            {filteredSkills.map((skill, index) => (
              <SkillIcon
                key={skill.name}
                icon={skill.icon}
                name={skill.name}
                level={skill.level}
                delay={index * 0.1}
              />
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
