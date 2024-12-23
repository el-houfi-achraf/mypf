import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { FaDownload, FaCode, FaServer, FaTools } from "react-icons/fa";
import PageTransition from "./PageTransition";

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-3 sm:p-4 bg-black/50 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="flex items-center gap-2 sm:gap-3 mb-3">
        <div
          className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${skill.gradient}`}
        >
          {skill.icon}
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {skill.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{skill.level}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {skill.items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
          >
            <span className="text-xs sm:text-sm text-gray-300">{item}</span>
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

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]));
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skills = [
    {
      name: "Frontend",
      level: "Expert",
      icon: <FaCode className="text-xl text-white" />,
      gradient: "from-blue-500 to-cyan-500",
      items: ["HTML/CSS/JavaScript", "React JS", "WordPress", "TypeScript"],
    },
    {
      name: "Backend",
      level: "Advanced",
      icon: <FaServer className="text-xl text-white" />,
      gradient: "from-violet-500 to-purple-500",
      items: ["PHP", "MySQL/Oracle/SQLServer", "Python/Django", "Java"],
    },
    {
      name: "DevOps & Tools",
      level: "Intermediate",
      icon: <FaTools className="text-xl text-white" />,
      gradient: "from-orange-500 to-pink-500",
      items: ["Unix/Linux", "C/C++", "Git", "Docker"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        className="relative min-h-screen py-12 sm:py-20 bg-black overflow-hidden"
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
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
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start"
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
                  href="/cv.pdf"
                  download
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
