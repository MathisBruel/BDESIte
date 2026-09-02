import { HomeHero } from "@/components/features/home/HomeHero";
import { HomePresentation } from "@/components/features/home/HomePresentation";
import { HomeEvents } from "@/components/features/home/HomeEvents";
import { HomeCardSection } from "@/components/features/home/HomeCardSection";
import { HomeTeam } from "@/components/features/home/HomeTeam";
import { HomeContact } from "@/components/features/home/HomeContact";

interface YearTeam {
  id: string;
  label: string;
  isCurrent: boolean;
  teamBackgroundImage: string | null;
  memberships: any[];
}

interface HomePageContentProps {
  allEvents: any[];
  years: any[];
  yearTeams: YearTeam[];
  currentYearId: string | null;
  settings: any;
  partnersCount: number;
  texts: any;
  heroPhotos?: { path: string; position: string }[];
}

export function HomePageContent({
  allEvents,
  years,
  yearTeams,
  currentYearId,
  settings,
  partnersCount,
  texts,
  heroPhotos = [],
}: HomePageContentProps) {
  const totalMembers = yearTeams.find((y) => y.id === currentYearId)?.memberships.length
    ?? yearTeams[0]?.memberships.length
    ?? 0;

  return (
    <main>
      <HomeHero texts={texts} settings={settings} partnersCount={partnersCount} heroPhotos={heroPhotos} />
      <HomePresentation
        texts={texts}
        membersCount={totalMembers}
        eventsCount={allEvents.length}
        partnersCount={partnersCount}
      />
      <HomeEvents
        allEvents={allEvents}
        years={years}
        currentYearId={currentYearId}
        texts={texts}
      />
      <HomeCardSection texts={texts} settings={settings} partnersCount={partnersCount} />
      <HomeTeam
        texts={texts}
        settings={settings}
        yearTeams={yearTeams}
        currentYearId={currentYearId}
      />
      <HomeContact texts={texts} settings={settings} />
    </main>
  );
}
