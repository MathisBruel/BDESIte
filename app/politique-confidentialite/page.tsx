import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getTexts } from "@/lib/data";

export const metadata = {
  title: "Politique de confidentialité | BDE SUP'RNOVA",
  description: "Politique de confidentialité et protection des données du BDE SUP'RNOVA.",
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>
        <section className="bg-brand-noir py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-spartan font-black text-display-md text-white leading-none">
              Politique de confidentialité
            </h1>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-headings:font-spartan prose-headings:font-black prose-a:text-brand-rouge">
            <p className="lead">
              Le BDE Sup'Rennes / SUP'RNOVA accorde une grande importance à la protection de vos données personnelles.
            </p>

            <hr />

            <h2>1. Responsable du traitement</h2>
            <div className="not-prose grid gap-3 sm:grid-cols-2 mb-8">
              {[
                ["Organisation", "Sup'Rennes – SUP'RNOVA"],
                ["Adresse", "21 rue du Bignon, 35135 Chantepie, France"],
                ["Contact RGPD", settings.email],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-sm text-brand-noir/45 font-lato">{label}</div>
                  <div className="font-medium font-lato">{value}</div>
                </div>
              ))}
            </div>

            <hr />

            <h2>2. Hébergement et stockage des données</h2>
            <ul>
              <li>Hébergeur : Mathis BRUEL (France)</li>
              <li>Localisation des données : France</li>
              <li>Plateformes utilisées : Google Workspace, Google Forms</li>
            </ul>

            <hr />

            <h2>3. Données collectées</h2>
            <p>Nous pouvons collecter les données suivantes :</p>
            <ul>
              <li>Identité : nom, prénom, adresse, nationalité, classe, statut étudiant</li>
              <li>Contact : adresse e-mail, numéro de téléphone</li>
              <li>Images : consentement droit à l'image, date et lieu de prise de vue</li>
              <li>Formulaires : réponses (participation, boutique, événements)</li>
            </ul>

            <hr />

            <h2>4. Finalités et bases légales</h2>
            <ul>
              <li>Prise de contact — Consentement</li>
              <li>Gestion de l'adhésion / boutique / billetterie — Exécution d'un contrat</li>
              <li>Droit à l'image — Consentement explicite</li>
              <li>Communication BDE — Intérêt légitime</li>
              <li>Obligations comptables — Obligation légale</li>
              <li>Sécurité / journalisation — Intérêt légitime</li>
            </ul>

            <hr />

            <h2>5. Durée de conservation</h2>
            <ul>
              <li>Droit à l'image — Année scolaire + 1 an d'archive</li>
              <li>Données contractuelles — 3 à 10 ans</li>
              <li>Données de contact — 2 ans après le dernier contact</li>
              <li>Logs techniques — 6 à 12 mois</li>
              <li>Données scolaires — Année scolaire + 1 an</li>
            </ul>

            <hr />

            <h2>6. Destinataires des données</h2>
            <ul>
              <li>Accès interne : Président, Vice-président, Trésorier, Vice-trésorier</li>
              <li>Sous-traitants : Google Workspace, hébergeur</li>
            </ul>
            <p>Aucune donnée n'est transférée en dehors de l'Union européenne.</p>

            <hr />

            <h2>7. Cookies</h2>
            <p>Le site n'utilise que des cookies strictement nécessaires. Aucune mesure d'audience ou traceur tiers n'est activé sans consentement.</p>

            <hr />

            <h2>8. Droits des utilisateurs</h2>
            <ul>
              <li>Accès, rectification, suppression</li>
              <li>Opposition, limitation, portabilité</li>
              <li>Retrait du consentement</li>
            </ul>
            <p>
              Exercez vos droits à : <a href={`mailto:${settings.email}`}>{settings.email}</a> — délai de réponse : 1 mois.
            </p>

            <hr />

            <h2>9. Sécurité</h2>
            <ul>
              <li>Connexion HTTPS</li>
              <li>Sauvegardes régulières</li>
              <li>Contrôle d'accès strict</li>
            </ul>

            <hr />

            <h2>10. Contact et réclamation</h2>
            <p>
              Email : <a href={`mailto:${settings.email}`}>{settings.email}</a><br />
              Réclamation CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
            </p>
            <p><em>Dernière mise à jour : 15/10/2025</em></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
