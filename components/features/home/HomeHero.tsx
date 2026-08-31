"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { animateScrollToY } from "@/lib/utils";
import { SCROLL_OFFSET } from "@/lib/constants";
import { getImageUrl } from "@/lib/image-url";

interface HomeHeroProps {
  texts: any;
  settings: any;
  partnersCount: number;
}

export function HomeHero({ texts, settings }: HomeHeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const target = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
      void animateScrollToY(target, 600);
    }
  };

  return (
    <section className="relative bg-brand-noir min-h-[90vh] flex items-center overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-20 lg:py-28">

          {/* Texte — 3 colonnes */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="font-dancing text-brand-or text-2xl mb-5 block">
              édition {settings.year}
            </div>

            <h1 className="font-spartan font-black leading-[0.88] mb-8 text-[clamp(3rem,8vw,5rem)]">
              <span className="block text-brand-rouge">BDE</span>
              <span className="block text-white">SUP DE VINCI</span>
              <span className="block text-white">RENNES</span>
            </h1>

            <p className="font-lato text-white/60 text-lg leading-relaxed max-w-lg mb-10">
              {texts.home.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("evenements")}
                className="px-8 py-4 bg-brand-rouge text-white font-spartan font-bold text-sm uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                {texts.home.ctaViewEvents}
              </button>
              <Link
                href="/partenaires"
                className="px-8 py-4 border-2 border-white/25 text-white font-spartan font-bold text-sm uppercase tracking-widest hover:border-brand-or hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                {texts.home.ctaSeeAdvantages}
              </Link>
            </div>
          </div>

          {/* Mascotte sticker — 2 colonnes, seul élément animé */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className="animate-sticker-in relative"
              style={{ width: "clamp(200px, 35vw, 320px)", height: "clamp(200px, 35vw, 320px)" }}
            >
              <Image
                src={getImageUrl("assets/Logo couleur.png")}
                alt={texts.home.brandAltBde}
                fill
                className="object-contain"
                style={{ filter: "drop-shadow(4px 5px 0px #150000)" }}
                priority
              />
            </div>
          </div>

        </div>
      </Container>

      {/* Scroll indicator — SVG Lucide, pas d'emoji */}
      <button
        onClick={() => scrollTo("presentation")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
        aria-label={texts.home.scrollDownAria}
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
}
