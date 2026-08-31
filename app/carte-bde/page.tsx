import Link from "next/link";
import { Check, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getActivePartners, getTexts } from "@/lib/data";

export const metadata = {
  title: "Carte BDE | BDE SUP'RNOVA",
  description: "Profitez d'avantages exclusifs toute l'année avec la carte BDE SUP'RNOVA.",
};

const benefits = [
  {
    title: "Économies garanties",
    text: "Réductions dans les bars, restaurants, activités sportives et commerces partenaires. Rentabilisée en quelques sorties.",
  },
  {
    title: "Accès prioritaire",
    text: "Tarifs préférentiels sur la majorité de nos événements : soirées, voyages, activités culturelles et sportives.",
  },
  {
    title: "Soutien associatif",
    text: "En achetant ta carte, tu finances directement les activités du BDE et l'organisation d'événements étudiants.",
  },
  {
    title: "Simple à utiliser",
    text: "Présente ta carte chez nos partenaires. Pas d'application, pas de complication.",
  },
];

const faqs = [
  {
    q: "Quelle est la validité de la carte ?",
    a: (year: string) => `La carte BDE est valable toute l'année universitaire ${year}.`,
  },
  {
    q: "Comment retirer ma carte ?",
    a: () =>
      "Après ton achat en ligne, tu recevras un email de confirmation. Tu peux récupérer ta carte auprès de Mathis (Président) ou Solenn (Trésorière) lors des pauses, à la cafét ou sur Teams.",
  },
  {
    q: "Que faire en cas de perte ou de vol ?",
    a: (year: string, email: string) =>
      `Contactez-nous à ${email}. Une carte de remplacement peut être délivrée moyennant 5€.`,
  },
  {
    q: "Puis-je prêter ma carte ?",
    a: () => "Non. La carte est nominative et strictement réservée à son titulaire.",
  },
  {
    q: "Les avantages sont-ils cumulables ?",
    a: () =>
      "Généralement non, sauf mention contraire chez le partenaire. Vérifiez les conditions de chaque établissement.",
  },
];

export default async function CardBDEPage() {
  const settings = await getSettings();
  const partnersCount = (await getActivePartners()).length;
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>

        {/* Hero */}
        <section className="bg-brand-noir py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-4">
                  Avantages exclusifs
                </div>
                <h1 className="font-spartan font-black text-display-md text-white leading-none mb-6">
                  Carte BDE<br />
                  <span className="text-brand-or">{settings.year}</span>
                </h1>
                <p className="font-lato text-white/60 text-lg leading-relaxed max-w-lg mb-10">
                  Accède à des réductions chez {partnersCount}+ partenaires locaux rennais et profite de tarifs préférentiels sur tous nos événements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={settings.shopUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                  >
                    Acheter ma carte
                  </a>
                  <Link
                    href="/partenaires"
                    className="px-8 py-4 border-2 border-white/25 text-white font-spartan font-bold text-xs uppercase tracking-widest hover:border-brand-or hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                  >
                    Voir les partenaires
                  </Link>
                </div>
              </div>

              {/* Stat */}
              <div className="flex flex-col items-start lg:items-end gap-6">
                <div>
                  <div className="font-spartan font-black text-[6rem] leading-none text-white">
                    {partnersCount}
                  </div>
                  <div className="font-lato text-white/45 text-sm">partenaires locaux</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bénéfices */}
        <section className="bg-brand-craie">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-14">
              <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
                Pourquoi prendre la carte ?
              </div>
              <h2 className="font-spartan font-black text-display-md text-brand-noir leading-none">
                Ce qu'elle t'apporte
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-noir/10">
              {benefits.map(({ title, text }) => (
                <div key={title} className="bg-brand-craie p-10">
                  <div className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 w-5 h-5 bg-brand-rouge flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-spartan font-black text-lg text-brand-noir mb-2">
                        {title}
                      </h3>
                      <p className="font-lato text-sm text-brand-noir/60 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-14">
              <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
                Questions fréquentes
              </div>
              <h2 className="font-spartan font-black text-display-md text-brand-noir leading-none">
                On répond à tout
              </h2>
            </div>

            <div className="divide-y divide-brand-noir/8 max-w-3xl">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-7">
                  <h3 className="font-spartan font-black text-base text-brand-noir mb-3">{q}</h3>
                  <p className="font-lato text-sm text-brand-noir/60 leading-relaxed">
                    {a(settings.year, settings.email)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA bas */}
        <section className="bg-brand-rouge py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/50 mb-2">
                Prêt·e à rejoindre ?
              </div>
              <h2 className="font-spartan font-black text-2xl text-white">
                Ton année commence ici.
              </h2>
            </div>
            <a
              href={settings.shopUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-4 bg-brand-noir text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
            >
              Acheter ma carte — {settings.year}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
