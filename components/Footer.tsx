import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { getSettings, getTexts } from "@/lib/data";
import { formatText } from "@/lib/utils";
import { Badge } from "./Badge";

export function Footer() {
  const settings = getSettings();
  const texts = getTexts();

  return (
    <footer className="bg-brand-black text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/images/assets/Logo couleur (2).png"
              alt={texts.home.brandAlt}
              width={120}
              height={120}
              className="mb-4 brightness-80"
            />
            <h3 className="text-xl font-bold font-spartan text-brand-yellow mb-2">
              {settings.association}
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              {texts.footer.schoolLine}
            </p>
            <Badge variant="yellow" className="mt-3">
              {texts.footer.associationTypeBadge}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold font-spartan mb-4">{texts.footer.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brand-yellow transition-colors">
                  {texts.footer.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/#evenements"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                >
                  {texts.footer.nav.events}
                </Link>
              </li>
              <li>
                <Link
                  href="/partenaires"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                >
                  {texts.footer.nav.partners}
                </Link>
              </li>
              <li>
                <Link
                  href="/#equipe"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                >
                  {texts.footer.nav.team}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-spartan mb-4">{texts.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-brand-yellow transition-colors"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-brand-yellow transition-colors">
                  {texts.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-spartan mb-4">{texts.footer.social}</h4>
            <div className="flex space-x-4">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {settings.discord && (
                <a
                  href={settings.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                  aria-label="Discord"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              )}
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-brand-yellow transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>{formatText(texts.footer.legal.copyright, { year: new Date().getFullYear(), association: settings.association })}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-brand-yellow transition-colors">
              {texts.footer.legal.mentions}
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-brand-yellow transition-colors"
            >
              {texts.footer.legal.privacy}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

