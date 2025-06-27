import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("fr");

  // Charger la langue depuis localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language");
    if (savedLanguage && ["fr", "en", "ar"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Sauvegarder la langue dans localStorage et mettre à jour la direction du document
  useEffect(() => {
    localStorage.setItem("portfolio-language", currentLanguage);

    // Mettre à jour la direction du document pour l'arabe
    if (currentLanguage === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    if (["fr", "en", "ar"].includes(language)) {
      setCurrentLanguage(language);
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isRTL: currentLanguage === "ar",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
