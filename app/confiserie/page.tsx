import { Container } from "@/components/ui/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import StockDisplay from "@/components/StockDisplay";
import { getTexts } from "@/lib/data";
import { Instagram } from "lucide-react";

export const metadata = {
  title: "Confiserie | BDE SUP'RNOVA",
  description: "Boissons fraîches, snacks et douceurs disponibles au local BDE.",
};

export default async function StockPage() {
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>

        {/* Hero */}
        <section className="bg-brand-noir py-24">
          <Container>
            <div className="flex items-start justify-between gap-8 flex-wrap">
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-4">
                  Stock en temps réel
                </div>
                <h1 className="font-spartan font-black text-display-md text-white leading-none mb-6">
                  Confiserie<br />
                  <span className="text-brand-or">BDE</span>
                </h1>
                <p className="font-lato text-white/60 text-lg leading-relaxed max-w-lg">
                  Boissons fraîches, snacks et douceurs — disponibles au local BDE, Campus Sup de Vinci Rennes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 self-end">
                {["Boissons", "Snacks", "Desserts"].map((cat) => (
                  <span
                    key={cat}
                    className="font-spartan font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/20 text-white/60"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Produits */}
        <section className="bg-brand-craie" id="stock-list">
          <Container>
            <div className="py-16">
              <div className="mb-12">
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
                  Ce qu'on a
                </div>
                <h2 className="font-spartan font-black text-display-md text-brand-noir leading-none mb-3">
                  Nos produits
                </h2>
                <p className="font-lato text-sm text-brand-noir/55">
                  Tous les prix sont affichés. Passez au local BDE pour acheter.
                </p>
              </div>
              <StockDisplay />
            </div>
          </Container>
        </section>

        {/* Suggestion */}
        <section className="bg-brand-noir py-16">
          <Container>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
                  Un produit manque ?
                </div>
                <h2 className="font-spartan font-black text-2xl text-white mb-2">
                  Dis-nous ce que tu veux.
                </h2>
                <p className="font-lato text-sm text-white/50 max-w-md">
                  On fait de notre mieux pour satisfaire les envies de la promo.
                </p>
              </div>
              <a
                href="https://www.instagram.com/bde_sup_rnova/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-3 px-8 py-4 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
              >
                <Instagram className="h-4 w-4" />
                Nous contacter
              </a>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
