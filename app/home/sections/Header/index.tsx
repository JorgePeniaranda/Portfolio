import React from "react";
import styles from "./style.module.css";
import { Rocket } from "@/public/svg";

export default function Header() {
  return (
    <header className="w-full h-[calc(100vh_-_9rem)] grid grid-cols-[70%,30%] select-none">
      {/* h-[calc(100%_-_7.5rem)]: 100% - nav size */}
      <div className="flex flex-col justify-evenly">
        <h1 className="text-7xl font-bold">
          Navegando hacia un futuro de{" "}
          <span className={"text-7xl font-bold " + styles.specialWord}>
            innovación
          </span>
        </h1>
        <p className="text-zinc-400  font-semibold text-xl select-text">
          Jorge Peñaranda / Web Developer
        </p>
      </div>
      <div className="flex items-center justify-center pb-32">
        <Rocket
          className="w-full fill-red-950"
          className_DynamicBG={styles.specialSVG}
        />
      </div>
    </header>
  );
}
