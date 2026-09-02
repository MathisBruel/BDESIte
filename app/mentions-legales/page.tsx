import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings, getTexts } from "@/lib/data";

export const metadata = {
  title: "Mentions légales | BDE SUP'RNOVA",
  description: "Mentions légales du site du BDE SUP'RNOVA.",
};

export default async function LegalPage() {
  const settings = await getSettings();
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>
        <section className="bg-brand-noir py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-spartan font-black text-display-md text-white leading-none">
              Mentions légales
            </h1>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-headings:font-spartan prose-headings:font-black prose-a:text-brand-rouge">
            <h2>1. Éditeur du site</h2>
            <div className="not-prose grid gap-3 sm:grid-cols-2 mb-8">
              {[
                ["Nom", "Sup'Rennes (loi 1901)"],
                ["Nom d'usage", "SUP'RNOVA"],
                ["Siège social", "21 rue du Bignon, 35135 Chantepie, France"],
                ["SIRET", "938 236 031 00010"],
                ["RNA", "W353022801"],
                ["RCS", "Rennes"],
                ["TVA intracommunautaire", "Non applicable"],
                ["Email", settings.email],
                ["Téléphone", "07 68 36 32 22"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-sm text-brand-noir/45 font-lato">{label}</div>
                  <div className="font-medium font-lato text-brand-noir">{value}</div>
                </div>
              ))}
            </div>

            <hr />

            <h2>2. Direction de la publication</h2>
            <div className="not-prose grid gap-3 sm:grid-cols-2 mb-8">
              <div>
                <div className="text-sm text-brand-noir/45 font-lato">Directeur de la publication</div>
                <div className="font-medium font-lato">Mathis BRUEL, Président</div>
              </div>
              <div>
                <div className="text-sm text-brand-noir/45 font-lato">Contact</div>
                <div className="font-medium font-lato">mathis.bruel@suprennes.me · 07 68 36 32 22</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm text-brand-noir/45 font-lato">Co-direction</div>
                <div className="font-medium font-lato">Solenn COULON, Trésorière — solenn.coulon@suprennes.me</div>
              </div>
            </div>

            <hr />

            <h2>3. Hébergement du site</h2>
            <div className="not-prose grid gap-3 sm:grid-cols-2 mb-8">
              {[
                ["Hébergeur", "Mathis BRUEL"],
                ["Adresse", "16 rue des Boulines, 17540 Angliers, France"],
                ["Localisation du serveur", "France"],
                ["Registrar", "Namecheap"],
                ["CDN / proxy", "Aucun"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-sm text-brand-noir/45 font-lato">{label}</div>
                  <div className="font-medium font-lato">{value}</div>
                </div>
              ))}
            </div>

            <hr />

            <h2>4. Conception et développement</h2>
            <ul>
              <li>Conception, développement et maintenance : BDE Sup'Rennes</li>
              <li>Crédits graphiques : BDE Sup'Rennes — Tous droits réservés</li>
              <li>Conditions de reproduction : réutilisation uniquement autorisée par nos partenaires</li>
            </ul>
            <p><strong>Dernière mise à jour :</strong> 15/10/2025</p>

            <hr />

            <h2>5. Conditions d'utilisation</h2>
            <p>Présentation de l'association, de ses membres, événements, partenaires et avantages liés à la carte BDE. Redirections possibles vers des services externes.</p>
            <ul>
              <li>Public visé : étudiants de Sup de Vinci Rennes.</li>
              <li>Aucun contenu utilisateur hébergé.</li>
              <li>Liens externes sans engagement de responsabilité.</li>
              <li>Loi applicable : droit français. Juridiction : Tribunal judiciaire de Rennes.</li>
            </ul>

            <hr />

            <h2>6. Contact et signalement</h2>
            <ul>
              <li>Email : <a href={`mailto:${settings.email}`}>{settings.email}</a></li>
              <li>Délai de traitement : sous 30 jours ouvrés</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
