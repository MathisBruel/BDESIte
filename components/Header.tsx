"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { Button } from "./Button";

const navigation = [
  { name: "🏠 Accueil", href: "/", scroll: "top" },
  { name: "🎊 Événements", href: "/#evenements", scroll: "evenements" },
  { name: "🤝 Partenaires", href: "/partenaires" },
  { name: "💎 Carte BDE", href: "/carte-bde" },
  { name: "🌟 L'équipe", href: "/#equipe", scroll: "equipe" },
  { name: "📬 Contact", href: "/#contact", scroll: "contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent, scrollTo: string, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (pathname !== "/") {
      router.push(href);
      setTimeout(() => {
        if (scrollTo === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(scrollTo);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      }, 100);
    } else {
      if (scrollTo === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(scrollTo);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <button
            onClick={(e) => handleScroll(e, "top", "/")}
            className="flex items-center space-x-3 group"
          >
            <Image
              src="/images/assets/Logo simple couleur.png"
              alt="Logo Sup'RNova"
              width={50}
              height={50}
              className="group-hover:scale-110 transition-transform"
            />
            <div className="text-2xl font-bold font-spartan text-brand-red group-hover:text-brand-yellow transition-colors">
              Sup&apos;RNova
            </div>
          </button>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((item) => (
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll, item.href)}
                  className="text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors hover:scale-105 transform"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors hover:scale-105 transform"
                >
                  {item.name}
                </Link>
              )
            ))}
            <Button variant="cta" href="/carte-bde" className="ml-4">
              🛒 Acheter la carte
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-fade-in">
            {navigation.map((item) => (
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll, item.href)}
                  className="block w-full text-left py-3 px-4 text-base font-semibold text-gray-700 hover:text-brand-red hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-base font-semibold text-gray-700 hover:text-brand-red hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Button variant="cta" href="/carte-bde" className="w-full mt-4">
              🛒 Acheter la carte
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}

