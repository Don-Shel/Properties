import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import StickyContactButton from "@/components/layout/sticky-contact-button"
import SchemaMarkup from "@/components/seo/schema-markup"
import { generateOrganizationSchema } from "@/lib/seo-utils"
import "./globals.css"

import { Plus_Jakarta_Sans, IBM_Plex_Mono, Source_Serif_4, Geist, Inter } from 'next/font/google'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })
const _sourceSerif_4 = Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Joshina International Properties | Real Estate Eldoret",
  description:
    "Professional real estate consultancy in Eldoret, Kenya. Buy, sell, or rent properties with expert guidance. Discover investment opportunities and get expert valuation services.",
  keywords: [
    "real estate Eldoret",
    "property for sale Eldoret",
    "property for rent Eldoret",
    "real estate consultant Kenya",
    "property investment Eldoret",
    "land for sale Eldoret",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://joshina.com",
    siteName: "Joshina International Properties",
    title: "Joshina International Properties | Real Estate Eldoret",
    description:
      "Professional real estate consultancy in Eldoret, Kenya. Buy, sell, or rent properties with expert guidance.",
    images: [
      {
        url: "https://joshina.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joshina International Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshina International Properties | Real Estate Eldoret",
    description:
      "Professional real estate consultancy in Eldoret, Kenya. Buy, sell, or rent properties with expert guidance.",
    images: ["https://joshina.com/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://joshina.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7033ff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://joshina.com" />
        <SchemaMarkup schema={organizationSchema} />
      </head>
      <body className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
        <StickyContactButton />
        <Analytics />
      </body>
    </html>
  )
}
