import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import he from "./locales/he/translation.json";
// import LanguageDetector  from "i18next-browser-languagedetector";

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
    },
    lng: "he", // Default language
    fallbackLng: "he",
    interpolation: { escapeValue: false },
    detection: {
      order: ["path", "navigator"],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;
