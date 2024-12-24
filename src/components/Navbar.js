import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes, FaChevronRight } from "react-icons/fa";
import { SiCodersrank } from "react-icons/si";

const NavItem = ({ href, label, isActive, index }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <motion.a
      href={href}
      className="relative px-4 py-2 group flex items-center gap-2 rounded-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-full"
          layoutId="nav-pill"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      <span
        className={`relative text-sm font-medium ${
          isActive ? "text-primary" : "text-gray-300"
        } transition-colors group-hover:text-primary`}
      >
        {label}
      </span>
      <motion.span
        className={`text-xs ${
          isActive ? "text-primary" : "text-gray-500"
        } opacity-0 group-hover:opacity-100`}
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <FaChevronRight />
      </motion.span>
    </motion.a>
  </motion.div>
);

const MobileMenu = ({ isOpen, onClose, navItems, activeSection }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-bl from-black via-black/95 to-black/90 backdrop-blur-lg border-l border-white/10"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <motion.span
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Navigation
              </motion.span>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-gray-400" />
              </motion.button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    activeSection === item.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-white/5"
                  } transition-colors`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                >
                  <span className="text-lg">{item.label}</span>
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <FaChevronRight className="text-primary" />
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-black/80 backdrop-blur-lg shadow-lg"
            : "py-3 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo - Version mise à jour */}
            <motion.a
              href="#hero"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold flex items-center gap-2">
                {/* Choisissez l'une de ces options de logo : */}

                {/* Option 1: Logo moderne avec animation */}
                <motion.div
                  className="relative w-8 h-8 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                >
                  <SiCodersrank className="text-2xl text-primary absolute" />
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-lg"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Option 2: Logo avec effet de gradient */}
                {/* <div className="relative w-8 h-8 bg-gradient-to-r from-primary to-violet-500 rounded-lg flex items-center justify-center">
                  <RiCodeBoxLine className="text-xl text-white" />
                </div> */}

                {/* Option 3: Logo avec effet 3D */}
                {/* <div className="relative w-8 h-8 bg-primary rounded-lg transform rotate-45 flex items-center justify-center shadow-lg">
                  <FaLaptopCode className="text-xl text-white transform -rotate-45" />
                </div> */}

                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-500">
                  ASHRAF EL HOUFI
                </span>
              </span>
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={activeSection === item.href.slice(1)}
                  index={index}
                />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="p-2 rounded-lg bg-white/5 backdrop-blur-sm md:hidden relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <div className="space-y-1.5">
                <motion.span
                  className="block w-6 h-0.5 bg-gradient-to-r from-primary to-violet-500"
                  animate={{ width: "24px" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-4 h-0.5 bg-gradient-to-r from-primary to-violet-500"
                  animate={{ width: "16px" }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-gradient-to-r from-primary to-violet-500"
                  animate={{ width: "24px" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </div>
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>

        {/* Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
