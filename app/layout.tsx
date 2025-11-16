import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Kent&Julia - Wedding Invitation",
  description:
    "You're invited to the wedding of Kent&Julia! Join us on January 22, 2026 in San Roque Parish - Cordova Cebu. Discover our love story, RSVP, view the gallery, and leave your wishes!",
  keywords:
    "Kent Julia wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues San Roque Parish - Cordova Cebu, #KentAndJuliaWedding",
  authors: [
    { name: "Kent" },
    { name: "Julia" },
  ],
  creator: "Kent&Julia",
  publisher: "Kent&Julia",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Kent-and-Julia-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Airez-and-Brendan-invit`ation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Kent&Julia Wedding | January 22, 2026",
    description:
      "Celebrate the union of Kent&Julia on January 22, 2026 in San Roque Parish - Cordova Cebu. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Kent-and-Julia-invitation.vercel.app/",
    siteName: "Kent and Julia Wedding ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Kent-and-Julia-invitation.vercel.app/image.png",
        width: 1200,
        height: 630,
        alt: "Kent&Julia Wedding Invitation - January 22, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kent&Julia Wedding Invitation",
    description:
      "You're invited to the wedding of Kent&Julia! January 22, 2026. RSVP, view our gallery, and leave a message! #KentAndJuliaWedding",
    images: ["https://Kent-and-Julia-invitation.vercel.app/image.png"],
    creator: "@airezandbrendan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Kent&Julia Wedding",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "San Roque Parish - Cordova Cebu",
          address: {
            "@type": "PostalAddress",
            streetAddress: "San Roque Parish - Cordova Cebu",
            addressLocality: "Cordova, Cebu",
            addressRegion: "Cebu",
            postalCode: "6000",
            addressCountry: "Philippines",
          },
        },
      ],
      image: ["https://Kent-and-Julia-invitation.vercel.app/image.png"],
      description:
        "You're invited to the wedding of Kent&Julia! Join us on January 22, 2026 in San Roque Parish - Cordova Cebu. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Kent&Juli a",
      },
      offers: {
        "@type": "Offer",
        url: "https://Kent-and-Julia-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#KentAndJuliaWedding",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A3428" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} font-inter antialiased text-foreground`}>
        <BackgroundMusic />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
