"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

interface HomePresentationProps {
  texts: any;
  membersCount?: number;
  eventsCount?: number;
  partnersCount?: number;
}

export function HomePresentation({ texts }: HomePresentationProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pillars = [
    {
      num: "01",
      title: texts.home.presentation.convivialityTitle,
      text: texts.home.presentation.convivialityText,
    },
    {
      num: "02",
      title: texts.home.presentation.eventsTitle,
      text: texts.home.presentation.eventsText,
    },
    {
      num: "03",
      title: texts.home.presentation.engagementTitle,
      text: texts.home.presentation.engagementText,
    },
  ];

  return (
    <section id="presentation" className="bg-brand-noir overflow-hidden">
      <Container>
        <div ref={ref} className="py-12 divide-y divide-white/6">
          {pillars.map(({ num, title, text }, i) => (
            <div
              key={num}
              className="relative overflow-hidden grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_1fr_auto] items-start gap-x-8 sm:gap-x-12 py-10 pl-5 border-l-2 border-brand-rouge transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              {/* Numéro en or — font mono pour largeur uniforme */}
              <span
                className="text-brand-or tracking-widest mt-2 shrink-0"
                style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: "0.7rem", width: "2.5rem", display: "block" }}
              >
                {num}
              </span>

              {/* Mot-clé rouge vif sur noir */}
              <div>
                <h3
                  className="font-spartan font-black uppercase text-brand-rouge leading-[0.85] mb-3"
                  style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
                >
                  {title}
                </h3>
                <p className="sm:hidden font-lato text-sm text-white/45 leading-relaxed max-w-sm">
                  {text}
                </p>
              </div>

              {/* Desktop : description à droite */}
              <p className="hidden sm:block font-lato text-sm text-white/45 leading-relaxed max-w-xs self-end pb-1">
                {text}
              </p>

              {/* Ghost number fond */}
              <span
                aria-hidden
                className="absolute right-0 top-1/2 -translate-y-1/2 font-spartan font-black text-brand-rouge/5 select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(6rem, 16vw, 13rem)" }}
              >
                {num}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
