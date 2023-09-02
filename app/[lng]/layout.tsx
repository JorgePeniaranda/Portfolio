import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { dir } from 'i18next'
import { languages } from '@/app/i18n/settings.js'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jorge Peñaranda | Web Developer',
  description: 'Jorge Peñaranda | Web Developer',
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode,
  params: {
    lng: string,
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
