"use client";

import React, { useEffect, useState } from "react";
import { ImArrowUp2 } from "react-icons/im";
import styles from "./style.module.css";

export const GoUpButton = () => {
  const [showGoUpBnt, setShowGoUpBnt] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Scroll to top on page load

    window.addEventListener("scroll", () => handleScroll());
  }, []);

  const handleScroll = () => {
    if (!!scrollY) setShowGoUpBnt(true);
    else setShowGoUpBnt(false);
    console.log("%cscroll event", "color: red;");
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <ImArrowUp2
      onClick={() => handleClick()}
      className={
        "fixed bottom-7 right-7 bg-primary-bg-dark text-primary-text-dark dark:bg-white dark:text-primary-text w-11 h-11 p-3 text-2xl rounded-full cursor-pointer " +
        (showGoUpBnt ? "opacity-1" : "opacity-0") +
        " " +
        styles.mainimage
      }
    />
  );
};