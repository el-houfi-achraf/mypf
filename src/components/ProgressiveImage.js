import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ProgressiveImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blur, setBlur] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      setTimeout(() => setBlur(false), 100);
    };
  }, [src]);

  return (
    <motion.div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-500/20 animate-pulse"
        animate={{ opacity: isLoaded ? 0 : 1 }}
      />
      <motion.img
        src={src}
        alt={alt}
        className={`${className} transition-all duration-500 ${
          blur ? "blur-xl scale-105" : "blur-0 scale-100"
        }`}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        {...props}
      />
    </motion.div>
  );
};

export default ProgressiveImage;
