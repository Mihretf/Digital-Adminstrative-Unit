// src/context/LanguageContext.js
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    selectLanguage: "Select Language",
    english: "English",
    amharic: "Amharic",
    welcome: "Welcome",
    newUser: "New User",
    existingUser: "Existing User",
    getStarted: "Get Started",
    signIn: "Sign In",
  },
  am: {
    selectLanguage: "ቋንቋ ይምረጡ",
    english: "እንግሊዝኛ",
    amharic: "አማርኛ",
    welcome: "እንኳን ደህና መጡ",
    newUser: "አዲስ ተጠቃሚ",
    existingUser: "አሁን ያለዎት ተጠቃሚ",
    getStarted: "መጀመር",
    signIn: "ግባ",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
