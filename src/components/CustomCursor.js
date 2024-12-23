import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isClickable =
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.classList.contains("clickable");

      setIsHovering(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          borderColor: isHovering ? "#0070f3" : "#ffffff",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-current opacity-50 transition-colors duration-200" />
      </motion.div>
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
          backgroundColor: isHovering ? "#0070f3" : "#ffffff",
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 15,
          mass: 0.1,
        }}
        style={{
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
