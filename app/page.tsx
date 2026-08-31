import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePageContent } from "@/components/features/home/HomePageContent";
import { getSettings, getActivePartners, getTexts } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [allEvents, yearTeams, settings, partnersCount, texts] = await Promise.all([
    prisma.event.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    }),
    prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: {
        memberships: {
          orderBy: { order: "asc" },
          include: { teamMember: true },
        },
      },
    }),
    getSettings(),
    getActivePartners().then((p) => p.length),
    getTexts(),
  ]);

  const currentYear = yearTeams.find((y) => y.isCurrent) ?? null;
  const years = yearTeams.map(({ id, label, isCurrent }) => ({ id, label, isCurrent }));

  return (
    <>
      <Header texts={texts} />
      <HomePageContent
        allEvents={allEvents as any[]}
        years={years}
        yearTeams={yearTeams as any}
        currentYearId={currentYear?.id ?? null}
        settings={settings}
        partnersCount={partnersCount}
        texts={texts}
      />
      <Footer />
    </>
  );
}
