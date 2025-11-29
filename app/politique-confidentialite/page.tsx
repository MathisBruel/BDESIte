import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getTexts } from "@/lib/data";

export const metadata = {
  title: "Politique de confidentialité | BDE Sup'RNova",
  description: "Politique de confidentialité et protection des données du BDE Sup'RNova.",
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>
        <Hero title="Politique de confidentialité" showCtas={false} />

        <Section>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead">
              Le BDE Sup&apos;Rennes / Sup&apos;RNova accorde une grande importance à la protection de vos
              données personnelles. Cette politique explique comment nous collectons, utilisons et
              protégeons vos informations.
            </p>

            <hr className="my-8" />

            <h2>1. Responsable du traitement</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <dt>Organisation</dt>
              <dd><strong>Sup&apos;Rennes – Sup&apos;RNova</strong></dd>
              <dt>Adresse</dt>
              <dd>21 rue du Bignon, 35135 Chantepie, France</dd>
              <dt>Contact RGPD</dt>
              <dd><a href={`mailto:${settings.email}`}>{settings.email}</a></dd>
            </dl>

            <hr className="my-8" />

            <h2>2. Hébergement et stockage des données</h2>
            <ul>
              <li>Hébergeur : Mathis BRUEL (France)</li>
              <li>Localisation des données : France</li>
              <li>Plateformes utilisées : Google Workspace, Google Forms</li>
            </ul>

            <hr className="my-8" />

            <h2>3. Données collectées</h2>
            <p>Nous pouvons collecter les données suivantes :</p>
            <div className="not-prose grid gap-6">
              <div className="p-0">
                <h3 className="mt-0">Identité et contact</h3>
                <ul>
                  <li>Nom, prénom, adresse, nationalité</li>
                  <li>Adresse e-mail et numéro de téléphone</li>
                  <li>Classe et statut d’étudiant</li>
                </ul>
              </div>
              <div className="p-0">
                <h3 className="mt-0">Images et consentements</h3>
                <ul>
                  <li>Consentement pour l’utilisation d’image</li>
                  <li>Date et lieu de prise de vue</li>
                </ul>
              </div>
              <div className="p-0">
                <h3 className="mt-0">Formulaires</h3>
                <ul>
                  <li>Réponses (participation, boutique, événements…)</li>
                  <li>Origine : site, présentiel, outils tiers (Google Forms, boutique)</li>
                </ul>
              </div>
            </div>

            <hr className="my-8" />

            <h2>4. Finalités et bases légales</h2>
            <dl>
              <dt>Prise de contact</dt>
              <dd>Consentement</dd>
              <dt>Gestion de l’adhésion / boutique / billetterie</dt>
              <dd>Exécution d’un contrat</dd>
              <dt>Droit à l’image</dt>
              <dd>Consentement explicite</dd>
              <dt>Communication d’informations BDE</dt>
              <dd>Intérêt légitime</dd>
              <dt>Obligations comptables</dt>
              <dd>Obligation légale</dd>
              <dt>Sécurité / journalisation</dt>
              <dd>Intérêt légitime</dd>
            </dl>

            <hr className="my-8" />

            <h2>5. Durée de conservation</h2>
            <table className="w-full border-separate border-spacing-y-1 md:border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left py-1 pr-4">Catégorie</th>
                  <th className="text-left py-1">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 pr-4 align-top">Droit à l’image</td>
                  <td className="py-1 align-top">Année scolaire + 1 an d’archive</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 align-top">Données contractuelles</td>
                  <td className="py-1 align-top">3 à 10 ans (obligations légales)</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 align-top">Données de contact</td>
                  <td className="py-1 align-top">2 ans après le dernier contact</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 align-top">Logs techniques</td>
                  <td className="py-1 align-top">6 à 12 mois</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 align-top">Données scolaires</td>
                  <td className="py-1 align-top">Année scolaire + 1 an</td>
                </tr>
              </tbody>
            </table>

            <hr className="my-8" />

            <h2>6. Destinataires des données</h2>
            <ul>
              <li>Accès interne : Président, Vice-président, Trésorier, Vice-trésorier</li>
              <li>Sous-traitants : Google Workspace (mail, forms), hébergeur</li>
            </ul>
            <p>Aucune donnée n’est transférée en dehors de l’Union européenne.</p>

            <hr className="my-8" />

            <h2>7. Cookies</h2>
            <p>
              Le site n’utilise que des cookies strictement nécessaires à son bon fonctionnement.
              Aucune mesure d’audience ou traceur tiers n’est activé sans consentement.
            </p>

            <hr className="my-8" />

            <h2>8. Droits des utilisateurs</h2>
            <ul>
              <li>Accès, rectification, suppression</li>
              <li>Opposition, limitation, portabilité</li>
              <li>Retrait du consentement</li>
              <li>Directives post-mortem</li>
            </ul>
            <p>
              Exercez vos droits à : <a href={`mailto:${settings.email}`}>{settings.email}</a> — délai
              de réponse : 1 mois.
            </p>

            <hr className="my-8" />

            <h2>9. Sécurité</h2>
            <ul>
              <li>Connexion HTTPS</li>
              <li>Sauvegardes régulières</li>
              <li>Contrôle d’accès strict</li>
              <li>Journalisation et mises à jour régulières</li>
            </ul>

            <hr className="my-8" />

            <h2>10. Données concernant les mineurs</h2>
            <ul>
              <li>Collecte possible dans le cadre d’événements</li>
              <li>Consentement parental obligatoire pour l’utilisation d’images</li>
            </ul>

            <hr className="my-8" />

            <h2>11. Délégué à la protection des données (DPO)</h2>
            <p>
              Référent RGPD : Mathis BRUEL — <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>

            <h2>12. Contact et réclamation</h2>
            <p>
              Pour toute question relative à cette politique ou à vos données personnelles :
              <br />
              Email : <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de la CNIL :
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"> www.cnil.fr</a>
            </p>

            <p>
              <em>Dernière mise à jour : 15/10/2025</em>
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

