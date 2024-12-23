import { motion } from "framer-motion";

const PageTransition = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
        type: "spring",
        stiffness: 50,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
