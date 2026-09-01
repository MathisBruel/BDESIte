"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { animateScrollToY } from "@/lib/utils";
import { SCROLL_OFFSET } from "@/lib/constants";
import { Texts } from "@/lib/schemas";

interface HeaderProps {
  texts: Texts;
}

export function Header({ texts }: HeaderProps) {
  const navigation = [
    { name: texts.header.nav.events, href: "/#evenements", scroll: "evenements" },
    { name: texts.header.nav.stock, href: "/confiserie" },
    { name: texts.header.nav.partners, href: "/partenaires" },
    { name: texts.header.nav.card, href: "/carte-bde" },
    { name: texts.header.nav.team, href: "/#equipe", scroll: "equipe" },
    { name: texts.header.nav.contact, href: "/#contact", scroll: "contact" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleScroll = (e: React.MouseEvent, scrollTo: string, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(href);
      setTimeout(() => {
        if (scrollTo === "top") {
          void animateScrollToY(0, 600);
        } else {
          const el = document.getElementById(scrollTo);
          if (el) void animateScrollToY(el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET, 600);
        }
      }, 100);
    } else {
      if (scrollTo === "top") {
        void animateScrollToY(0, 600);
      } else {
        const el = document.getElementById(scrollTo);
        if (el) void animateScrollToY(el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET, 600);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-brand-noir transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={(e) => handleScroll(e, "top", "/")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
          >
            <Image
              src="/images/assets/Logo couleur blanc.png"
              alt={texts.home.brandAlt}
              width={36}
              height={36}
              className="group-hover:scale-110 transition-transform"
              priority
            />
            <span className="font-spartan font-black text-lg text-white group-hover:text-brand-or transition-colors tracking-wide">
              {texts.header.brand}
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-7">
            {navigation.map((item) =>
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll!, item.href)}
                  className="font-spartan font-bold text-xs uppercase tracking-widest text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-spartan font-bold text-xs uppercase tracking-widest text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                >
                  {item.name}
                </Link>
              )
            )}
            <a
              href="https://boutique.suprennes.me"
              className="ml-2 px-5 py-2 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
            >
              Boutique
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-white/65 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{texts.home.accessibility?.menu ?? "Menu"}</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-noir border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) =>
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll!, item.href)}
                  className="block w-full text-left py-2.5 px-3 font-spartan font-bold text-xs uppercase tracking-widest text-white/65 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 font-spartan font-bold text-xs uppercase tracking-widest text-white/65 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-2">
              <a
                href="https://boutique.suprennes.me"
                className="block w-full text-center py-3 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors"
              >
                Boutique
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
