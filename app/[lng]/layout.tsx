import type { Metadata } from "next";
import { languages } from "@/app/i18n/settings";
import localFont from "next/font/local";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const Baloo = localFont({ src: "../../public/font/Baloo.ttf" });

export const metadata: Metadata = {
  title: "Jorge Peñaranda | Desarrollador Web",
  description:
    "Soy Jorge Peñaranda, un apasionado desarrollador web con experiencia en desarrollo web. Mis habilidades incluyen React, Next.js, CSS, JavaScript, y más. ¡Visita mi portafolio para ver ejemplos de soluciones web responsivas y herramientas de código abierto que he creado!",
  alternates: {
    canonical: "https://jorgepeniaranda.me/",
    languages: {
      es: "https://jorgepeniaranda.me/es",
      en: "https://jorgepeniaranda.me/en",
      pt: "https://jorgepeniaranda.me/pt",
    },
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
  icons: "/img/favicon.ico",
  keywords: [
    "Jorge Peñaranda",
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
      "Soy un apasionado desarrollador web con experiencia en desarrollo web. Mis habilidades incluyen React, Next.js, CSS, JavaScript, y más. ¡Visita mi portafolio para ver ejemplos de soluciones web responsivas y herramientas de código abierto que he creado!",
    siteName: "Jorge Peñaranda | Desarrollador Web",
    images: [
      {
        url: "/img/favicon.ico",
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
      "Soy un apasionado desarrollador web con experiencia en desarrollo web. Mis habilidades incluyen React, Next.js, CSS, JavaScript, y más. ¡Visita mi portafolio para ver ejemplos de soluciones web responsivas y herramientas de código abierto que he creado!",
    card: "summary_large_image",
    site: "@peniarandajorge",
    creator: "@peniarandajorge",
    images: "/img/favicon.ico",
  },
  viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} className="dark">
      {/* Change when implementing i18n */}
      <body
        className={
          Baloo.className +
          "  bg-primary text-secondary dark:bg-primary-dark dark:text-secondary-dark px-0 sm:px-24  2xl:px-36"
        }
      >
        <Navbar lng={lng} />
        {children}
        <Footer />
      </body>
    </html>
  );
}