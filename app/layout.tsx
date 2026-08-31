import type { Metadata } from "next";
import { League_Spartan, Lato, Dancing_Script } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo";
import SmoothScroll from "./SmoothScroll";
import { VisitTracker } from "@/components/VisitTracker";
import { Toaster } from "sonner";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-dancing-script",
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
      className={`${leagueSpartan.variable} ${lato.variable} ${dancingScript.variable}`}
    >
      <body>
        <Toaster position="top-right" richColors />
        <SmoothScroll />
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}

