import React from "react";
import { SwitchLenguage } from "../SwitchLenguage/index";
import { Logo } from "@/public/svg";

export const Navbar = ({ lng }: { lng: string }) => {
  return (
    <nav className={"w-full flex items-center justify-between text-xl h-36"}>
      <Logo className="h-32 flex select-none pointer-events-none fill-[#1a1a1a] dark:fill-[#e5e5e5]" />
      <div className="flex items-center justify-center">
        <SwitchLenguage lng={lng} />
      </div>
    </nav>
  );
};