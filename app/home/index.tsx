import React from "react";
import { Header } from "./sections/Header";
import { Navbar } from "@/app/components/Navbar";
import "./style.css";

export const HomePage = () => {
  return (
    <main className="w-screen h-screen home-primary-bg px-40">
      <Header>
        <Navbar lng={"en"} />
        <div className="flex">
          <h1 className="w-2/5 text-5xl">
            Navegando hacia un{" "}
            <span className="Home__Header-animatedColor text-5xl">futuro</span>{" "}
            de innovación
          </h1>
          <p>Jorge Peñaranda / Web Developer</p>
        </div>
      </Header>
    </main>
  );
};
