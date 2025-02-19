import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import Typewriter from "typewriter-effect";
import { useTranslation } from "react-i18next";
import profileImage from "../assets/images/profile.png";
import AnimatedBackground from "./AnimatedBackground";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-8 flex items-center bg-black overflow-hidden">
      {/* Replace the existing Canvas background with AnimatedBackground */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-6 items-center max-w-5xl mx-auto w-full">
          {/* Left Content */}
          <motion.div className="space-y-4 text-center lg:text-left order-2 lg:order-1">
            {/* Welcome badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center justify-center lg:justify-start"
            >
              <div className="flex items-center px-3 py-1.5 bg-white/5 backdrop-blur-lg rounded-full border border-white/10">
                <motion.span
                  className="text-[10px] sm:text-xs text-primary font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t("welcome to my portfolio website")}
                </motion.span>
                <motion.div
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary ml-1.5"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Title Section */}
            <div className="space-y-3">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500">
                  <Typewriter
                    options={{
                      strings: [
                        "Student Developer",
                        "AI Enthusiast",
                        "Problem Solver",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 50,
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                A passionate Student Developer specializing in building modern
                web applications with expertise in both frontend and backend
                technologies. Currently pursuing Computer Development at EMSI, I
                combine technical skills with creative problem-solving to
                deliver innovative solutions.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.a
                href="#projects"
                onClick={scrollToProjects}
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 bg-primary rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-xs sm:text-sm font-medium text-white flex items-center gap-1.5">
                  {t("my works")}
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: 5 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1,
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xs sm:text-sm font-medium text-white">
                  {t("wanna contact me ?")}
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square w-48 sm:w-64 md:w-80 lg:w-96 mx-auto">
              {/* Rotating border effect */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50 p-1" />
              </motion.div>

              {/* Glowing circles */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-violet-500/20 to-purple-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Profile image container */}
              <motion.div
                className="relative rounded-full overflow-hidden border-2 border-white/10 backdrop-blur-sm"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating badges - Ajustés pour mobile */}
              <motion.div
                className="absolute top-5 -right-2 sm:right-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-xs sm:text-sm text-primary">
                  Frontend Developer
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-5 -left-2 sm:left-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-xs sm:text-sm text-violet-500">
                  Backend Developer
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs text-gray-400">Scroll</span>
          <div className="w-4 h-7 rounded-full border-2 border-primary p-1">
            <motion.div
              className="w-0.5 h-1.5 bg-primary rounded-full mx-auto"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
