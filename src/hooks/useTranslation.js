import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to French if translation not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key if no translation found
          }
        }
        break;
      }
    }

    return value || key;
  };

  return { t, currentLanguage };
};
