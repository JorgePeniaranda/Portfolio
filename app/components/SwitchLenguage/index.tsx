"use client";
import React from "react";
// import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import styles from "./style.module.css";

export const SwitchLenguage = ({ lng }: { lng: string }) => {
  const lngList = ["ES", "EN", "BR"];
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        {lng}
        <FiChevronDown />
      </button>
      <div className={styles.dropdown_content}>
        <a href="https://www.google.com/">es</a>
        <a href="https://www.google.com/">br</a>
      </div>
    </div>
  );
};
