import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface SettingsData {
  association: string;
  year: string;
  email: string;
  shopUrl?: string;
  instagram?: string;
  discord?: string;
}

async function main() {
  console.log("⚙️ Seeding settings...");

  const settingsPath = path.join(process.cwd(), "data", "settings.json");
  
  if (!fs.existsSync(settingsPath)) {
    console.log("⚠️ settings.json not found, skipping settings seed");
    return;
  }

  const settingsData: SettingsData = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

  const existing = await prisma.settings.findUnique({
    where: { id: 1 },
  });

  if (existing) {
    console.log("⏭️ Settings already exist, updating...");
    await prisma.settings.update({
      where: { id: 1 },
      data: {
        association: settingsData.association,
        year: settingsData.year,
        email: settingsData.email,
        shopUrl: settingsData.shopUrl || null,
        instagram: settingsData.instagram || null,
        discord: settingsData.discord || null,
      },
    });
  } else {
    await prisma.settings.create({
      data: {
        id: 1,
        association: settingsData.association,
        year: settingsData.year,
        email: settingsData.email,
        shopUrl: settingsData.shopUrl || null,
        instagram: settingsData.instagram || null,
        discord: settingsData.discord || null,
      },
    });
  }

  console.log("✅ Settings seeded!");
  console.log("🎉 Settings seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
