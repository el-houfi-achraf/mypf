import { useState, useEffect } from "react";

const usePreferences = () => {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("userPreferences");
    return saved
      ? JSON.parse(saved)
      : {
          reducedMotion: false,
          highContrast: false,
          fontSize: "medium",
          language: navigator.language.split("-")[0],
        };
  });

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    document.documentElement.setAttribute(
      "data-preferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  return [preferences, setPreferences];
};

export default usePreferences;
