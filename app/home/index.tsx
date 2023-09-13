import React from "react";
import { Navbar } from "@/components/Navbar";
import { Header } from "./sections";

export const HomePage = () => {
  return (
    <main className="w-screen bg-primary-bg text-primery-text px-36 dark:bg-primary-bg-dark dark:text-primary-text-dark">
      <Navbar lng={"en"} />
      <Header />
      <Header />
    </main>
  );
};
