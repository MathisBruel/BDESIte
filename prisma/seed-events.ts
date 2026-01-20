import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface EventData {
  slug: string;
  title: string;
  date: string;
  endDate?: string;
  place: string;
  cover?: string;
  tags: string[];
  description: string;
  published: boolean;
  photosUrl?: string;
  ticketUrl?: string;
}

async function main() {
  console.log("📅 Seeding events...");

  const eventsPath = path.join(process.cwd(), "data", "events.json");
  
  if (!fs.existsSync(eventsPath)) {
    console.log("⚠️ events.json not found, skipping events seed");
    return;
  }

  const eventsData: EventData[] = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));

  for (const event of eventsData) {
    const existing = await prisma.event.findUnique({
      where: { slug: event.slug },
    });

    if (existing) {
      console.log(`🔄 Updating event "${event.title}"...`);
      await prisma.event.update({
        where: { slug: event.slug },
        data: {
          title: event.title,
          date: new Date(event.date),
          endDate: event.endDate ? new Date(event.endDate) : null,
          place: event.place,
          cover: event.cover || null,
          tags: event.tags,
          description: event.description,
          published: event.published,
          photosUrl: event.photosUrl || null,
          ticketUrl: event.ticketUrl || null,
        },
      });
      console.log(`✅ Updated event: ${event.title}`);
    } else {
      await prisma.event.create({
        data: {
          slug: event.slug,
          title: event.title,
          date: new Date(event.date),
          endDate: event.endDate ? new Date(event.endDate) : null,
          place: event.place,
          cover: event.cover || null,
          tags: event.tags,
          description: event.description,
          published: event.published,
          photosUrl: event.photosUrl || null,
          ticketUrl: event.ticketUrl || null,
        },
      });
      console.log(`✅ Created event: ${event.title}`);
    }
  }

  console.log("🎉 Events seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
