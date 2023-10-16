"use client";

import { GoUpButton } from "@/components/GoUpButton";
import { ProjectModal } from "@/components/ProjectModal";
import { SwitchTheme } from "@/components/SwitchTheme";
import Image from "next/image";
import { useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";

export default function Portafolio() {
  const [show, setShow] = useState(false);
  const handleProject = () => {
    setShow(!show);
  };

  return (
    <div className="flex pb-16 flex-wrap">
      <header className="w-full h-40 my-3 bg-black mb-9 px-16 flex justify-between items-center text-white select-none">
        <h1 className="font-bold text-6xl">Proyectos</h1>
        <AiFillFolderOpen className="text-6xl" />
      </header>
      <aside className="flex-1 px-10 py-4 mr-10 border-r-2 border-black text-xl">
        <ul className="flex flex-col gap-2">
          <li>
            - Categoria
            <ul className="ml-5">
              <li>+ Subcategoria</li>
              <li>+ Subcategoria</li>
            </ul>
          </li>
          <li>+ Categoria</li>
          <li>+ Categoria</li>
          <li>+ Categoria</li>
        </ul>
      </aside>
      <main className="flex-[6_1]">
        <section className="flex flex-wrap gap-5">
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <Image
              src="/img/example-project.jpg"
              width={512}
              height={512}
              alt="Example"
            />
          </article>
        </section>
        <ProjectModal show={show} setShow={setShow} project={project} />
      </main>
      <div id="fixed">
        <SwitchTheme initialTheme={false} nameStorage="DarkMode-Portfolio" />
        <GoUpButton />
      </div>
    </div>
  );
}

const project = {
  images: [
    "https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1016474677.1696809600&semt=sph",
    "https://img.freepik.com/premium-photo/tranquil-scene-majestic-mountain-range-winter-wilderness-adventure-generated-by-artificial-intelligence_24911-92472.jpg",
    "https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1016474677.1696809600&semt=sph",
    "https://img.freepik.com/premium-photo/tranquil-scene-majestic-mountain-range-winter-wilderness-adventure-generated-by-artificial-intelligence_24911-92472.jpg",
    "https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1016474677.1696809600&semt=sph",
  ],
  title: "Hiper-Espacio",
  description:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  links: {
    live: "a",
    github: "a",
  },
};
