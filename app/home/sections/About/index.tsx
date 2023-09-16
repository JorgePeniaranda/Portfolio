import React from "react";
import Link from "next/link";
import { ReadingTime } from "@/public/svg";

export default function About() {
  return (
    <section className="w-full flex flex-wrap-reverse items-center justify-center pt-20 pb-48">
      <figure className="w-[55%] max-sm:w-[90%] max-md:mt-16">
        <ReadingTime className="w-3/4 max-sm:w-full max-md:mt-16" />
        <figcaption className="text-center hidden">
          Someone reading on a comfy chair.
        </figcaption>
      </figure>
      <article className="flex flex-col max-md:items-center max-md:text-center w-[45%] max-sm:w-[90%]">
        <h2 className="text-5xl select-none font-bold underline underline-offset-4">
          Sobre mi
        </h2>
        <p className="mt-2 tracking-wider text-lg">
          Apasionado por la programación y la creación de herramientas de código
          abierto y soluciones web. Siempre en busca de aprender y crecer en
          este emocionante campo. Disfruto compartiendo mi conocimiento a medida
          que avanzo en mi camino de aprendizaje.
        </p>
        <Link
          href="https://jorgepeniaranda.tech/"
          target="_blank"
          className="mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-dark text-secondary-dark dark:bg-primary dark:text-secondary hover:brightness-75"
        >
          Conocer Blog
        </Link>
      </article>
    </section>
  );
}
