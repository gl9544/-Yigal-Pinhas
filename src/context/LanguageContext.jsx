import React, { createContext, useContext, useState } from "react";

// Define the shape of the context

// Create Context
const LanguageContext = createContext(null);

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [isHebrew, setIsHebrew] = useState(true);

  return (
    <LanguageContext.Provider value={{ isHebrew, setIsHebrew }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook for using the context (Optional, but recommended)
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguageContext must be used within a MyProvider");
  }
  return context;
};
