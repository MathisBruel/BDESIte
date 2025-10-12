import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getActivePartners } from "@/lib/data";

export const metadata = {
  title: "Carte BDE | BDE Sup'RNova",
  description:
    "Profitez d'avantages exclusifs toute l'année avec la carte BDE Sup'RNova 2025-2026.",
};

export default function CardBDEPage() {
  const settings = getSettings();
  const partnersCount = getActivePartners().length;

  return (
    <>
      <Header />
      <main>
        <Hero
          title={`Carte BDE ${settings.year}`}
          subtitle="Votre pass pour une année d'avantages"
          description={`Accédez à des réductions exclusives chez plus de ${partnersCount} partenaires locaux.`}
          primaryCta={{ text: "Acheter ma carte", href: settings.shopUrl }}
          secondaryCta={{ text: "Voir les partenaires", href: "/partenaires" }}
        />

        <Section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-spartan mb-8 text-center">
              Pourquoi prendre la carte BDE ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold font-spartan mb-3">Économies garanties</h3>
                <p className="text-gray-700">
                  Profitez de réductions toute l&apos;année dans les bars, restaurants, activités sportives, événements culturels et commerces partenaires. La carte est rentabilisée en quelques sorties !
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold font-spartan mb-3">Accès prioritaire</h3>
                <p className="text-gray-700">
                  Bénéficiez de tarifs préférentiels sur la plupart de nos événements : soirées,
                  voyages, activités sportives et culturelles.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold font-spartan mb-3">Soutien associatif</h3>
                <p className="text-gray-700">
                  En achetant votre carte, vous soutenez directement les activités du BDE et
                  participez au financement des événements étudiants.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold font-spartan mb-3">Simple à utiliser</h3>
                <p className="text-gray-700">
                  Présentez simplement votre carte chez nos partenaires pour profiter
                  instantanément de vos avantages. Pas d&apos;application, pas de complication.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section background="gray">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-spartan mb-8 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-spartan mb-2">
                  Quelle est la validité de la carte ?
                </h3>
                <p className="text-gray-700">
                  La carte BDE est valable toute l&apos;année universitaire {settings.year}, soit
                  du 1er septembre 2025 au 31 août 2026.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-spartan mb-2">Comment retirer ma carte ?</h3>
                <p className="text-gray-700">
                  Après votre achat en ligne, vous recevrez un email de confirmation. Tu pourras
                  récupérer ta carte directement auprès de Mathis (Président) ou Solenn (Trésorière) lors des pauses dans les couloirs, à la cafét, ou sur Teams. On est toujours dispo pour toi ! 😊
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-spartan mb-2">
                  Que faire en cas de perte ou de vol ?
                </h3>
                <p className="text-gray-700">
                  Contactez-nous immédiatement à l&apos;adresse {settings.email}. Une carte de
                  remplacement pourra vous être délivrée moyennant des frais de 5€.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-spartan mb-2">
                  Puis-je offrir ma carte à quelqu&apos;un d&apos;autre ?
                </h3>
                <p className="text-gray-700">
                  Non, la carte BDE est nominative et ne peut être prêtée. Elle est strictement
                  réservée à l&apos;étudiant titulaire.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold font-spartan mb-2">
                  Les avantages sont-ils cumulables ?
                </h3>
                <p className="text-gray-700">
                  Les avantages de la carte BDE ne sont généralement pas cumulables avec
                  d&apos;autres promotions en cours, sauf mention contraire chez le partenaire.
                  Vérifiez les conditions spécifiques de chaque établissement.
                </p>
              </div>
            </div>
          </div>
        </Section>

      </main>
      <Footer />
    </>
  );
}

