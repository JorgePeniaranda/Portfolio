import styles from "./style.module.css";
import { Rocket } from "@/public/svg";

export default function Header() {
  return (
    <header className="w-full min-h-[calc(100vh_-_9rem)] flex flex-wrap justify-around select-none max-sm:gap-16">
      {/* h-[calc(100%_-_7.5rem)]: 100% - nav size */}
      <div className="flex flex-col justify-evenly w-[70%] max-sm:w-[90%] max-sm:text-center">
        <h1 className="text-7xl font-bold max-sm:text-5xl">
          Navegando hacia un futuro de{" "}
          <strong
            className={
              "text-7xl font-bold  max-sm:text-5xl " + styles.specialWord
            }
          >
            innovación
          </strong>
        </h1>
        <span className="text-zinc-400  font-semibold text-xl select-text">
          Jorge Peñaranda / Desarrollador Web
        </span>
      </div>
      <figure className="flex items-center justify-center pb-32 w-[30%] max-sm:w-[90%]">
        <Rocket
          className="w-full h-full fill-red-950"
          className_DynamicBG={styles.specialSVG}
        />
        <figcaption className="text-center hidden">
          Spacecraft in space
        </figcaption>
      </figure>
    </header>
  );
}
