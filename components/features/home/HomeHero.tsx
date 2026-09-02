"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { animateScrollToY } from "@/lib/utils";
import { SCROLL_OFFSET } from "@/lib/constants";
import { getImageUrl } from "@/lib/image-url";
import { BLUR_DARK } from "@/lib/image-blur";
import { useEffect, useState, useCallback } from "react";

interface HomeHeroProps {
  texts: any;
  settings: any;
  partnersCount: number;
  heroPhotos?: { path: string; position: string }[];
}

export function HomeHero({ texts, settings, heroPhotos = [] }: HomeHeroProps) {
  const [current, setCurrent] = useState<number>(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const target = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
      void animateScrollToY(target, 600);
    }
  };

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // randomise après hydration (SSR démarre à 0 pour LCP)
  useEffect(() => {
    if (heroPhotos.length > 1) {
      setCurrent(Math.floor(Math.random() * heroPhotos.length));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (heroPhotos.length <= 1) return;
    const t = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroPhotos.length);
    }, 5000);
    return () => clearTimeout(t);
  }, [current, heroPhotos.length]);

  const hasPhotos = heroPhotos.length > 0;

  return (
    <section className="relative bg-brand-noir min-h-[90vh] flex flex-col overflow-hidden">
      {/* Slideshow — toutes les slides restent dans le DOM pour garantir le cross-fade CSS */}
      {hasPhotos && heroPhotos.map((photo, idx) => {
        const isCurrent = idx === current;
        const isNext = idx === (current + 1) % heroPhotos.length && heroPhotos.length > 1;
        return (
          <div
            key={photo.path}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: isCurrent ? 1 : 0 }}
          >
            <Image
              src={photo.path}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: photo.position }}
              sizes="100vw"
              priority={isCurrent}
              loading={isCurrent || isNext ? "eager" : "lazy"}
              quality={82}
              placeholder="blur"
              blurDataURL={BLUR_DARK}
            />
          </div>
        );
      })}

      {/* Dark overlay */}
      {hasPhotos && (
        <div className="absolute inset-0 bg-black/55 z-[1]" />
      )}

      {/* Content — flex-1 so it fills available height */}
      <div className="relative z-[2] flex-1 flex items-center w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-16 lg:py-28">

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

            {/* Mascotte — 2 colonnes */}
            <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div
                className="animate-sticker-in relative"
                style={{ width: "clamp(160px, 35vw, 320px)", height: "clamp(160px, 35vw, 320px)" }}
              >
                {/* Halo */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl scale-75" />
                <Image
                  src="/images/assets/Logo rond.png"
                  alt={texts.home.brandAltBde}
                  fill
                  className="object-contain relative"
                  priority
                />
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Bottom bar: dots + scroll — in flow, never overlaps content */}
      <div className="relative z-[3] flex flex-col items-center gap-3 pb-6">
        {hasPhotos && heroPhotos.length > 1 && (
          <div className="flex gap-2">
            {heroPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Photo ${idx + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or ${
                  idx === current
                    ? "w-6 h-2.5 bg-brand-or"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
        <button
          onClick={() => scrollTo("presentation")}
          className="text-white/35 hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
          aria-label={texts.home.scrollDownAria}
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
