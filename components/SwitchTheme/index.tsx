"use client";

import React, { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import styles from "./style.module.css";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const [darkMode, setDarkMode] = useState(true);

  const handleClick = () => {
    if (!!darkMode) document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
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
