"use client";
import React from "react";
// import { languages } from "@/app/i18n/settings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import "./style.css";

export const SwitchLenguage = ({ lng }: { lng: string }) => {
  const lngList = ["ES", "EN", "BR"];
  return (
    <div className="dropdown">
      <button className="dropbtn">
        {lng}
        <FiChevronDown />
      </button>

      <div className="dropdown-content">
        <a href="https://www.google.com/">es</a>
        <a href="https://www.google.com/">br</a>
      </div>
    </div>
  );
};
