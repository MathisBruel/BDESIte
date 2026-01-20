import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeClient } from "@/components/HomeClient";
import { getUpcomingEvents, getPastEvents, getSettings, getTeamMembers, getActivePartners, getTexts } from "@/lib/data";

// This is correct because getTeamMembers now returns objects compatible with the UI expectations
// and getTexts returns the Texts object.

export default async function HomePage() {
  const allUpcomingEvents = await getUpcomingEvents();
  const allPastEvents = await getPastEvents();
  const settings = await getSettings();
  const team = await getTeamMembers();
  const partnersCount = (await getActivePartners()).length;
  const texts = await getTexts();

  // Pre-slice for initial render (SSR optimization, though HomeClient re-slices)
  const upcomingEvents = allUpcomingEvents.slice(0, 6);
  const pastEvents = allPastEvents.slice(0, 3);

  return (
    <>
      <Header texts={texts} />
      <HomeClient
        allUpcomingEvents={allUpcomingEvents as any}
        upcomingEvents={upcomingEvents as any}
        allPastEvents={allPastEvents as any}
        pastEvents={pastEvents as any}
        settings={settings}
        team={team as any}
        partnersCount={partnersCount}
        texts={texts}
      />
      <Footer />
    </>
  );
}
