import React from "react"
import type { Metadata } from 'next'
import { Sora, Inter, Caveat } from 'next/font/google'

import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

const SITE_URL = 'https://coworkingstay.com'
const SITE_NAME = 'CoWorkingStay'
const SITE_DESCRIPTION =
  'Coworking-first hotel stays in the Philippines—professional-grade workspaces in beach, lake, and surf destinations. Designed for those who refuse to choose between results and reality.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Designed for Those Who Refuse to Choose`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'coworking space Philippines',
    'coworking hotel Philippines',
    'workation Philippines',
    'remote work Philippines',
    'digital nomad Philippines',
    'coliving Philippines',
    'coworking Puerto Galera',
    'coworking La Union',
    'coworking Laguna',
    'work and travel Philippines',
    'remote work beach Philippines',
    'productivity retreat',
    'work vacation Philippines',
    'startup retreat Philippines',
    'team building retreat Philippines',
    'nightshift workspace Philippines',
    'study vacation Philippines',
    'freelancer workspace Philippines',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Designed for Those Who Refuse to Choose`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Coworking Space Hotels in Puerto Galera, La Union & Laguna`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Designed for Those Who Refuse to Choose`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-white text-foreground">{children}</body>
    </html>
  )
}
