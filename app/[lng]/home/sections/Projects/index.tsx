import { serverSideTranslation } from "@/app/i18n";
import Image from "next/image";
import Phone from "@/public/img/screenshotProjects.png";
import Link from "next/link";

export default async function Projects({ lng }: { lng: string }) {
  const { t } = await serverSideTranslation(lng);

  return (
    <section className="flex flex-wrap items-center justify-around text-end my-10">
      <article className="flex flex-col items-center text-center w-[90%] md:w-[45%] md:items-end md:text-end">
        <h2 className="text-5xl select-none font-bold underline underline-offset-4">
          {t("projects-title")}
        </h2>
        <p className="mt-2 tracking-wider text-lg">{t("projects-text")}</p>
        <Link
          href="/portfolio"
          className="mt-5 w-fit p-2 px-6 select-none text-center font-semibold rounded-md bg-primary-dark text-secondary-dark dark:bg-primary dark:text-secondary hover:brightness-75"
        >
          {t("projects-button")}
        </Link>
      </article>
      <figure className="mt-16 w-[90%] md:mt-0 md:w-[55%]">
        <Image
          src={Phone}
          className="w-full select-none pointer-events-none"
          width={800}
          height={600}
          alt="Phone"
        />
        <figcaption className="text-center hidden">
          {t("projects-figure")}
        </figcaption>
      </figure>
    </section>
  );
}
