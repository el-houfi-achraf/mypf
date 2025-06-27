import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

const WaveBackground = () => {
  const { scrollYProgress } = useScroll();
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Vague 1 */}
      <motion.svg
        className="absolute bottom-0 w-full h-32 text-primary/10"
        style={{ y: wave1Y }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="currentColor"
          animate={{
            d: [
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
              "M0,0V60.29c47.79,15.2,103.59,25.17,158,21,70.36-8.37,136.33-26.31,206.8-30.5C438.64,45.43,512.34,66.67,583,85.05c69.27,11,138.3,17.88,209.4,6.08,36.15-9,69.85-20.84,104.45-32.34C989.49,38,1113-1.29,1200,65.47V0Z",
              "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Vague 2 */}
      <motion.svg
        className="absolute bottom-0 w-full h-24 text-violet-500/8"
        style={{ y: wave2Y }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          fill="currentColor"
          animate={{
            d: [
              "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z",
              "M985.66,105.83C906.67,85,823.78,44,743.84,27.19c-82.26-20.34-168.06-19.33-250.45-2.61-57.84,14.73-114,34.07-172,44.86A600.21,600.21,0,0,1,0,40.35V120H1200V108.8C1132.19,131.92,1055.71,124.31,985.66,105.83Z",
              "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.svg>

      {/* Vague 3 */}
      <motion.svg
        className="absolute bottom-0 w-full h-16 text-blue-500/5"
        style={{ y: wave3Y }}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          fill="currentColor"
          animate={{
            d: [
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
              "M321.39,43.44c58-7.79,114.16-23.13,172-34.86,82.39-13.72,168.19-14.73,250.45-3.39C823.78,18,906.67,59,985.66,79.83c70.05,15.48,146.53,23.09,214.34,0V0H0V14.35A600.21,600.21,0,0,0,321.39,43.44Z",
              "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.svg>
    </div>
  );
};

const FloatingLabel = ({
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  required = false,
  multiline = false,
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="relative group">
      <div className="flex items-center">
        <Icon className="absolute left-4 z-10 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
        <InputComponent
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={`w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 ${
            multiline ? "min-h-[120px] resize-none" : ""
          }`}
          placeholder={label}
          {...(multiline && { rows: 5 })}
        />
        <motion.label
          className={`absolute left-12 pointer-events-none transition-all duration-300 ${
            focused || hasValue
              ? "text-xs text-primary -top-2 bg-gray-900 px-2 rounded"
              : "text-gray-400 top-4"
          }`}
          initial={false}
          animate={{
            y: focused || hasValue ? -24 : 0,
            fontSize: focused || hasValue ? "0.75rem" : "1rem",
            color: focused ? "#7c3aed" : "#9ca3af",
          }}
        >
          {label} {required && "*"}
        </motion.label>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingLabel
          label={t("contact.form.name")}
          value={formData.name}
          onChange={handleChange("name")}
          icon={FaUser}
          required
        />
        <FloatingLabel
          label={t("contact.form.email")}
          value={formData.email}
          onChange={handleChange("email")}
          type="email"
          icon={FaEnvelope}
          required
        />
      </div>
      <FloatingLabel
        label={t("contact.form.subject")}
        value={formData.subject}
        onChange={handleChange("subject")}
        icon={FaPaperPlane}
        required
      />
      <FloatingLabel
        label={t("contact.form.message")}
        value={formData.message}
        onChange={handleChange("message")}
        icon={FaPaperPlane}
        multiline
        required
      />
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-primary to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {" "}
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            <FaPaperPlane />
            {t("contact.form.send")}
          </>
        )}
      </motion.button>
      {/* Status de soumission */}
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-center font-medium ${
            submitStatus === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {" "}
          {submitStatus === "success"
            ? t("contact.form.successMessage")
            : t("contact.form.errorMessage")}
        </motion.div>
      )}
    </motion.form>
  );
};

const ContactCard3D = () => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (e.clientX - centerX) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t("contact.info.email"),
      value: "elhoufiashraf@gmail.com",
      href: "mailto:elhoufiashraf@gmail.com",
    },
    {
      icon: FaPhone,
      label: t("contact.info.phone"),
      value: "+212 6 11 94 50 26",
      href: "tel:+212611945026",
    },
    {
      icon: FaMapMarkerAlt,
      label: t("contact.info.location"),
      value: "Maroc, Marrakech",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/achraf-el-houfi-136b4230b/",
      color: "text-blue-500",
    },
    {
      icon: FaGithub,
      href: "https://github.com/el-houfi-achraf",
      color: "text-gray-300",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/ashraf_elhoufi/",
      color: "text-pink-500",
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transform-gpu"
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.1 }}
      >
        {" "}
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {t("contact.info.title")}
        </h3>
        <div className="space-y-4 mb-8">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300 group"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                <info.icon className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{info.label}</p>
                <p className="text-white font-medium">{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>{" "}
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-gray-400 mb-4">
            {t("contact.social.followMe")}
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 ${social.color}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="text-xl" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedContact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-20 px-6 overflow-hidden">
      {/* Fond avec vagues animées */}
      <WaveBackground />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {" "}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              {t("contact.title")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Formulaire de contact */}
          <div>
            {" "}
            <motion.h3
              className="text-2xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t("contact.form.title")}
            </motion.h3>
            <ContactForm />
          </div>

          {/* Carte de contact 3D */}
          <div>
            <ContactCard3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedContact;
