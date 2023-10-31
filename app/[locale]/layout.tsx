import type { Metadata } from 'next'
import { Baloo_2 as baloo } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'
import { notFound } from 'next/navigation'
import { createTranslator } from 'next-intl'
import { lenguagesSupported } from '@/consts'
import { ReactNode, Suspense } from 'react'
import Loading from './loading'
import { SwitchTheme } from '@/components/SwitchTheme'
import { GoUpButton } from '@/components/GoUpButton'

const Baloo = baloo({ preload: true, subsets: ['latin'] })

export async function generateMetadata ({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = (await import(`../../messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages, namespace: 'Metadata' })

  return {
    title: `Jorge Peñaranda | ${t('category')}`,
    description: t('page-description'),
    alternates: {
      canonical: 'https://jorgepeniaranda.me/',
      languages: {
        es: 'https://jorgepeniaranda.me/',
        en: 'https://jorgepeniaranda.me/en',
        pt: 'https://jorgepeniaranda.me/pt'
      }
    },
    authors: {
      name: 'Jorge Peñaranda',
      url: 'https://linktr.ee/jorgepeniaranda'
    },
    category: t('category'),
    classification: t('category'),
    colorScheme: 'dark',
    creator: 'Jorge Peñaranda',
    generator: 'Next.js',
    icons: '/img/favicon.ico',
    keywords: [
      'Jorge Peñaranda',
      t('page-keywords.web-developement'),
      t('page-keywords.web-developer'),
      t('page-keywords.programmer'),
      t('page-keywords.web-solutions'),
      t('page-keywords.tools'),
      t('page-keywords.open-source'),
      'Front End',
      'JavaScript',
      'TypeScript',
      'CSS',
      'React',
      'Next.js',
      'Tailwind',
      'SASS'
    ],
    manifest: '/manifest.json',
    formatDetection: { telephone: false },
    openGraph: {
      type: 'website',
      url: 'https://jorgepeniaranda.me',
      title: `Jorge Peñaranda | ${t('category')}`,
      description: t('page-description'),
      images: [
        {
          url: '/img/favicon.ico'
        }
      ]
    },
    publisher: 'Vercel',
    referrer: 'no-referrer-when-downgrade',
    robots: { index: true, follow: true },
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
      { media: '(prefers-color-scheme: light)', color: '#ffffff' }
    ],
    metadataBase: new URL('https://jorgepeniaranda.me'),
    twitter: {
      title: `Jorge Peñaranda | ${t('category')}`,
      description: t('page-description'),
      card: 'summary_large_image',
      site: '@peniarandajorge',
      creator: '@peniarandajorge',
      images: '/img/favicon.ico'
    },
    viewport: { width: 'device-width', initialScale: 1 }
  }
}

export default function RootLayout ({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: {
    locale: string;
  };
}) {
  const isValidLocale = lenguagesSupported.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  return (
    <html lang={locale} className='dark'>
      <body
        className={
          Baloo.className +
          '  bg-primary text-secondary dark:bg-primary-dark dark:text-secondary-dark px-0 sm:px-24  2xl:px-36'
        }
      >
        <Suspense fallback={<Loading />}>
          <Navbar lng={locale} />
          {children}
          <Footer />
          <div id='fixed'>
            <SwitchTheme initialTheme={false} nameStorage='DarkMode-Portfolio' />
            <GoUpButton />
          </div>
        </Suspense>
      </body>
    </html>
  )
}
