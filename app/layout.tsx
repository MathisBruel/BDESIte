import type { Metadata } from "next";
import { League_Spartan, Merriweather } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${leagueSpartan.variable} ${merriweather.variable}`}
      style={{ "--font-chunk-five": "Impact, 'Arial Black', sans-serif" } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}

