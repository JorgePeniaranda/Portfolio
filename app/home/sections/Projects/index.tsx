import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="flex flex-wrap items-center justify-around text-end my-10">
      <div className="w-1/2 flex flex-col items-end">
        <h2 className="text-5xl select-none font-bold underline underline-offset-4">
          Proyectos
        </h2>
        <p className="mt-2 tracking-wider text-lg">
          A lo largo de mi experiencia, he realizado diversos proyectos que
          reflejan mi desempeño como programador. Los invito a visitar mi
          galería de proyectos para conocer más sobre mi trabajo y enfoque en el
          desarrollo web.
        </p>
        <Link
          href="/portfolio"
          target="_blank"
          className="mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-dark text-secondary-dark dark:bg-primary dark:text-secondary hover:brightness-75"
        >
          Conocer Proyectos
        </Link>
      </div>
      <Image
        src="/img/screenshotProjects.png"
        className="w-1/2 select-none pointer-events-none"
        width={800}
        height={600}
        alt="Phone"
      />
    </section>
  );
}
