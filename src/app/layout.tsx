import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const baseUrl = "https://lemondeiptv.fr"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Meilleur IPTV en France | Le Monde IPTV",
    template: "%s | Le Monde IPTV",
  },
  description:
    "Le Monde IPTV — Meilleur abonnement IPTV en France avec plus de 65 000 chaînes et VOD en Full HD & 4K. Anti-freeze, support 24/7, garantie 7 jours. Dès 25€.",
  keywords: [
    "IPTV France",
    "meilleur IPTV",
    "abonnement IPTV",
    "IPTV 4K",
    "IPTV français",
    "chaînes IPTV",
    "IPTV pas cher",
    "VOD IPTV",
    "IPTV streaming",
    "abonnement IPTV France",
  ],
  authors: [{ name: "Le Monde IPTV" }],
  creator: "Le Monde IPTV",
  publisher: "Le Monde IPTV",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "Le Monde IPTV",
    title: "Meilleur IPTV en France | Le Monde IPTV — 65 000 Chaînes 4K",
    description:
      "Profitez du meilleur abonnement IPTV en France. Plus de 65 000 chaînes, films et séries VOD en 4K. Zapping ultra-rapide, anti-freeze, support 24/7.",
    images: [
      {
        url: "/hero-psg.jpg",
        width: 1200,
        height: 630,
        alt: "Le Monde IPTV - Meilleur IPTV en France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meilleur IPTV en France | Le Monde IPTV",
    description:
      "65 000 chaînes & VOD en 4K. Abonnement IPTV dès 25€. Garantie 7 jours. Anti-freeze. Support 24/7.",
    images: ["/hero-psg.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#050505] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
