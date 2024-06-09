import type {Props as SEOProps} from "astro-seo";
import { DEFAULT_LANG } from "./common";
import { ENV } from "./env";

export const ORIGINAL_URL = ENV.base_url;

export const SITE_INFO = {
  name: "Jorge Peñaranda",
  defaultTitle: `Jorge Peñaranda | Desarrollador Web`,
  description: "Desarrollador Web Front End con experiencia en JavaScript, CSS, React y Next.js. Descubre mis proyectos y soluciones web de código abierto.",
  language: DEFAULT_LANG,
  url: ORIGINAL_URL,
  icon_folder: `${ORIGINAL_URL}/icons`,
  banner: `${ORIGINAL_URL}/assets/images/banner.png`,
  color: "#bf5454",
}

export const SEO_INFO: SEOProps = {
  canonical: ORIGINAL_URL,
  titleDefault: SITE_INFO.defaultTitle,
  titleTemplate: `%s | ${SITE_INFO.name}`,
  charset: "UTF-8",
  description: SITE_INFO.description,
  languageAlternates: [{hrefLang: "es", href: `${ORIGINAL_URL}/es`}],
  openGraph: {
    basic: {
      title: SITE_INFO.name,
      url: ORIGINAL_URL,
      type: "website",
      image: SITE_INFO.banner,
    },
    image: {
      url: SITE_INFO.banner,
      alt: SITE_INFO.name,
    },
    optional: {
      locale: "es-AR",
      description: SITE_INFO.description,
      siteName: SITE_INFO.name,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    image: SITE_INFO.banner,
    imageAlt: SITE_INFO.name,
    site: "https://twitter.com/PeniarandaJorge",
    creator: "@jorgepeniaranda",
  },
  extend: {
    link: [
      {
        rel: "manifest",
        href: `${ORIGINAL_URL}/manifest.json`,
      },
      // PNG Icons
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/16x16.png`,
        sizes: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/32x32.png`,
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/64x64.png`,
        sizes: "64x64",
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/128x128.png`,
        sizes: "128x128",
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/256x256.png`,
        sizes: "256x256",
      },
      {
        rel: "icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/512x512.png`,
        sizes: "512x512",
      },
      // Favicon
      {
        rel: "icon",
        type: "image/x-icon",
        href: `${SITE_INFO.icon_folder}/favicon.ico`,
      },
      // SVG Icons
      {
        rel: "icon",
        type: "image/svg+xml",
        href: `${SITE_INFO.icon_folder}/favicon.svg`,
      },
      // Apple Icons
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: `${SITE_INFO.icon_folder}/180x180.png`,
      },
      // Android Icon
      {
        rel: "shortcut icon",
        type: "image/png",
        href: `${SITE_INFO.icon_folder}/196x196.png`,
        sizes: "196x196",
      },
    ],
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "author",
        content: "Jorge Peñaranda",
      },
      {
        name: "keywords",
        content: "Desarrollador Web, Front End, JavaScript, CSS, React, Next.js",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "theme-color",
        content: SITE_INFO.color,
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "msapplication-TileColor",
        content: SITE_INFO.color,
      },
      {
        name: "msapplication-TileImage",
        content: `${SITE_INFO.icon_folder}/144x144.png`,
      },
      {
        name: "msapplication-config",
        content: `${ORIGINAL_URL}/browserconfig.xml`,
      },
      {
        name: "application-name",
        content: SITE_INFO.name,
      },
      {
        name: "apple-mobile-web-app-title",
        content: SITE_INFO.name,
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "msapplication-starturl",
        content: ORIGINAL_URL,
      },
      {
        name: "msapplication-navbutton-color",
        content: SITE_INFO.color,
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
      },
      {
        name: "color-scheme",
        content: "dark light",
      },
    ]
  },
  nofollow: false,
  noindex: false,
} as const;
