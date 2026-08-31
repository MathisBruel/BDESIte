"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/features/EventCard";
import { ChevronDown } from "lucide-react";

const PAGE_SIZE = 6;

interface Year {
  id: string;
  label: string;
  isCurrent: boolean;
}

interface HomeEventsProps {
  allEvents: any[];
  years: Year[];
  currentYearId: string | null;
  texts: any;
}

export function HomeEvents({ allEvents, years, currentYearId, texts }: HomeEventsProps) {
  const [activeYearId, setActiveYearId] = useState<string>(currentYearId || "");
  const [upcomingShown, setUpcomingShown] = useState(PAGE_SIZE);
  const [pastShown, setPastShown] = useState(PAGE_SIZE);

  const now = useMemo(() => new Date(), []);

  const { upcoming, past } = useMemo(() => {
    const filtered = activeYearId
      ? allEvents.filter((e) => e.academicYearId === activeYearId)
      : allEvents;

    return {
      upcoming: filtered
        .filter((e) => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      past: filtered
        .filter((e) => new Date(e.date) < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    };
  }, [allEvents, activeYearId, now]);

  const changeYear = (yearId: string) => {
    setActiveYearId(yearId);
    setUpcomingShown(PAGE_SIZE);
    setPastShown(PAGE_SIZE);
  };

  if (years.length === 0 && allEvents.length === 0) return null;

  return (
    <section id="evenements" className="bg-brand-craie">
      <Container>
        <div className="py-20">

          {/* Header */}
          <div className="mb-8">
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
              {texts?.home?.upcoming?.subtitle ?? "Au programme"}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="font-spartan font-black text-display-md text-brand-noir leading-none">
                Nos événements
              </h2>

              {/* Tabs années — toutes les années */}
              {years.length > 1 && (
                <div className="flex flex-wrap gap-2 shrink-0">
                  {years.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => changeYear(year.id)}
                      className={`px-3 py-1 text-xs font-spartan font-bold uppercase tracking-widest border transition-colors ${
                        activeYearId === year.id
                          ? "bg-brand-noir text-white border-brand-noir"
                          : "text-brand-noir/50 border-brand-noir/20 hover:border-brand-noir hover:text-brand-noir"
                      }`}
                    >
                      {year.label}
                      {year.isCurrent && <span className="ml-1 opacity-60">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {upcoming.length === 0 && past.length === 0 && (
            <p className="font-lato text-sm text-brand-noir/40 text-center py-16">
              Aucun événement pour cette année.
            </p>
          )}

          {/* À venir */}
          {upcoming.length > 0 && (
            <div className="mb-20">
              <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-8">
                {texts?.home?.upcoming?.title ?? "À venir"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcoming.slice(0, upcomingShown).map((event) => (
                  <EventCard key={event.slug} event={event} texts={texts} past={false} />
                ))}
              </div>
              {upcoming.length > upcomingShown && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setUpcomingShown((s) => s + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/50 hover:text-brand-rouge transition-colors border-b border-brand-noir/20 hover:border-brand-rouge pb-1"
                  >
                    Voir plus <ChevronDown className="w-3 h-3" />
                    <span className="opacity-60">({upcoming.length - upcomingShown})</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Passés */}
          {past.length > 0 && (
            <div>
              <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-8">
                {texts?.home?.past?.title ?? "Passés"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {past.slice(0, pastShown).map((event) => (
                  <EventCard key={event.slug} event={event} texts={texts} past={true} />
                ))}
              </div>
              {past.length > pastShown && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setPastShown((s) => s + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/50 hover:text-brand-rouge transition-colors border-b border-brand-noir/20 hover:border-brand-rouge pb-1"
                  >
                    Voir plus <ChevronDown className="w-3 h-3" />
                    <span className="opacity-60">({past.length - pastShown})</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
