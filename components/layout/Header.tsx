"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { animateScrollToY } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SCROLL_OFFSET } from "@/lib/constants";
import { Texts } from "@/lib/schemas";
import { getImageUrl } from "@/lib/image-url";

export function Header({ texts }: { texts: Texts }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navigation = [
    { name: texts.header.nav.home, href: "/", scroll: "top" },
    { name: texts.header.nav.events, href: "/#evenements", scroll: "evenements" },
    { name: texts.header.nav.partners, href: "/partenaires" },
    { name: texts.header.nav.card, href: "/carte-bde" },
    { name: texts.header.nav.team, href: "/#equipe", scroll: "equipe" },
    { name: texts.header.nav.contact, href: "/#contact", scroll: "contact" },
  ];

  const scrollToTarget = (scrollTo: string) => {
    if (scrollTo === "top") {
      void animateScrollToY(0, 600);
    } else {
      const el = document.getElementById(scrollTo);
      if (el) {
        const target = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
        void animateScrollToY(target, 600);
      }
    }
  };

  const handleScroll = (e: React.MouseEvent, scrollTo: string, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(href);
      setTimeout(() => scrollToTarget(scrollTo), 100);
    } else {
      scrollToTarget(scrollTo);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-noir/95 backdrop-blur-sm shadow-lg" : "bg-brand-noir"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo + brand */}
          <button
            onClick={(e) => handleScroll(e, "top", "/")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
          >
            <Image
              src={getImageUrl("assets/Logo simple couleur.png")}
              alt={texts.home.brandAlt}
              width={44}
              height={44}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-spartan font-black text-xl text-white group-hover:text-brand-or transition-colors tracking-tight leading-none">
              SUP&apos;RNOVA
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-7">
            {navigation.map((item) =>
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll!, item.href)}
                  className="text-sm font-lato font-semibold text-white/75 hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-lato font-semibold text-white/75 hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                >
                  {item.name}
                </Link>
              )
            )}
            <Link
              href="/carte-bde"
              className="ml-2 px-5 py-2.5 bg-brand-rouge text-white font-spartan font-bold text-sm uppercase tracking-wide hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
            >
              {texts.header.ctaBuyCard}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-white hover:text-brand-or transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={texts.home.accessibility.menu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 pb-4 pt-3 space-y-1 animate-fade-in">
            {navigation.map((item) =>
              item.scroll ? (
                <button
                  key={item.name}
                  onClick={(e) => handleScroll(e, item.scroll!, item.href)}
                  className="block w-full text-left px-4 py-3 text-base font-lato font-semibold text-white/75 hover:text-brand-or hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-lato font-semibold text-white/75 hover:text-brand-or hover:bg-white/5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="px-4 pt-2">
              <Link
                href="/carte-bde"
                className="block w-full text-center py-3 bg-brand-rouge text-white font-spartan font-bold text-sm uppercase tracking-wide hover:bg-brand-or hover:text-brand-noir transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {texts.header.ctaBuyCard}
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
