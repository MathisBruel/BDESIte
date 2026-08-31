/**
 * Backfill : crée l'AcademicYear "2025-2026" et y rattache
 * tous les événements + membres existants.
 *
 * Usage : npx tsx scripts/backfill-academic-year.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🐻 Backfill AcademicYear 2025-2026...");

  // 1. Crée l'année académique courante
  const year = await prisma.academicYear.upsert({
    where: { slug: "2025-2026" },
    update: {},
    create: {
      label: "2025-2026",
      slug: "2025-2026",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2026-08-31"),
      isCurrent: true,
    },
  });
  console.log(`✓ AcademicYear créée : ${year.label} (id: ${year.id})`);

  // 2. Rattache tous les événements sans année
  const eventsUpdated = await prisma.event.updateMany({
    where: { academicYearId: null },
    data: { academicYearId: year.id },
  });
  console.log(`✓ ${eventsUpdated.count} événement(s) rattaché(s) à ${year.label}`);

  // 3. Crée une TeamMembership pour chaque membre existant
  const members = await prisma.teamMember.findMany();
  let membershipsCreated = 0;

  for (const member of members) {
    await prisma.teamMembership.upsert({
      where: {
        teamMemberId_academicYearId: {
          teamMemberId: member.id,
          academicYearId: year.id,
        },
      },
      update: {},
      create: {
        teamMemberId: member.id,
        academicYearId: year.id,
        role: member.role,
        order: 0,
      },
    });
    membershipsCreated++;
  }

  console.log(`✓ ${membershipsCreated} TeamMembership(s) créée(s) pour ${year.label}`);
  console.log("✅ Backfill terminé.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur backfill:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
