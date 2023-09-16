import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section className="flex flex-wrap items-center justify-around text-end my-10">
      <article className="w-[45%] flex flex-col items-end max-md:w-[90%] max-md:items-center max-md:text-center">
        <h2 className="text-5xl select-none font-bold underline underline-offset-4">
          Proyectos
        </h2>
        <p className="mt-2 tracking-wider text-lg">
          A lo largo de mi experiencia como programador web, he realizado
          diversos proyectos que reflejan mi habilidad y pasión por el
          desarrollo web. Les invito a explorar mi galería de proyectos para
          conocer más sobre mi trabajo.
        </p>
        <Link
          href="/portfolio"
          target="_blank"
          className="mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-dark text-secondary-dark dark:bg-primary dark:text-secondary hover:brightness-75"
        >
          Conocer Proyectos
        </Link>
      </article>
      <figure className="w-[55%] max-md:w-[90%] max-md:mt-16">
        <Image
          src="/img/screenshotProjects.png"
          className="w-full select-none pointer-events-none"
          width={800}
          height={600}
          alt="Phone"
        />
        <figcaption className="text-center hidden">
          Personal project examples
        </figcaption>
      </figure>
    </section>
  );
}
