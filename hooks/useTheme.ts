import { useState, useEffect } from "react";

export const useTheme = (initialValue: boolean) => {
  const [darkMode, setDarkMode] = useState(initialValue);

  const ChangeTheme = (newValue: boolean) => {
    setDarkMode(newValue);
    localStorage.setItem("DarkMode", newValue.toString());
  };

  useEffect(() => {
    if (!localStorage.getItem("DarkMode"))
      localStorage.setItem("DarkMode", initialValue.toString());
    else
      setDarkMode(localStorage.getItem("DarkMode") === "true" ? true : false);
  }, []);

  useEffect(() => {
    if (!darkMode) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }, [darkMode]);

  return { darkMode, setDarkMode: ChangeTheme };
};
