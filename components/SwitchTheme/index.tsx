"use client";

import { useTheme } from "@/hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import styles from "./style.module.css";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { darkMode, setDarkMode } = useTheme(true);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={() => handleClick()}
      aria-label="Switch theme"
      className={
        "bg-blue-600 dark:bg-amber-400 transition " +
        className +
        " " +
        styles.SwitchDarkmode
      }
    >
      {darkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};
