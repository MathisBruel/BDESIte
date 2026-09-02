import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { getSettings, getTexts } from "@/lib/data";
import { formatText } from "@/lib/utils";

export async function Footer() {
  const settings = await getSettings();
  const texts = await getTexts();

  const year = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date());

  return (
    <footer className="bg-brand-noir text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Colonne 1 — identité */}
          <div>
            <Image
              src="/images/assets/Logo simple couleur.png"
              alt={texts.home.brandAlt}
              width={40}
              height={40}
              className="mb-4"
            />
            <div className="font-spartan font-black text-xl text-white mb-1">
              {texts.header.brand}
            </div>
            <div className="font-dancing text-brand-or text-base mb-3">
              {settings.year}
            </div>
            <p className="font-lato text-xs text-white/40 leading-relaxed max-w-xs">
              {texts.footer.schoolLine}
            </p>
          </div>

          {/* Colonne 2 — navigation */}
          <div>
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-5">
              {texts.footer.navigation}
            </div>
            <ul className="space-y-3">
              {[
                { label: texts.footer.nav.home, href: "/" },
                { label: texts.footer.nav.events, href: "/#evenements" },
                { label: texts.footer.nav.partners, href: "/partenaires" },
                { label: texts.footer.nav.team, href: "/#equipe" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-lato text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — contact + réseaux */}
          <div>
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-5">
              {texts.footer.contact}
            </div>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 font-lato text-sm text-white/55 hover:text-white transition-colors mb-4"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {settings.email}
            </a>

            <div className="font-spartan font-black text-xs uppercase tracking-widest text-white/35 mb-4 mt-6">
              {texts.footer.social}
            </div>
            <div className="flex gap-4">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/40 hover:text-brand-or transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.discord && (
                <a
                  href={settings.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="text-white/40 hover:text-brand-or transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

        </div>

        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-lato text-xs text-white/30">
            {formatText(texts.footer.legal.copyright, {
              year,
              association: settings.association,
            })}
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="font-lato text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {texts.footer.legal.mentions}
            </Link>
            <Link
              href="/politique-confidentialite"
              className="font-lato text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {texts.footer.legal.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
