import type { Props as SEOProps } from 'astro-seo'

type URLFormat = `${'http' | 'https'}://${string}`

export const ORIGINAL_URL: URLFormat = 'http://jorgepeniaranda.dev.ar'
export const SITE_NAME = 'Jorge Peñaranda'
export const DEFAULT_SITE_TITLE = `${SITE_NAME} | Desarrollador Web`
export const SITE_DESCRIPTION =
  'Desarrollador Web Front End con experiencia en JavaScript, CSS, React y Next.js. Descubre mis proyectos y soluciones web de código abierto.'
export const SITE_BANNER = `${ORIGINAL_URL}/public/banner.png`
export const SITE_LANGUAGE = 'es'

export const SEO_INFO: SEOProps = {
  canonical: ORIGINAL_URL,
  titleDefault: DEFAULT_SITE_TITLE,
  titleTemplate: `%s | ${SITE_NAME}`,
  charset: 'UTF-8',
  description: SITE_DESCRIPTION,
  languageAlternates: [{ hrefLang: 'es', href: `${ORIGINAL_URL}/es` }],
  openGraph: {
    basic: {
      title: SITE_NAME,
      url: ORIGINAL_URL,
      type: 'website',
      image: SITE_BANNER
    },
    image: {
      url: SITE_BANNER,
      alt: SITE_NAME
    },
    optional: {
      locale: 'es-AR',
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME
    }
    // article: {
    //   publishedTime: "2022-01-01T00:00:00Z",
    //   modifiedTime: "2022-01-01T00:00:00Z",
    //   expirationTime: "2023-01-01T00:00:00Z",
    //   section: SITE_NAME,
    //   tags: ["Astro", "SEO"],
    //   authors: ["Jorge Peñaranda"],
    // },
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    image: SITE_BANNER,
    imageAlt: SITE_NAME,
    site: 'https://twitter.com/PeniarandaJorge',
    creator: '@jorgepeniaranda'
  },
  nofollow: false,
  noindex: false
} as const
