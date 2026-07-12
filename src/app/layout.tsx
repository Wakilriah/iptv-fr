import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = "https://matchcesoir.fr"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium",
    template: "%s | Match Ce Soir Fr",
  },
  description:
    "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium en Full HD & 4K. Support 24/7. Dès 25€.",
  keywords: [
    "Plateforme de divertissement",
    "Streaming premium",
    "Abonnement TV",
    "Divertissement 4K",
    "Vidéos et Programmes en direct",
    "Télévision numérique",
    "Streaming de sport",
    "Cinéma à la maison",
    "Sélection multimédia",
    "Accès Premium France",
  ],
  authors: [{ name: "Match Ce Soir Fr" }],
  creator: "Match Ce Soir Fr",
  publisher: "Match Ce Soir Fr",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "Match Ce Soir Fr",
    title: "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium",
    description:
      "Profitez de votre portail de divertissement avec Match Ce Soir Fr. Vidéos et programmes en 4K. Support 24/7.",
    images: [
      {
        url: "/hero-psg.webp",
        width: 1200,
        height: 630,
        alt: "Match Ce Soir Fr - Portail de divertissement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Match Ce Soir Fr — Votre Portail de Divertissement VOD & TV en Full HD",
    description: "Vaste sélection de vidéos, programmes et TV en 4K. Abonnement dès 25€. Qualité Full HD. Support 24/7.",
    images: ["/hero-psg.webp"],
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
import { MotionProvider } from "@/components/MotionProvider";
import { OrderModalProvider } from "@/context/OrderModalContext";
import TikTokPixel from "@/components/TikTokPixel";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/PostHogProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <TikTokPixel />
          </Suspense>
          <MotionProvider>
            <OrderModalProvider>
              {children}
            </OrderModalProvider>
          </MotionProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}

