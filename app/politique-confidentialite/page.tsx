import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Politique de confidentialité | BDE Sup'RNova",
  description: "Politique de confidentialité et protection des données du BDE Sup'RNova.",
};

export default function PrivacyPage() {
  const settings = getSettings();

  return (
    <>
      <Header />
      <main>
        <Hero title="Politique de confidentialité" showCtas={false} />

        <Section>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead">
              Le BDE Sup&apos;RNova accorde une grande importance à la protection de vos données
              personnelles. Cette politique vous informe sur la manière dont nous collectons,
              utilisons et protégeons vos informations.
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est :
              <br />
              <strong>{settings.association}</strong>
              <br />
              Email : {settings.email}
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous sommes susceptibles de collecter les données suivantes :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>
                Informations relatives à votre navigation sur le site (pages visitées, durée de
                visite)
              </li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul>
              <li>Répondre à vos demandes via le formulaire de contact</li>
              <li>Vous envoyer notre newsletter (avec votre consentement)</li>
              <li>Gérer votre adhésion et votre carte BDE</li>
              <li>Améliorer nos services et notre site web</li>
            </ul>

            <h2>4. Base légale</h2>
            <p>Le traitement de vos données personnelles repose sur :</p>
            <ul>
              <li>Votre consentement (newsletter, formulaires)</li>
              <li>L&apos;exécution d&apos;un contrat (achat carte BDE)</li>
              <li>Notre intérêt légitime à améliorer nos services</li>
            </ul>

            <h2>5. Durée de conservation</h2>
            <p>Vos données sont conservées :</p>
            <ul>
              <li>Newsletter : jusqu&apos;à votre désinscription</li>
              <li>Carte BDE : pendant la durée de validité + 1 an pour les obligations légales</li>
              <li>Formulaires de contact : 3 ans maximum</li>
            </ul>

            <h2>6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li>
                <strong>Droit d&apos;accès :</strong> vous pouvez demander une copie de vos données
              </li>
              <li>
                <strong>Droit de rectification :</strong> vous pouvez demander la correction de vos
                données
              </li>
              <li>
                <strong>Droit à l&apos;effacement :</strong> vous pouvez demander la suppression de
                vos données
              </li>
              <li>
                <strong>Droit d&apos;opposition :</strong> vous pouvez vous opposer au traitement
                de vos données
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> vous pouvez récupérer vos données dans un
                format structuré
              </li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : {settings.email}
              <br />
              Nous nous engageons à répondre sous 1 mois maximum.
            </p>

            <h2>7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées
              pour protéger vos données contre la perte, l&apos;utilisation abusive, l&apos;accès
              non autorisé, la divulgation, l&apos;altération ou la destruction.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies publicitaires ou de tracking. Seuls des cookies
              techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.
            </p>

            <h2>9. Partage des données</h2>
            <p>
              Vos données personnelles ne sont jamais vendues, louées ou échangées. Elles peuvent
              être partagées uniquement avec :
            </p>
            <ul>
              <li>Les prestataires techniques nécessaires au fonctionnement du site (hébergeur)</li>
              <li>Les autorités légales sur réquisition judiciaire</li>
            </ul>

            <h2>10. Modifications</h2>
            <p>
              Cette politique de confidentialité peut être modifiée à tout moment. La version en
              vigueur est celle publiée sur cette page.
            </p>
            <p>
              <em>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</em>
            </p>

            <h2>11. Contact et réclamation</h2>
            <p>
              Pour toute question relative à cette politique ou à vos données personnelles :
              <br />
              Email : {settings.email}
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des
              Libertés) :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                www.cnil.fr
              </a>
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

