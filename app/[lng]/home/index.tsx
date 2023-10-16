import { SwitchTheme } from "@/components/SwitchTheme";
import { Header, About, Skills, Projects, Contact } from "./sections";
import { GoUpButton } from "@/components/GoUpButton";

export const HomePage = ({ lng }: { lng: string }) => {
  return (
    <main className="w-full">
      <Header lng={lng} />
      <About lng={lng} />
      <Skills lng={lng} />
      <Projects lng={lng} />
      <Contact lng={lng} />
      <div id="fixed">
        <SwitchTheme initialTheme={true} nameStorage="DarkMode-Home" />
        <GoUpButton />
      </div>
    </main>
  );
};
