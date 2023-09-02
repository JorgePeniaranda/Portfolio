import React from "react";
import { useTranslation } from "@/app/i18n";
import { SwitchLenguage } from "@/components/SwitchLenguage/index";
import Image from "next/image";
import Logo from "@/app/favicon.ico";

export const Navbar = ({ lng }: { lng: string }) => {
  return (
    <nav className="w-full flex items-center justify-between text-xl">
      <Image src={Logo} alt="logo" className="w-28 select-none" />
      <SwitchLenguage lng={lng} />
    </nav>
  );
};
