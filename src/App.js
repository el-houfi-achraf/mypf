import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import Notification from "./components/Notification";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ErrorBoundary from "./components/ErrorBoundary";

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
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading && <LoadingScreen />}
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
        <div className="bg-black text-white">
          <Navbar />
          <CustomCursor />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact showNotification={showNotification} />
          </main>
          <Footer />
        </div>
      )}
    </ErrorBoundary>
  );
}

export default App;
