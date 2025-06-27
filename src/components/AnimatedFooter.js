import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
  FaCoffee,
  FaMapMarkerAlt,
  FaPhone,
  FaRocket,
} from "react-icons/fa";
import { SiReact, SiTailwindcss, SiFramer } from "react-icons/si";
import { useTranslation } from "../hooks/useTranslation";

const SocialLink = ({ href, icon: Icon, label, color, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon
      className={`text-xl ${color} group-hover:scale-110 transition-transform duration-300`}
    />

    {/* Tooltip */}
    <motion.div
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
      initial={{ y: 10 }}
      whileHover={{ y: 0 }}
    >
      {label}
    </motion.div>

    {/* Effet de brillance */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
  </motion.a>
);

const TechBadge = ({ icon: Icon, name, delay }) => (
  <motion.div
    className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-xs" />
    <span>{name}</span>
  </motion.div>
);

const QuickLink = ({ href, label, delay }) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ x: 5 }}
  >
    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    {label}
  </motion.a>
);

const AnimatedFooter = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();
  const ref = React.useRef();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://github.com/votre-username",
      icon: FaGithub,
      label: "GitHub",
      color: "text-gray-300 hover:text-white",
    },
    {
      href: "https://linkedin.com/in/votre-profil",
      icon: FaLinkedin,
      label: "LinkedIn",
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "https://twitter.com/votre-compte",
      icon: FaTwitter,
      label: "Twitter",
      color: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "https://instagram.com/votre-compte",
      icon: FaInstagram,
      label: "Instagram",
      color: "text-pink-400 hover:text-pink-300",
    },
    {
      href: "mailto:achraf.elhoufi@example.com",
      icon: FaEnvelope,
      label: "Email",
      color: "text-green-400 hover:text-green-300",
    },
  ];
  const quickLinks = [
    { href: "#hero", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const techStack = [
    { icon: SiReact, name: "React" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiFramer, name: "Framer Motion" },
  ];

  return (
    <>
      <footer
        ref={ref}
        className="relative bg-black border-t border-white/10 overflow-hidden"
      >
        {/* Arrière-plan animé */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
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
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Section principale */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* À propos */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                {" "}
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                    {t("footer.title")}
                  </span>
                </motion.h3>
                <p className="text-gray-300 leading-relaxed">
                  {t("footer.description")}
                </p>
              </div>

              {/* Technologies utilisées */}
              <div className="space-y-3">
                {" "}
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  {t("footer.builtWith")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <TechBadge
                      key={tech.name}
                      icon={tech.icon}
                      name={tech.name}
                      delay={0.2 + index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Liens rapides */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white">
                {t("footer.quickLinks")}
              </h3>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <QuickLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </nav>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white">
                {t("nav.contact")}
              </h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3 text-gray-300"
                  whileHover={{ x: 5, color: "#7c3aed" }}
                >
                  <FaMapMarkerAlt className="text-primary" />
                  <span>Paris, France</span>
                </motion.div>
                <motion.a
                  href="mailto:achraf.elhoufi@example.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <FaEnvelope className="text-primary" />
                  <span>achraf.elhoufi@example.com</span>
                </motion.a>
                <motion.a
                  href="tel:+33612345678"
                  className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <FaPhone className="text-primary" />
                  <span>+33 6 12 34 56 78</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Réseaux sociaux */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white">
                {t("footer.followMe")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    icon={social.icon}
                    label={social.label}
                    color={social.color}
                    delay={0.5 + index * 0.1}
                  />
                ))}
              </div>

              {/* CTA pour collaboration */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-violet-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {" "}
                  <FaRocket className="text-sm" />
                  {t("footer.collaborate")}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Séparateur */}
          <motion.div
            className="border-t border-white/10 pt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Copyright et crédits */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.p
                className="text-gray-400 text-sm flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                © {currentYear} {t("footer.title")}. {t("footer.madeWith")}{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaHeart className="text-red-500" />{" "}
                </motion.span>{" "}
                {t("footer.and")}{" "}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCoffee className="text-yellow-600" />
                </motion.span>
              </motion.p>

              <motion.div
                className="flex items-center gap-4 text-gray-400 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {" "}
                <span>{t("footer.version")}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>
                  {t("footer.lastUpdate")}: {currentYear}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Effet de vagues en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-primary"></div>
      </footer>

      {/* Bouton de retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary to-violet-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("footer.backToTop")}
      >
        <FaArrowUp className="text-xl" />
      </motion.button>
    </>
  );
};

export default AnimatedFooter;
