import { ReadingTime } from "@/public/svg";
import React from "react";

export default function About() {
  return (
    <section className="w-full grid grid-cols-[55%_45%] items-center justify-center pt-20 pb-14">
      <ReadingTime className="w-3/4" />
      <div className="flex flex-col">
        <h1 className="text-5xl font-bold underline underline-offset-4">
          About me
        </h1>
        <p className="mt-2 tracking-wider text-lg">
          Apasionado por la programación y la creación de herramientas de código
          abierto y soluciones web. Siempre en busca de aprender y crecer en
          este emocionante campo. Disfruto compartiendo mi conocimiento a medida
          que avanzo en mi camino de aprendizaje.
        </p>
        <a
          href="https://jorgepeniaranda.tech/"
          target="_blank"
          className="mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-bg-dark text-primary-text-dark dark:bg-primary-bg dark:text-primary-text hover:brightness-75"
        >
          Conocer Blog
        </a>
      </div>
    </section>
  );
}
