import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getTexts } from "@/lib/data";

export const metadata = {
  title: "Mentions légales | BDE Sup'RNova",
  description: "Mentions légales du site du BDE Sup'RNova.",
};

export default async function LegalPage() {
  const settings = await getSettings();
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>
        <Hero title="Mentions légales" showCtas={false} />

        <Section>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Éditeur du site</h2>
            <div className="not-prose p-0">
              <h3 className="mt-0 mb-4 text-xl font-semibold">Association</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-neutral-500">Nom</div>
                  <div className="font-medium">Sup&apos;Rennes (loi 1901)</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Nom d&apos;usage</div>
                  <div className="font-medium">Sup&apos;RNova</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-sm text-neutral-500">Siège social</div>
                  <div className="font-medium">21 rue du Bignon, 35135 Chantepie, France</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">SIRET</div>
                  <div className="font-medium">938 236 031 00010</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">RNA</div>
                  <div className="font-medium">W353022801</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">RCS</div>
                  <div className="font-medium">Rennes</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">TVA intracommunautaire</div>
                  <div className="font-medium">Non applicable</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Email</div>
                  <div className="font-medium"><a href={`mailto:${settings.email}`}>{settings.email}</a></div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Téléphone</div>
                  <div className="font-medium">07 68 36 32 22</div>
                </div>
              </div>
            </div>

            <hr className="my-8" />

            <h2>2. Direction de la publication</h2>
            <div className="not-prose p-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-neutral-500">Directeur de la publication</div>
                  <div className="font-medium">Mathis BRUEL, Président</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Contact</div>
                  <div className="font-medium"><a href="mailto:mathis.bruel@suprennes.me">mathis.bruel@suprennes.me</a> · 07 68 36 32 22</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-sm text-neutral-500">Co-direction</div>
                  <div className="font-medium">Solenn COULON, Trésorière — <a href="mailto:solenn.coulon@suprennes.me">solenn.coulon@suprennes.me</a></div>
                </div>
              </div>
            </div>

            <hr className="my-8" />

            <h2>3. Hébergement du site</h2>
            <div className="not-prose p-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-neutral-500">Hébergeur</div>
                  <div className="font-medium">Mathis BRUEL</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Adresse</div>
                  <div className="font-medium">16 rue des Boulines, 17540 Angliers, France</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Localisation du serveur</div>
                  <div className="font-medium">France</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Registrar</div>
                  <div className="font-medium">Namecheap (DNS gérés chez le registrar)</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">CDN / proxy</div>
                  <div className="font-medium">Aucun</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Fournisseur d&apos;accès</div>
                  <div className="font-medium">Non applicable</div>
                </div>
              </div>
            </div>

            <hr className="my-8" />

            <h2>4. Conception, développement et maintenance</h2>
            <ul>
              <li>Conception, développement et maintenance : BDE Sup&apos;Rennes</li>
              <li>Webmaster : BDE Sup&apos;Rennes</li>
              <li>Crédits graphiques : BDE Sup&apos;Rennes — Tous droits réservés</li>
              <li>Crédits photos/illustrations : BDE Sup&apos;Rennes ou libres de droits</li>
              <li>Titulaire des droits : BDE Sup&apos;Rennes</li>
              <li>Conditions de reproduction : Tous droits réservés. Réutilisation uniquement autorisée par nos partenaires.</li>
            </ul>
            <p><strong>Date de dernière mise à jour :</strong> 15/10/2025</p>

            <hr className="my-8" />

            <h2>5. Conditions d&apos;utilisation</h2>
            <h3>Objet</h3>
            <p>
              Présentation de l&apos;association, de ses membres, événements, partenaires et avantages
              liés à la carte BDE. Redirections possibles vers des services externes (boutique).
            </p>
            <h3>Public visé</h3>
            <p>Étudiants de Sup de Vinci Rennes et toute personne intéressée par les activités du BDE.</p>
            <h3>Responsabilité et disponibilité</h3>
            <ul>
              <li>Aucun contenu utilisateur hébergé.</li>
              <li>Liens externes sans engagement de responsabilité.</li>
              <li>Disponibilité assurée au mieux, sans garantie d&apos;accessibilité continue.</li>
            </ul>
            <h3>Cadre juridique</h3>
            <dl>
              <dt>Loi applicable</dt>
              <dd>Droit français</dd>
              <dt>Juridiction compétente</dt>
              <dd>Tribunal judiciaire de Rennes</dd>
            </dl>

            <hr className="my-8" />

            <h2>6. Contact et signalement</h2>
            <ul>
              <li>Email de contact général : <a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              <li>Signalement de contenu illicite : <a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              <li>Délai de traitement : sous 30 jours ouvrés</li>
            </ul>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}


