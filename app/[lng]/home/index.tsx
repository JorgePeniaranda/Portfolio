import { Header, About, Skills, Projects, Contact } from "./sections";

export const HomePage = ({ lng }: { lng: string }) => {
  return (
    <main className="w-full">
      <Header lng={lng} />
      <About lng={lng} />
      <Skills /* lng={lng} */ />
      <Projects lng={lng} />
      <Contact lng={lng} />
    </main>
  );
};
