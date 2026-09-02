import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatText } from "@/lib/utils";

interface HomeCardSectionProps {
  texts: any;
  settings: any;
  partnersCount: number;
}

export function HomeCardSection({ texts, settings, partnersCount }: HomeCardSectionProps) {
  return (
    <section id="carte-bde" className="bg-brand-rouge">
      <Container>
        <div className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texte gauche */}
          <div>
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/50 mb-4">
              {texts.home.card.subtitle ?? "Avantages exclusifs"}
            </div>
            <h2 className="font-spartan font-black text-display-md text-white leading-none mb-6">
              {formatText(texts.home.card.title, { year: settings.year })}
            </h2>
            <p className="font-lato text-white/70 text-lg leading-relaxed max-w-lg mb-8">
              {formatText(texts.home.card.description, { partnersCount })}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {(texts.home.card.badges ?? []).map((b: string) => (
                <span
                  key={b}
                  className="font-spartan font-bold text-xs uppercase tracking-widest px-3 py-1.5 bg-white/15 text-white border border-white/20"
                >
                  {formatText(b, { partnersCount })}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/carte-bde"
                className="px-8 py-4 bg-brand-noir text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                {texts.home.card.ctaBuy}
              </Link>
              <Link
                href="/partenaires"
                className="px-8 py-4 border-2 border-white/30 text-white font-spartan font-bold text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                {texts.home.card.ctaSeePartners}
              </Link>
            </div>
          </div>

          {/* Stat droite */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="font-spartan font-black text-[8rem] leading-none text-white/10 select-none">
                {partnersCount}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-spartan font-black text-[5rem] leading-none text-white">
                  {partnersCount}
                </div>
                <div className="font-lato text-base text-white/60 mt-2 text-center">
                  partenaires<br />locaux
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
