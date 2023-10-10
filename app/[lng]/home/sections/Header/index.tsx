import { useTranslation } from "@/app/i18n";
import styles from "./style.module.css";
import { Rocket } from "@/public/svg";

export default async function Header({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);

  return (
    <header className="w-full min-h-[calc(100vh_-_9rem)] flex flex-wrap justify-around select-none gap-16 sm:gap-0">
      {/* h-[calc(100%_-_7.5rem)]: 100% - nav size */}
      <div className="flex flex-col justify-evenly text-center md:text-start w-[90%] md:w-[70%]">
        <h1 className="font-bold text-5xl sm:text-7xl">
          {t("header-title")}{" "}
          <strong
            className={"font-bold text-5xl sm:text-7xl " + styles.specialWord}
          >
            {t("header-title-special")}
          </strong>
        </h1>
        <span className="text-zinc-400  font-semibold text-xl select-text">
          Jorge Peñaranda / {t("category")}
        </span>
      </div>
      <figure className="flex items-center justify-center pb-32 w-[90%] sm:w-[30%]">
        <Rocket
          className="w-full h-full fill-red-950"
          className_DynamicBG={styles.specialSVG}
        />
        <figcaption className="text-center hidden">
          {t("header-figure")}
        </figcaption>
      </figure>
    </header>
  );
}