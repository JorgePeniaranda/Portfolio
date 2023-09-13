import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
import { SwitchTheme } from "@/components/SwitchTheme";
// import { GoUpButton } from "@/components/GoUpButton";
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
          "  bg-primary-bg text-primery-text px-36 dark:bg-primary-bg-dark dark:text-primary-text-dark"
        }
      >
        <Navbar lng={"es"} />
        {children}
        {/* <Footer /> */}
        <div id="fixed">
          <SwitchTheme />
          {/* <GoUpButton /> */}
        </div>
      </body>
    </html>
  );
}
