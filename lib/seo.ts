import type { Metadata } from "next";
import { getImageUrl } from "./image-url";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://suprennes.me"),
  title: {
    default: "BDE SUP'RNOVA | Association étudiante Rennes",
    template: "%s | BDE SUP'RNOVA",
  },
  description:
    "Le BDE SUP'RNOVA, association étudiante de Sup de Vinci Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
  keywords: [
    "BDE",
    "SUP'RNOVA",
    "Rennes",
    "association étudiante",
    "événements",
    "partenaires",
    "carte BDE",
    "Sup de Vinci",
  ],
  authors: [{ name: "BDE SUP'RNOVA" }],
  creator: "BDE SUP'RNOVA",
  publisher: "BDE SUP'RNOVA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "BDE SUP'RNOVA",
    title: "BDE SUP'RNOVA | Association étudiante Rennes",
    description:
      "Le BDE SUP'RNOVA, association étudiante de Sup de Vinci Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
    images: [
      {
        url: getImageUrl("assets/Logo couleur.png"),
        width: 1200,
        height: 1200,
        alt: "Logo BDE SUP'RNOVA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BDE SUP'RNOVA",
    description:
      "Le BDE SUP'RNOVA, association étudiante de Sup de Vinci Rennes. Événements, partenaires, avantages carte BDE 2025-2026.",
    images: [getImageUrl("assets/Logo couleur.png")],
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

