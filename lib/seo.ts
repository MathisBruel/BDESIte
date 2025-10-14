import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://suprennes.me"),
  title: {
    default: "BDE Sup'RNova | Association étudiante Rennes",
    template: "%s | BDE Sup'RNova",
  },
  description:
    "Le BDE Sup'RNova, association étudiante de Sup de Co Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
  keywords: [
    "BDE",
    "Sup'RNova",
    "Rennes",
    "association étudiante",
    "événements",
    "partenaires",
    "carte BDE",
    "Sup de Co",
  ],
  authors: [{ name: "BDE Sup'RNova" }],
  creator: "BDE Sup'RNova",
  publisher: "BDE Sup'RNova",
  icons: {
    icon: [
      { url: "/images/assets/Logo simple couleur.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/assets/Logo simple couleur.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BDE Sup'RNova",
    title: "BDE Sup'RNova | Association étudiante Rennes",
    description:
      "Le BDE Sup'RNova, association étudiante de Sup de Co Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
    images: [
      {
        url: "/images/assets/Logo couleur.png",
        width: 1200,
        height: 1200,
        alt: "Logo BDE Sup'RNova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BDE Sup'RNova",
    description:
      "Le BDE Sup'RNova, association étudiante de Sup de Co Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
    images: ["/images/assets/Logo couleur.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
};

