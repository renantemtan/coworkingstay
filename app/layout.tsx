import React from "react"
import type { Metadata } from 'next'
import { Sora, Inter, Caveat } from 'next/font/google'

import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

import { getBrandConfig } from '@/lib/content-loader';

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  const SITE_URL = 'https://coworkingstay.com';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${brand.identity.name} — ${brand.identity.subTag.replace(/\.$/, '')}`,
      template: `%s | ${brand.identity.name}`,
    },
    description: brand.identity.mainTag,
    keywords: [
      ...brand.identity.targetMarket,
      ...brand.identity.uniqueValueProposition,
      'coworking space Philippines',
      'workation Philippines',
    ],
    authors: [{ name: brand.identity.name, url: SITE_URL }],
    creator: brand.identity.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: brand.identity.name,
      title: `${brand.identity.name} — ${brand.identity.subTag.replace(/\.$/, '')}`,
      description: brand.identity.mainTag,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${brand.identity.name} — ${brand.identity.mainTag}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.identity.name} — ${brand.identity.subTag.replace(/\.$/, '')}`,
      description: brand.identity.mainTag,
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
  };
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
