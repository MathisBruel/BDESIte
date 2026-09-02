import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSettings, getTexts } from "@/lib/data";
import { formatText } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";

export async function Footer() {
  const settings = await getSettings();
  const texts = await getTexts();

  return (
    <footer className="bg-brand-noir text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <Image
                src={getImageUrl("assets/Logo simple couleur.png")}
                alt={texts.home.brandAlt}
                width={52}
                height={52}
                className="group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-spartan font-black text-xl text-white leading-none tracking-tight group-hover:text-brand-or transition-colors">
                  SUP&apos;RNOVA
                </div>
                <div className="font-dancing text-brand-or text-base mt-0.5">
                  édition {settings.year}
                </div>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs font-lato">
              {texts.footer.schoolLine}
            </p>
            <div className="mt-5 inline-block border border-brand-or/30 px-3 py-1 text-xs font-spartan font-bold text-brand-or uppercase tracking-widest">
              {texts.footer.associationTypeBadge}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-spartan font-bold text-xs uppercase tracking-widest text-white/35 mb-6">
              {texts.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {[
                { label: texts.footer.nav.home, href: "/" },
                { label: texts.footer.nav.events, href: "/#evenements" },
                { label: texts.footer.nav.partners, href: "/partenaires" },
                { label: texts.footer.nav.team, href: "/#equipe" },
                { label: texts.header.ctaBuyCard, href: "/carte-bde" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-lato text-white/55 hover:text-brand-or transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Réseaux */}
          <div>
            <h3 className="font-spartan font-bold text-xs uppercase tracking-widest text-white/35 mb-6">
              {texts.footer.contact}
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-sm font-lato text-white/55 hover:text-brand-or transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {settings.email}
                </a>
              </li>
            </ul>

            <h3 className="font-spartan font-bold text-xs uppercase tracking-widest text-white/35 mb-4">
              {texts.footer.social}
            </h3>
            <div className="flex gap-3">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 border border-white/15 text-white/55 hover:text-brand-or hover:border-brand-or transition-colors"
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
                  className="p-2.5 border border-white/15 text-white/55 hover:text-brand-or hover:border-brand-or transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-lato text-white/35">
          <p>
            {formatText(texts.footer.legal.copyright, {
              year: settings.year,
              association: "BDE SUP'RNOVA",
            })}
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-brand-or transition-colors">
              {texts.footer.legal.mentions}
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-brand-or transition-colors">
              {texts.footer.legal.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
