import React, { createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Récupérer le thème sauvegardé ou utiliser la préférence système
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Sauvegarder le thème
    localStorage.setItem("portfolio-theme", theme);

    // Appliquer le thème au document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Mettre à jour les meta tags pour mobile
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content = theme === "dark" ? "#000000" : "#ffffff";
    }
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);

    // Animation de transition personnalisée
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      });
    } else {
      // Fallback pour les navigateurs non compatibles
      setTimeout(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }, 150);
    }

    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isTransitioning}
      aria-label={`Passer au mode ${isDark ? "clair" : "sombre"}`}
    >
      {/* Container pour les icônes */}
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Icône Soleil */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            y: isDark ? -30 : 0,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaSun className="text-yellow-500 text-xl" />
        </motion.div>

        {/* Icône Lune */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            y: isDark ? 0 : 30,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaMoon className="text-blue-400 text-xl" />
        </motion.div>
      </div>

      {/* Effet de brillance au hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      {/* Indicateur de transition */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
