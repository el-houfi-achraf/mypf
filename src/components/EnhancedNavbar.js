import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronRight, FaKeyboard } from "react-icons/fa";
import { SiCodersrank } from "react-icons/si";
import BurgerIcon from "./BurgerIcon";
import LanguageSelector from "./LanguageSelector";
import { useIsMobile } from "../hooks/usePerformance";
import { useTranslation } from "../hooks/useTranslation";

const NavItem = ({ href, label, isActive, index, onKeyDown, tabIndex }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <motion.a
      href={href}
      className="relative px-4 py-2 group flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Naviguer vers ${label}`}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-full"
          layoutId="nav-pill"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      <span
        className={`relative text-sm font-medium ${
          isActive ? "text-primary" : "text-gray-300"
        } transition-colors group-hover:text-primary group-focus:text-primary`}
      >
        {label}
      </span>
      <motion.span
        className={`text-xs ${
          isActive ? "text-primary" : "text-gray-500"
        } opacity-0 group-hover:opacity-100 group-focus:opacity-100`}
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaChevronRight />
      </motion.span>
    </motion.a>
  </motion.div>
);

const KeyboardHint = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg border border-white/10 text-sm max-w-xs"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaKeyboard className="text-primary" />
          <span className="font-medium">Navigation au clavier</span>
        </div>
        <div className="space-y-1 text-xs text-gray-300">
          <div>
            <kbd className="bg-gray-700 px-1 rounded">Tab</kbd> - Naviguer
          </div>
          <div>
            <kbd className="bg-gray-700 px-1 rounded">Enter</kbd> - Sélectionner
          </div>
          <div>
            <kbd className="bg-gray-700 px-1 rounded">Esc</kbd> - Fermer menu
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onKeyDown,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-bl from-black via-black/95 to-black/90 backdrop-blur-lg border-l border-white/10"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <motion.span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Navigation
              </motion.span>
              <motion.button
                onClick={onClose}
                onKeyDown={onKeyDown}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fermer le menu"
              >
                <FaTimes className="text-gray-400" />
              </motion.button>
            </div>
            <nav
              className="space-y-2"
              role="navigation"
              aria-label="Menu principal"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    activeSection === item.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-white/5 focus:bg-white/5"
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                  onKeyDown={onKeyDown}
                  tabIndex={0}
                  aria-current={
                    activeSection === item.href.slice(1) ? "page" : undefined
                  }
                >
                  <span className="text-lg">{item.label}</span>
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <FaChevronRight className="text-primary" />
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const EnhancedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const isMobile = useIsMobile();
  const navRef = useRef();
  const { t } = useTranslation();

  const navItems = [
    { href: "#hero", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion de la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      setIsKeyboardNavigation(true);

      if (e.key === "Tab") {
        setShowKeyboardHint(true);
        setTimeout(() => setShowKeyboardHint(false), 3000);
      }

      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNavigation(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.target.click();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-lg p-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onKeyDown={handleKeyDown}
              aria-label="Retour à l'accueil"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-violet-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                <SiCodersrank className="text-white text-xl" />
              </div>{" "}
              <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                ACHRAF EL HOUFI
              </span>
            </motion.a>{" "}
            {/* Navigation desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2">
                {navItems.map((item, index) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={activeSection === item.href.slice(1)}
                    index={index}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                  />
                ))}
              </div>

              {/* Sélecteur de langue */}
              <LanguageSelector />
            </div>
            {/* Menu burger mobile */}
            <div className="lg:hidden flex items-center gap-4">
              <LanguageSelector />
              <BurgerIcon
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                aria-label={
                  isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                }
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleMobileMenu();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onKeyDown={handleKeyDown}
      />

      {/* Hint de navigation clavier */}
      <KeyboardHint isVisible={showKeyboardHint && isKeyboardNavigation} />
    </>
  );
};

export default EnhancedNavbar;
