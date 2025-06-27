import { motion, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/usePerformance";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [trail, setTrail] = useState([]);
  const isMobile = useIsMobile();
  const trailLength = 8;

  // Utilisation de springs pour des animations plus fluides
  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Mise à jour du trail
      setTrail((prevTrail) => {
        const newTrail = [newPosition, ...prevTrail].slice(0, trailLength);
        return newTrail;
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.classList.contains("cursor-pointer");

      const isText =
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "SPAN";

      if (isClickable) {
        setIsHovering(true);
        setCursorType("pointer");
      } else if (isText) {
        setIsHovering(false);
        setCursorType("text");
      } else {
        setIsHovering(false);
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, trailLength]);

  if (isMobile) return null;

  return (
    <>
      {/* Trail effect */}
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            x: position.x - 2,
            y: position.y - 2,
          }}
        >
          <div
            className="w-1 h-1 bg-white rounded-full"
            style={{
              opacity: ((trailLength - index) / trailLength) * 0.5,
              transform: `scale(${(trailLength - index) / trailLength})`,
            }}
          />
        </motion.div>
      ))}

      {/* Curseur principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Curseur externe */}
        <motion.div
          className="w-8 h-8 border-2 border-white rounded-full"
          animate={{
            scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Point central */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
          animate={{
            scale: isHovering ? 0 : isClicking ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Effet spécial pour les différents types */}
        {cursorType === "pointer" && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-12 h-12 border border-primary rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {cursorType === "text" && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-white"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
