import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { FaDownload, FaCode, FaServer, FaTools, FaJava } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiWordpress,
  SiTypescript,
  SiPhp,
  SiMysql,
  SiPython,
  SiDjango,
  SiLinux,
  SiGit,
  SiDocker,
  SiCplusplus,
} from "react-icons/si";
import PageTransition from "./PageTransition";
import cvFile from "../assets/documents/cv.pdf";

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
      margin: "-50px",
    }}
    transition={{
      duration: 0.4,
      delay: index * 0.1,
      ease: "easeOut",
    }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
    <div className="relative p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 sm:p-3 rounded-lg ${skill.gradient}`}>
          {skill.icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-400">{skill.level}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skill.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.2,
                delay: i * 0.05,
              },
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <span className="text-2xl sm:text-3xl">{item.icon}</span>
            <span className="text-xs sm:text-sm text-gray-300 text-center">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.95, 1]), {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const skills = [
    {
      name: "Frontend",
      level: "Expert",
      icon: <FaCode className="text-2xl text-white" />,
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      items: [
        { name: "HTML5", icon: <SiHtml5 className="text-[#E34F26]" /> },
        { name: "CSS3", icon: <SiCss3 className="text-[#1572B6]" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-[#F7DF1E]" />,
        },
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" /> },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-[#3178C6]" />,
        },
      ],
    },
    {
      name: "Backend",
      level: "Advanced",
      icon: <FaServer className="text-2xl text-white" />,
      gradient: "bg-gradient-to-r from-violet-500 to-purple-500",
      items: [
        { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
        { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
        { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
        { name: "Java", icon: <FaJava className="text-[#007396]" /> },
      ],
    },
    {
      name: "DevOps & Tools",
      level: "Intermediate",
      icon: <FaTools className="text-2xl text-white" />,
      gradient: "bg-gradient-to-r from-orange-500 to-pink-500",
      items: [
        { name: "Linux", icon: <SiLinux className="text-white" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <PageTransition>
      <section
        ref={containerRef}
        id="about"
        className="relative min-h-screen py-12 sm:py-20 bg-black overflow-hidden will-change-transform"
        aria-label="About Section"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ambientLight intensity={0.5} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        <motion.div
          style={{ scale, y }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Section Title */}
          <motion.div
            style={{ scale }}
            className="text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.25, 0, 1],
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500">
                About Me
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left Side - About Text */}
            <motion.div
              variants={itemVariants}
              style={{ y }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
                <div className="relative p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm sm:text-base text-gray-300 leading-relaxed"
                  >
                    A dedicated computer development , I am passionate about web
                    development, software engineering, desktop application
                    creation, and e-commerce solutions. With a strong foundation
                    in coding and problem-solving, I am eager to contribute my
                    skills to innovative projects and collaborate with
                    forward-thinking teams to create impactful solutions.
                  </motion.p>
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary font-medium">
                      École Marocaine de Science et d'Ingénieur
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Développement Informatique
                    </p>
                    <p className="text-gray-500 text-xs">Actuel</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      baccalauréat science expérimentale
                    </h4>
                    <p className="text-gray-400 text-sm">Option physique</p>
                    <p className="text-gray-500 text-xs">2019-2020</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      Brevet de Technicien Supérieur
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Système électronique
                    </p>
                    <p className="text-gray-500 text-xs">2020-2021</p>
                  </div>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Certifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary font-medium">
                      Java and Object-Oriented Programming
                    </h4>
                    <p className="text-gray-400 text-sm">
                      University of Pennsylvania
                    </p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      Web Design for Everybody Capstone
                    </h4>
                    <p className="text-gray-400 text-sm">
                      University of Michigan
                    </p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      The Arduino Platform and C Programming
                    </h4>
                    <p className="text-gray-400 text-sm">
                      University of California, Irvine
                    </p>
                  </div>
                </div>
              </div>

              {/* Download CV Button */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center sm:justify-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.a
                  href={cvFile}
                  download="Ashraf_El_Houfi_CV.pdf"
                  className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <FaDownload className="relative z-10 text-sm sm:text-base text-white" />
                  <span className="relative z-10 text-sm sm:text-base font-medium text-white">
                    Download CV
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Skills */}
            <motion.div
              variants={containerVariants}
              className="space-y-3 sm:space-y-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <SkillCard skill={skill} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default About;
