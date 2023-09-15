import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SwitchTheme } from "@/components/SwitchTheme";
import { GoUpButton } from "@/components/GoUpButton";
import "./globals.css";

const Baloo = localFont({ src: "../public/font/Baloo.ttf" });

export const metadata: Metadata = {
  title: "Jorge Peñaranda | Web Developer",
  description: "Jorge Peñaranda | Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <body
        className={
          Baloo.className +
          "  bg-primary text-primery-text px-36 dark:bg-primary-dark dark:text-secondary-dark max-sm:px-0 max-2xl:px-24"
        }
      >
        <Navbar lng={"es"} />
        {children}
        <Footer />
        <div id="fixed">
          <SwitchTheme />
          <GoUpButton />
        </div>
      </body>
    </html>
  );
}
