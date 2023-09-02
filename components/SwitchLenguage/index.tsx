"use client";
import React from "react";
import { languages } from "@/app/i18n/settings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import "./style.css";

export const SwitchLenguage = ({ lng }: { lng: string }) => {
  const path = usePathname();
  var pathWithoutLng = path.split(`/${lng}`);

  return (
    <div className="dropdown">
      <button className="dropbtn">
        {lng}
        <FiChevronDown />
      </button>

      <div className="dropdown-content">
        {languages
          .filter((l) => lng !== l)
          .map((l: string) => {
            return (
              <Link
                key={l}
                href={`/${l}/${
                  pathWithoutLng.length > 1 ? pathWithoutLng[1] : ""
                }`}
              >
                {l}
              </Link>
            );
          })}
      </div>
    </div>
  );
};
