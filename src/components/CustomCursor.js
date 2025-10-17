import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useIsMobile } from "../hooks/usePerformance";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const isMobile = useIsMobile();
  const cursorRef = useRef(null);

  // Position du curseur avec spring pour la fluidité maximale
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Configuration spring ultra-fluide
  const springConfig = {
    damping: 30,
    stiffness: 350,
    mass: 0.5,
    restDelta: 0.001,
    restSpeed: 0.001,
  };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Configuration pour le trail (plus lent)
  const trailConfig = {
    damping: 40,
    stiffness: 200,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.001,
  };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Utiliser requestAnimationFrame pour une animation plus fluide
      requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;

      // Vérifier que target est un élément HTML avant d'utiliser matches
      if (!target || typeof target.matches !== "function") {
        return;
      }

      // Détection des éléments interactifs
      if (
        target.matches('a, button, [role="button"], input, textarea, select')
      ) {
        setIsHovering(true);
        setCursorVariant("hover");

        // Texte personnalisé pour différents types d'éléments
        if (target.matches('a[href^="mailto:"]')) {
          setCursorText("✉️");
        } else if (target.matches('a[href^="tel:"]')) {
          setCursorText("📞");
        } else if (target.matches('a[href*="github"]')) {
          setCursorText("💻");
        } else if (target.matches('a[href*="linkedin"]')) {
          setCursorText("💼");
        } else if (target.matches('button[type="submit"], .btn-primary')) {
          setCursorText("🚀");
        } else if (target.matches(".project-card, .card")) {
          setCursorText("👁️");
        } else {
          setCursorText("→");
        }
      } else if (target.matches("h1, h2, h3, h4, h5, h6")) {
        setIsHovering(true);
        setCursorVariant("text");
        setCursorText("");
      } else if (target.matches("img, .image")) {
        setIsHovering(true);
        setCursorVariant("image");
        setCursorText("🖼️");
      } else if (target.matches(".skill-item, .tech-item")) {
        setIsHovering(true);
        setCursorVariant("skill");
        setCursorText("⚡");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant("default");
      setCursorText("");
    };

    // Ajout des événements
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  // Variants pour différents états du curseur avec transitions plus fluides
  const variants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(147, 51, 234, 0.8)",
      border: "2px solid rgba(147, 51, 234, 0.3)",
      width: 20,
      height: 20,
    },
    hover: {
      scale: 1.5,
      backgroundColor: "rgba(147, 51, 234, 0.9)",
      border: "2px solid rgba(147, 51, 234, 0.6)",
      width: 40,
      height: 40,
    },
    text: {
      scale: 1.2,
      backgroundColor: "rgba(147, 51, 234, 0.6)",
      border: "1px solid rgba(147, 51, 234, 0.8)",
      width: 30,
      height: 30,
    },
    image: {
      scale: 1.8,
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      border: "3px solid rgba(147, 51, 234, 0.8)",
      width: 50,
      height: 50,
    },
    skill: {
      scale: 1.3,
      backgroundColor: "rgba(147, 51, 234, 0.7)",
      border: "2px solid rgba(147, 51, 234, 0.9)",
      width: 35,
      height: 35,
    },
  };

  // Transition configuration ultra-fluide
  const transitionConfig = {
    type: "spring",
    stiffness: 400,
    damping: 35,
    mass: 0.4,
    restDelta: 0.001,
    restSpeed: 0.001,
  };

  // Ne pas afficher sur mobile
  if (isMobile) return null;

  return (
    <>
      {/* Curseur principal */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="cursor-main rounded-full backdrop-blur-sm flex items-center justify-center font-bold text-white text-sm"
          variants={variants}
          animate={cursorVariant}
          transition={transitionConfig}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.15,
                type: "spring",
                stiffness: 600,
                damping: 30,
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cercle de suivi (trail) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 will-change-transform"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="cursor-trail rounded-full border border-purple-500/20"
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            backgroundColor: isHovering
              ? "rgba(147, 51, 234, 0.1)"
              : "rgba(147, 51, 234, 0.05)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 35,
            mass: 0.6,
            delay: 0.05,
          }}
        />
      </motion.div>

      {/* Particules qui suivent le curseur */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-30 will-change-transform"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="cursor-particle absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              x: Math.cos((i * 120 * Math.PI) / 180) * (isHovering ? 25 : 15),
              y: Math.sin((i * 120 * Math.PI) / 180) * (isHovering ? 25 : 15),
              opacity: isHovering ? 0.8 : 0.4,
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.3,
              delay: i * 0.05,
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default CustomCursor;
