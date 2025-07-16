import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from "react-icons/fa";
import LazyImage from "./LazyImage";
import { useIsMobile } from "../hooks/usePerformance";
import { useTranslation } from "../hooks/useTranslation";
import facesmartImage from "../assets/images/facesmart.png";
import se7atiImage from "../assets/images/se7ati.png";
import mbImage from "../assets/images/mb.png";
import ezImage from "../assets/images/ez.png";
import UMLImage from "../assets/images/uml.png";
import vgImage from "../assets/images/VG.png";
import toneImage from "../assets/images/Tone.png";

const ProjectCard3D = ({ project, index }) => {
  const cardRef = useRef();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // Valeurs de mouvement pour l'effet 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformations 3D avec spring pour plus de fluidité
  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), {
    stiffness: 400,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), {
    stiffness: 400,
    damping: 30,
  });

  // Gestion du mouvement de la souris
  const handleMouseMove = (event) => {
    if (isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000 project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden transform-gpu will-change-transform"
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image du projet */}
        <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
            placeholder={
              <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                <FaCode className="text-4xl text-white/50" />
              </div>
            }
          />

          {/* Overlay avec boutons d'action */}
          <motion.div
            className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voir le code source"
            >
              <FaGithub className="text-xl text-white" />
            </motion.a>

            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary/20 backdrop-blur-sm rounded-full hover:bg-primary/30 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voir la démo"
            >
              <FaExternalLinkAlt className="text-xl text-primary" />
            </motion.a>
          </motion.div>
        </div>

        {/* Contenu de la carte */}
        <div className="p-6 space-y-4">
          {/* Titre et statut */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                project.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {project.status === "completed"
                ? t("projects.status.completed")
                : t("projects.status.inProgress")}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies utilisées */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgb(147 51 234 / 0.2)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Statistiques du projet */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {" "}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FaEye className="text-xs" />
                {project.views || "0"} {t("projects.views")}
              </span>
              <span className="flex items-center gap-1">
                <FaCode className="text-xs" />
                {project.linesOfCode || "N/A"} {t("projects.lines")}
              </span>
            </div>
            <motion.div
              className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${project.completion || 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Effet de brillance au hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12" />
        </motion.div>

        {/* Bordure animée */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(45deg, transparent, #7c3aed, transparent) border-box",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects3D = () => {
  const [filter, setFilter] = useState("all");
  const { t } = useTranslation();
  const [projects] = useState([
    {
      id: 1,
      title: "FaceSmart",
      description: t("projects.projectDescriptions.facesmart"),
      image: facesmartImage,
      technologies: ["Python ", "OpenCV ", "TensorFlow"],
      github: "https://github.com/example/ecommerce",
      demo: "https://demo-ecommerce.com",
      status: "completed",
      category: "fullstack",
      views: 1234,
      linesOfCode: "15.2k",
      completion: 100,
    },
    {
      id: 2,
      title: "STEVIA",
      description: t("projects.projectDescriptions.stevia"),
      image: se7atiImage,
      technologies: ["Django", "Jitsi Api ", "Tailwind Css", "Mysql"],
      github: "https://github.com/example/dashboard",
      demo: "https://demo-dashboard.com",
      status: "completed",
      category: "frontend",
      views: 856,
      linesOfCode: "8.7k",
      completion: 75,
    },
    {
      id: 3,
      title: "Mobile App Pharmacy",
      description: t("projects.projectDescriptions.pharmacy"),
      image: mbImage,
      technologies: ["Spring Boot", "Angular", "Expo", "Mysql"],
      github: "https://github.com/example/mobile-app",
      demo: "https://demo-mobile.com",
      status: "completed",
      category: "mobile",
      views: 2103,
      linesOfCode: "12.4k",
      completion: 100,
    },
    {
      id: 4,
      title: "UMLForge",
      description: t("projects.projectDescriptions.umlforge"),
      image: UMLImage,
      technologies: ["Java", "JavaFX", "UML", "XML"],
      github: "https://github.com/example/umlforge",
      demo: "https://demo-umlforge.com",
      status: "completed",
      category: "fullstack",
      views: 892,
      linesOfCode: "18.5k",
      completion: 100,
    },
    {
      id: 5,
      title: "ToneFixer",
      description: t("projects.projectDescriptions.tonefixer"),
      image: toneImage,
      technologies: ["Python", "PyQt5", "Audio Processing", "FFmpeg"],
      github: "https://github.com/example/tonefixer",
      demo: "https://demo-tonefixer.com",
      status: "completed",
      category: "fullstack",
      views: 654,
      linesOfCode: "7.8k",
      completion: 100,
    },
    {
      id: 6,
      title: "VG_IT IAM",
      description: t("projects.projectDescriptions.vgitiam"),
      image: vgImage,
      technologies: ["Spring Boot", "Angular", "Keycloak", "PostgreSQL"],
      github: "https://github.com/example/vgit-iam",
      demo: "https://demo-vgit-iam.com",
      status: "completed",
      category: "fullstack",
      views: 1456,
      linesOfCode: "25.3k",
      completion: 100,
    },
  ]);

  const filters = [
    { key: "all", label: t("projects.filters.all") },
    { key: "fullstack", label: t("projects.filters.fullstack") },
    { key: "frontend", label: t("projects.filters.frontend") },
    { key: "mobile", label: t("projects.filters.mobile") },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* En-tête de section */}
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
              {t("projects.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                filter === filterItem.key
                  ? "bg-primary border-primary text-white"
                  : "border-white/20 text-gray-300 hover:border-primary hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterItem.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* CTA pour voir plus de projets */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/el-houfi-achraf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-xl" />
            {t("projects.githubCTA")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects3D;
