import type { Metadata } from "next";
import localFont from "next/font/local";
import { SwitchTheme } from "./components/SwitchTheme";
import "./globals.css";

const Baloo = localFont({ src: "./Baloo.ttf" });

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
      <body className={Baloo.className}>
        {children}
        <div id="fixed">
          <SwitchTheme />
        </div>
      </body>
    </html>
  );
}
