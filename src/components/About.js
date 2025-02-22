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
  SiTailwindcss,
} from "react-icons/si";
import PageTransition from "./PageTransition";
import AnimatedBackground from "./AnimatedBackground";

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

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.98, 1]), {
    stiffness: 50,
    damping: 15,
    mass: 0.1,
  });

  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

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
          name: "Tailwind",
          icon: <SiTailwindcss className="text-[#06B6D4]" />,
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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
        <AnimatedBackground />

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

              <div className="mb-6">
                <motion.a
                  href={`${process.env.PUBLIC_URL}/cv.pdf`}
                  download="Ashraf_El_Houfi_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload className="text-lg" />
                  Download CV
                </motion.a>
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
                    <p className="text-gray-500 text-xs">Current</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      baccalauréat science expérimentale
                    </h4>
                    <p className="text-gray-500 text-xs">2019-2020</p>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium">
                      Brevet de Technicien Supérieur
                    </h4>

                    <p className="text-gray-500 text-xs">2020-2021</p>
                  </div>
                </div>
              </div>
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
