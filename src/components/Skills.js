import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AnimatedBackground from "./AnimatedBackground";

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className="relative group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.05, // Délai plus court
      }}
      viewport={{
        once: true,
        margin: "-10%", // Réduire la marge de déclenchement
      }}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
      />
      <div className="relative h-full bg-black/80 backdrop-blur-xl p-8 rounded-lg border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color}`}>
            <span className="text-2xl text-white">{skill.icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{skill.name}</h3>
            <p className="text-gray-400">{skill.level}</p>
          </div>
        </div>

        <div className="space-y-4">
          {skill.items.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">
                  {item.icon} {item.name}
                </span>
                <span className="text-primary">{item.proficiency}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]));

  const skills = [
    {
      name: t("skills.frontend"),
      level: t("skills.level.expert"),
      icon: "🎨",
      color: "from-violet-600 to-indigo-600",
      glowColor: "violet",
      items: [
        { name: "HTML/CSS/JavaScript", icon: "🌐", proficiency: 90 },
        { name: "React JS", icon: "⚛️", proficiency: 85 },
        { name: "WordPress", icon: "📝", proficiency: 80 },
      ],
    },
    {
      name: t("skills.backend"),
      level: t("skills.level.advanced"),
      icon: "⚙️",
      color: "from-cyan-500 to-blue-600",
      glowColor: "cyan",
      items: [
        { name: "PHP", icon: "🐘", proficiency: 85 },
        { name: "MySQL/Oracle/SQLServer", icon: "💾", proficiency: 85 },
        { name: "Python/Django", icon: "🐍", proficiency: 80 },
        { name: "Java", icon: "☕", proficiency: 75 },
      ],
    },
    {
      name: t("skills.devops"),
      level: t("skills.level.intermediate"),
      icon: "🛠️",
      color: "from-orange-500 to-amber-500",
      glowColor: "orange",
      items: [
        { name: "Unix/Linux", icon: "🐧", proficiency: 80 },
        { name: "C/C++", icon: "⚙️", proficiency: 75 },
        { name: "Git", icon: "📊", proficiency: 85 },
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative min-h-screen py-20 overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ scale }} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500 animate-gradient-x pb-2"
          >
            {t("Skills")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mt-4"
          >
            {t("learn more about my skills")}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
