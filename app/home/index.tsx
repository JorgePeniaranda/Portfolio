import React from "react";
import { Header, About, Skills, Projects } from "./sections";

export const HomePage = () => {
  return (
    <main className="w-full">
      <Header />
      <About />
      <Skills />
      <Projects />
    </main>
  );
};
