import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ko from "./locales/ko.json";
import ja from "./locales/ja.json";
import hi from "./locales/hi.json";
import vi from "./locales/vi.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";

const savedLanguage = localStorage.getItem("preferredLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    ko: { translation: ko },
    ja: { translation: ja },
    hi: { translation: hi },
    vi: { translation: vi },
    es: { translation: es },
    ar: { translation: ar },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
