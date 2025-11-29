// ThemeController.jsx (or just define it inside App.js for simplicity)
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const ThemeController = () => {
  const { isDarkMode } = useContext(AuthContext);

  useEffect(() => {
    // This effect will now correctly re-run whenever isDarkMode changes
    if (isDarkMode) {
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-light');
      console.log("Dark mode enabled:", document.body.classList);
    } else {
      document.body.classList.add('bg-light');
      document.body.classList.remove('bg-dark');
      console.log("Light mode enabled:", document.body.classList);
    }
    document.body.style.margin = '0';
  }, [isDarkMode]);

  // This component doesn't need to render anything visual
  return null;
};

export default ThemeController;