"use client";
import Link from "next/link";
import { languages } from "@/app/i18n/settings";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import styles from "./style.module.css";

export const SwitchLenguage = ({ lng }: { lng: string }) => {
  const path = usePathname();
  var pathWithoutLng = path.split(`/${lng}`);

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        {lng}
        <FiChevronDown />
      </button>
      <div className={styles.dropdown_content}>
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
