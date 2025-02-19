import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaBriefcase,
  FaLanguage,
} from "react-icons/fa";
import AnimatedBackground from "./AnimatedBackground";

const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
    <Icon className="text-2xl text-gray-400 group-hover:text-primary transition-colors" />
    <span className="sr-only">{label}</span>
  </motion.a>
);

const Contact = ({ showNotification }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.8, 1]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Logique d'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification("Message sent successfully!");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      showNotification("Failed to send message", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background Animation */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div style={{ scale }} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500 pb-2"
          >
            {t("Contact")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mt-4"
          >
            {t("contact me for more information")}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black/80 backdrop-blur-xl p-8 rounded-xl border border-white/10">
                {/* Location */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/5">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Location</h3>
                    <p className="text-gray-400">Morocco</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/5">
                    <FaEnvelope className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <a
                      href="mailto:elhoufiashraf@gmail.com"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      elhoufiashraf@gmail.com
                    </a>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/5">
                    <FaBriefcase className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Status</h3>
                    <p className="text-gray-400">Open to Opportunities</p>
                    <p className="text-sm text-gray-500">
                      Available for Internships & Collaborations
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/5">
                    <FaLanguage className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Languages
                    </h3>
                    <p className="text-gray-400">Arabic (Native)</p>
                    <p className="text-gray-400">French (Professional)</p>
                    <p className="text-gray-400">English (Professional)</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <SocialLink
                    href="https://github.com/el-houfi-achraf"
                    icon={FaGithub}
                    label="GitHub"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/achraf-el-houfi-136b4230b/"
                    icon={FaLinkedin}
                    label="LinkedIn"
                  />
                  <SocialLink
                    href="https://www.instagram.com/ashraf_elhoufi/"
                    icon={FaInstagram}
                    label="Instagram"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={t("name")}
                  className="relative w-full px-4 py-3 bg-black/80 backdrop-blur-xl rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder={t("message")}
                  rows="5"
                  className="relative w-full px-4 py-3 bg-black/80 backdrop-blur-xl rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-6 py-4 bg-primary rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      {t("submit")}
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
