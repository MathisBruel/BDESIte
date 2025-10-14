import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getActivePartners } from "@/lib/data";
import { PartnersClient } from "./PartnersClient";

export const metadata = {
  title: "Partenaires | BDE Sup'RNova",
  description:
    "Découvrez tous les commerces et services partenaires qui vous offrent des réductions avec votre carte BDE Sup'RNova.",
};

export default function PartnersPage() {
  const allPartners = getActivePartners();
  const categories = Array.from(new Set(allPartners.map((p) => p.category)));
  const cities = Array.from(new Set(allPartners.map((p) => p.city))).sort();

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Nos Partenaires"
          subtitle="Des avantages exclusifs toute l'année avec votre carte BDE"
          description="Découvrez tous les commerces et services partenaires qui vous offrent des réductions et avantages avec votre carte BDE Sup'RNova."
          primaryCta={{ text: "Acheter ma carte", href: "/carte-bde" }}
          variant="partners"
        />

        <PartnersClient partners={allPartners} categories={categories} cities={cities} />

        <Section background="gray">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-spartan mb-6">
              Vous êtes commerçant ?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Vous souhaitez devenir partenaire du BDE Sup&apos;RNova et toucher une communauté
              dynamique d&apos;étudiants rennais ?{" "}
              <a href="/#contact" className="text-brand-red font-bold hover:underline">
                Contactez-nous
              </a>
              {" "}pour discuter d&apos;un partenariat sur mesure !
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

