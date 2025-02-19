import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiDjango,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiPhp,
  SiBootstrap,
} from "react-icons/si";
import AnimatedBackground from "./AnimatedBackground";

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

      {/* Overview */}
      <p className="text-gray-400 mb-4">{project.overview}</p>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-primary mb-2">
          Key Features
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {project.features.map((feature, i) => (
            <li key={i} className="text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-primary mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10 text-gray-300 flex items-center gap-1"
            >
              {tech.icon}
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-lg" />
            View Source
          </motion.a>
        )}
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="text-lg" />
            Live Demo
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

const projects = [
  {
    title: "VG_IT IAM",
    overview:
      "A robust Identity and Access Management (IAM) platform designed to streamline user management, permissions, and Single Sign-On (SSO) within organizations.",
    features: [
      "Centralized User Management",
      "Role-Based Access Control (RBAC)",
      "Single Sign-On (SSO)",
      "Intuitive Admin Dashboard",
      "Integrated Ticketing System",
      "Real-time Chat",
      "Comprehensive Reporting",
    ],
    technologies: [
      { name: "Django", icon: <SiDjango /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "HTML/CSS/JS", icon: <SiJavascript /> },
    ],
    github: "https://github.com/el-houfi-achraf/PFA",
  },
  {
    title: "FaceSmart",
    overview:
      "An AI-powered employee management application using facial recognition for attendance tracking and productivity management.",
    features: [
      "Employee Information Management",
      "Facial Recognition for Attendance",
      "Production Tracking",
      "Performance Analytics",
      "Automated Time Tracking",
      "Report Generation",
    ],
    technologies: [
      { name: "Python", icon: <SiPython /> },
      { name: "OpenCV", icon: <SiPython /> },
      { name: "TensorFlow", icon: <SiPython /> },
    ],
    github: "https://github.com/el-houfi-achraf/Projet-python-Facesmart",
  },
  {
    title: "UMLForge",
    overview:
      "A modern web-based UML modeling tool with interactive diagram creation and code generation capabilities.",
    features: [
      "Interactive Diagram Editor",
      "Multi-language Code Generation",
      "Project Management",
      "Version History",
      "Export Options",
      "AI Integration",
    ],
    technologies: [
      { name: "React", icon: <SiReact /> },
      { name: "Material UI", icon: <SiReact /> },
      { name: "Google Gemini AI", icon: <SiReact /> },
    ],
    github: "https://github.com/el-houfi-achraf/UMLForge",
  },
  {
    title: "PHP Student Management Dashboard",
    overview:
      "A comprehensive student management system developed with PHP, offering robust features for managing student information, grades, and academic data with a focus on security and user experience.",
    features: [
      "User Authentication & Role-based Access",
      "Student Information Management",
      "Subject & Grades Management",
      "Interactive Dashboard & Analytics",
      "Responsive Design",
      "Advanced Search & Filtering",
      "Secure Data Handling",
      "Export Functionality",
    ],
    technologies: [
      { name: "PHP", icon: <SiPhp /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "HTML/CSS", icon: <SiHtml5 /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
    ],
    github: "https://github.com/el-houfi-achraf/PHP-miniprojet-",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500">
            Projects
          </h2>
          <p className="mt-4 text-gray-400">
            Here are some of my recent projects
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
              <h4 className="text-2xl font-bold text-primary mb-2">10+</h4>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
              <h4 className="text-2xl font-bold text-primary mb-2">50+</h4>
              <p className="text-gray-400">Commits</p>
            </div>
            <div className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
              <h4 className="text-2xl font-bold text-primary mb-2">8+</h4>
              <p className="text-gray-400">Technologies</p>
            </div>
            <div className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
              <h4 className="text-2xl font-bold text-primary mb-2">2+</h4>
              <p className="text-gray-400">Years Coding</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
