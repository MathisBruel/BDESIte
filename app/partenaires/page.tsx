import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { getActivePartners, getTexts } from "@/lib/data";
import { PartnersClient } from "./PartnersClient";

export const metadata = {
  title: "Partenaires | BDE SUP'RNOVA",
  description:
    "Découvrez tous les commerces et services partenaires qui vous offrent des réductions avec votre carte BDE SUP'RNOVA.",
};

export default async function PartnersPage() {
  const allPartners = await getActivePartners();
  const texts = await getTexts();
  const categories = Array.from(new Set(allPartners.map((p) => p.category)));
  const cities = Array.from(new Set(allPartners.map((p) => p.city))).sort();

  return (
    <>
      <Header texts={texts} />
      <main>

        {/* Hero */}
        <section className="bg-brand-noir py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-4">
                  {allPartners.length} partenaires actifs
                </div>
                <h1 className="font-spartan font-black text-display-md text-white leading-none mb-6">
                  Nos<br />
                  <span className="text-brand-or">Partenaires</span>
                </h1>
                <p className="font-lato text-white/60 text-lg leading-relaxed max-w-lg mb-10">
                  Des avantages exclusifs toute l'année avec votre carte BDE. Bars, restaurants, sports, culture — tous à Rennes.
                </p>
                <Link
                  href="/carte-bde"
                  className="px-8 py-4 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                >
                  Acheter ma carte BDE
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Liste filtrée */}
        <PartnersClient partners={allPartners} categories={categories} cities={cities} />

        {/* CTA commerçants */}
        <section className="bg-brand-craie border-t border-brand-noir/8">
          <Container>
            <div className="py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
                  Vous êtes commerçant ?
                </div>
                <h2 className="font-spartan font-black text-2xl text-brand-noir mb-3">
                  Devenez partenaire du BDE
                </h2>
                <p className="font-lato text-sm text-brand-noir/60 max-w-md">
                  Touchez une communauté dynamique d'étudiants rennais.{" "}
                  <Link href="/#contact" className="text-brand-rouge hover:underline">
                    Contactez-nous
                  </Link>{" "}
                  pour discuter d'un partenariat sur mesure.
                </p>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
