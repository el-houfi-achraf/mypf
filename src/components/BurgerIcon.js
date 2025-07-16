import React from "react";
import { motion } from "framer-motion";

const BurgerIcon = ({ isOpen, onClick, className = "" }) => {
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 8,
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      x: 0,
    },
    open: {
      opacity: 0,
      x: -10,
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: -45,
      y: -8,
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-md group ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
    >
      <motion.span
        className="w-6 h-0.5 bg-current transform origin-center transition-all duration-300 group-hover:bg-primary"
        variants={topLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="w-6 h-0.5 bg-current transform origin-center mt-1.5 transition-all duration-300 group-hover:bg-primary"
        variants={middleLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="w-6 h-0.5 bg-current transform origin-center mt-1.5 transition-all duration-300 group-hover:bg-primary"
        variants={bottomLineVariants}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default BurgerIcon;
