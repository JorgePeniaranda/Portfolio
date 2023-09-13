import React from "react";
import { Navbar } from "@/app/components/Navbar";
import styles from "./style.module.css";
import Image from "next/image";
import Space from "@/public/svg/space";

export const HomePage = () => {
  return (
    <main className="w-screen bg-primary-bg text-primery-text px-36 dark:bg-primary-bg-dark dark:text-primary-text-dark">
      <Navbar lng={"en"} />
      {/* ------------------------------ Header Section ------------------------------ */}
      <header className="w-full h-[calc(100vh_-_9rem)] grid grid-cols-[70%,30%] select-none">
        {/* h-[calc(100%_-_7.5rem)]: 100% - nav size */}
        <div className="flex flex-col justify-evenly">
          <h1 className="text-7xl font-bold">
            Navegando hacia un futuro de{" "}
            <span className={"text-7xl font-bold " + styles.specialWord}>
              innovación
            </span>
          </h1>
          <p className="text-neutral-400 font-semibold text-xl">
            Jorge Peñaranda / Web Developer
          </p>
        </div>
        <div className="flex items-center justify-center pb-32">
          <Space
            className="w-full fill-red-950"
            className_DynamicBG={styles.specialSVG}
          />
        </div>
      </header>
      {/* ------------------------------ About Section ------------------------------ */}
      <section>
        <h1>About</h1>
      </section>
      {/* ------------------------------ Skills Section ------------------------------ */}
      <section>
        <h1>Skills & Techs</h1>
      </section>
      {/* ------------------------------ Projects Section ------------------------------ */}
      <section>
        <h1>Projects</h1>
      </section>
    </main>
  );
};
