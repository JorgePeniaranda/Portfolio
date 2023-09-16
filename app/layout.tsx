import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SwitchTheme } from "@/components/SwitchTheme";
import { GoUpButton } from "@/components/GoUpButton";
import "./globals.css";

const Baloo = localFont({ src: "../public/font/Baloo.ttf" });

export const metadata: Metadata = {
  title: "Jorge Peñaranda | Desarrollador Web",
  description:
    "Soy un apasionado desarrollador web con experiencia en diseño y desarrollo front-end y back-end. Mis habilidades incluyen HTML, CSS, JavaScript, React, Node.js y más. Explora mi portafolio para ver ejemplos de soluciones web responsivos y herramientas de código abierto que he creado. ¡Contáctame para llevar tu proyecto web al siguiente nivel!",
  alternates: {
    canonical: "https://jorgepeniaranda.me",
    /* languages: {
      es: "https://jorgepeniaranda.me/es",
      en: "https://jorgepeniaranda.me/en",
      pt: "https://jorgepeniaranda.me/pt",
    }, */
  },
  authors: {
    name: "Jorge Peñaranda",
    url: "https://linktr.ee/jorgepeniaranda",
  },
  category: "Desarrollo Web",
  classification: "Desarrollo Web",
  colorScheme: "dark",
  creator: "Jorge Peñaranda",
  generator: "Next.js",
  icons: "img/Logo-512x512.png",
  keywords: [
    "Jorge",
    "Peñaranda",
    "Desarrollo Web",
    "Desarrollador Web",
    "Programador",
    "Soluciones web",
    "Herramientas",
    "Código abierto",
  ],
  manifest: "/manifest.json",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    url: "https://jorgepeniaranda.me",
    title: "Jorge Peñaranda | Desarrollador Web",
    description:
      "Soy un apasionado desarrollador web con experiencia en diseño y desarrollo front-end y back-end. Mis habilidades incluyen HTML, CSS, JavaScript, React, Node.js y más. Explora mi portafolio para ver ejemplos de soluciones web responsivos y herramientas de código abierto que he creado. ¡Contáctame para llevar tu proyecto web al siguiente nivel!",
    siteName: "Jorge Peñaranda | Desarrollador Web",
    images: [
      {
        url: "img/Logo-512x512.png",
      },
    ],
  },
  publisher: "Vercel",
  referrer: "no-referrer-when-downgrade",
  robots: { index: true, follow: true },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  twitter: {
    title: "Jorge Peñaranda | Desarrollador Web",
    description:
      "Soy un apasionado desarrollador web con experiencia en diseño y desarrollo front-end y back-end. Mis habilidades incluyen HTML, CSS, JavaScript, React, Node.js y más. Explora mi portafolio para ver ejemplos de soluciones web responsivos y herramientas de código abierto que he creado. ¡Contáctame para llevar tu proyecto web al siguiente nivel!",
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    images: "img/Logo-512x512.png",
  },
  viewport: { width: "device-width", initialScale: 1 },
  /* verification, */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      {/* Change when implementing i18n */}
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
