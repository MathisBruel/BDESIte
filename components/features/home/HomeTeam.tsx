"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/features/TeamCard";
import { formatText } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";
import { BLUR_DARK } from "@/lib/image-blur";

interface YearTeam {
  id: string;
  label: string;
  isCurrent: boolean;
  teamBackgroundImage: string | null;
  memberships: {
    id: string;
    role: string;
    photo: string | null;
    order: number;
    teamMember: {
      id: string;
      name: string;
      role: string;
      photo: string;
      photoPosition: string | null;
      linkedin: string | null;
      instagram: string | null;
      email: string | null;
    };
  }[];
}

interface HomeTeamProps {
  texts: any;
  settings: any;
  yearTeams: YearTeam[];
  currentYearId: string | null;
}

export function HomeTeam({ texts, settings, yearTeams, currentYearId }: HomeTeamProps) {
  const defaultYearId = currentYearId || yearTeams[0]?.id || "";
  const [activeYearId, setActiveYearId] = useState<string>(defaultYearId);

  const activeYear = useMemo(
    () => yearTeams.find((y) => y.id === activeYearId) || yearTeams[0],
    [yearTeams, activeYearId]
  );

  const team = useMemo(() => {
    if (!activeYear) return [];
    return activeYear.memberships.map((m) => ({
      ...m.teamMember,
      role: m.role || m.teamMember.role,
      photo: m.photo || m.teamMember.photo,
      links: {
        instagram: m.teamMember.instagram,
        linkedin: m.teamMember.linkedin,
        email: m.teamMember.email,
      },
    }));
  }, [activeYear]);

  const yearsWithMembers = yearTeams.filter((y) => y.memberships.length > 0);

  if (yearTeams.length === 0) return null;

  const bgImage = activeYear?.teamBackgroundImage || "team/groupe.jpg";

  return (
    <section id="equipe" className="bg-brand-craie">
      <Container>
        <div className="py-20">

          {/* Header */}
          <div className="mb-10">
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
              {texts?.home?.team?.title ?? "L'équipe"}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="font-spartan font-black text-display-md text-brand-noir leading-none">
                {formatText(texts?.home?.team?.hero ?? "Le BDE {year}", {
                  year: activeYear?.label || settings?.year || "",
                })}
              </h2>

              {/* Tabs années */}
              {yearTeams.length > 1 && (
                <div className="flex flex-wrap gap-2 shrink-0">
                  {yearTeams.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setActiveYearId(year.id)}
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

          {/* Photo de groupe / image de fond */}
          <div className="relative w-full overflow-hidden mb-14" style={{ height: "420px" }}>
            <Image
              src={getImageUrl(bgImage)}
              alt={`Équipe ${activeYear?.label ?? ""}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1000px, 1200px"
              quality={80}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DARK}
              className="object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-craie to-transparent" />
          </div>

          {/* Sous-titre */}
          <div className="mb-8">
            <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/35 mb-2">
              {texts?.home?.team?.meet ?? "Rencontrez-les"}
            </div>
            {texts?.home?.team?.heroSubtitle && (
              <p className="font-lato text-sm text-brand-noir/50 max-w-md">
                {texts.home.team.heroSubtitle}
              </p>
            )}
          </div>

          {/* Grille membres */}
          {team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-noir/8">
              {team.map((member) => (
                <TeamCard key={`${activeYearId}-${member.id}`} member={member as any} />
              ))}
            </div>
          ) : (
            <p className="font-lato text-sm text-brand-noir/40 text-center py-12">
              Aucun membre pour cette année.
            </p>
          )}

        </div>
      </Container>
    </section>
  );
}
