"use client";

import { HomeHero } from "@/components/features/home/HomeHero";
import { HomePresentation } from "@/components/features/home/HomePresentation";
import { HomeEvents } from "@/components/features/home/HomeEvents";
import { HomeCardSection } from "@/components/features/home/HomeCardSection";
import { HomeTeam } from "@/components/features/home/HomeTeam";
import { HomeContact } from "@/components/features/home/HomeContact";

interface HomePageContentProps {
    upcomingEvents: any[];
    pastEvents: any[];
    settings: any;
    team: any[];
    partnersCount: number;
    texts: any;
}

export function HomePageContent({
    upcomingEvents,
    pastEvents,
    settings,
    team,
    partnersCount,
    texts,
}: HomePageContentProps) {
    return (
        <main>
            <HomeHero texts={texts} settings={settings} partnersCount={partnersCount} />
            <HomePresentation texts={texts} />
            <HomeEvents upcomingEvents={upcomingEvents} pastEvents={pastEvents} texts={texts} />
            <HomeCardSection texts={texts} settings={settings} partnersCount={partnersCount} />
            <HomeTeam texts={texts} settings={settings} team={team} />
            <HomeContact texts={texts} settings={settings} />
        </main>
    );
}
