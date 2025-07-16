import { motion } from "framer-motion";
import {
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import AnimatedBackground from "./AnimatedBackground";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Background Animation */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500">
              Portfolio
            </h3>
            <p className="mt-2 text-gray-400 text-sm">
              Creating elegant solutions through clean code
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4"></div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © {currentYear} All rights reserved.{" "}
              <span className="inline-flex items-center gap-1">
                Made with <FaHeart className="text-red-500 animate-pulse" />
              </span>
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp className="text-gray-400" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
