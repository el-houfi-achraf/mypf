import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EnhancedLoadingScreen from "./components/EnhancedLoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Notification from "./components/Notification";
import "./App.css";
import EnhancedNavbar from "./components/EnhancedNavbar";
import ParallaxHero from "./components/ParallaxHero";
import AboutMe from "./components/AboutMe";
import Projects3D from "./components/Projects3D";
import InteractiveSkillsTimeline from "./components/InteractiveSkillsTimeline";
import AnimatedContact from "./components/AnimatedContact";
import Footer from "./components/Footer";
import EnhancedCursor from "./components/EnhancedCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type }), 3000);
  };
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading && <EnhancedLoadingScreen />}
        </motion.div>

        <ScrollProgress />

        <Notification
          isVisible={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() =>
            setNotification({ show: false, message: "", type: "success" })
          }
        />

        {!isLoading && (
          <div className="bg-black text-white transition-colors duration-300">
            <EnhancedNavbar />
            <EnhancedCursor />

            <main>
              <ParallaxHero />
              <AboutMe />
              <InteractiveSkillsTimeline />
              <Projects3D />
              <AnimatedContact showNotification={showNotification} />
            </main>
            <Footer />
          </div>
        )}
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
