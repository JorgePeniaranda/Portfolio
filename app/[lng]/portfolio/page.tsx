"use client";

import { GoUpButton } from "@/components/GoUpButton";
import { ProjectModal } from "@/components/ProjectModal";
import { SwitchTheme } from "@/components/SwitchTheme";
import { useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";

export const Portafolio = () => {
  const [show, setShow] = useState(false);

  const handleProject = () => {
    setShow(!show);
  };

  return (
    <div className="flex pb-16 flex-wrap">
      <header className="w-full h-40 my-3 bg-black mb-9 px-16 flex justify-between items-center text-white">
        <h1 className="font-bold text-6xl">Proyectos Personales</h1>
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
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
          <article
            className="w-52 h-52 hover:scale-105 cursor-pointer aspect-square"
            onClick={() => handleProject()}
          >
            <img
              src="https://files.merca20.com/uploads/2015/11/logo-4.jpg"
              alt="Lego"
            />
          </article>
        </section>
        <ProjectModal show={show} setShow={setShow} />
      </main>
      <div id="fixed">
        <SwitchTheme initialTheme={false} nameStorage="DarkMode-Portfolio" />
        <GoUpButton />
      </div>
    </div>
  );
};

export default Portafolio;
