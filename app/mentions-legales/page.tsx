import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Mentions légales | BDE Sup'RNova",
  description: "Mentions légales du site du BDE Sup'RNova.",
};

export default function LegalPage() {
  const settings = getSettings();

  return (
    <>
      <Header />
      <main>
        <Hero title="Mentions légales" showCtas={false} />

        <Section>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Éditeur du site</h2>
            <p>
              Le site {typeof window !== "undefined" ? window.location.hostname : "suprennes.me"}{" "}
              est édité par :
            </p>
            <p>
              <strong>{settings.association}</strong>
              <br />
              Association loi 1901
              <br />
              Siège social : 2 Rue Robert d&apos;Arbrissel, 35065 Rennes Cedex
              <br />
              Email : {settings.email}
            </p>

            <h2>2. Directeur de publication</h2>
            <p>Le directeur de publication est le Président du BDE Sup&apos;RNova en exercice.</p>

            <h2>3. Hébergeur</h2>
            <p>
              Le site est hébergé par :
              <br />
              <strong>Vercel Inc.</strong>
              <br />
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723
              <br />
              États-Unis
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble de ce site relève de la législation française et internationale sur
              le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de
              reproduction sont réservés, y compris pour les documents téléchargeables et les
              représentations iconographiques et photographiques.
            </p>
            <p>
              Le logo, la charte graphique et les contenus du BDE Sup&apos;RNova sont la propriété
              exclusive de l&apos;association.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d&apos;un droit d&apos;accès, de rectification et de suppression des données vous
              concernant. Pour exercer ce droit, contactez-nous à l&apos;adresse : {settings.email}
            </p>
            <p>
              Pour plus d&apos;informations, consultez notre{" "}
              <a href="/politique-confidentialite">politique de confidentialité</a>.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de tracking. Seuls des cookies techniques
              nécessaires au bon fonctionnement du site peuvent être utilisés.
            </p>

            <h2>7. Crédits</h2>
            <p>
              Site développé avec Next.js et hébergé sur Vercel.
              <br />
              Design et développement : BDE Sup&apos;RNova {new Date().getFullYear()}
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

