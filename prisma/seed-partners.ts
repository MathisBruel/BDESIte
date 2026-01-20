import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface PartnerData {
  id: string;
  name: string;
  category: string;
  city: string;
  logo?: string;
  advantages: string[];
  conditions?: string;
  website?: string;
  address?: string;
  active: boolean;
}

async function main() {
  console.log("🤝 Seeding partners...");

  const partnersPath = path.join(process.cwd(), "data", "partners.json");
  
  if (!fs.existsSync(partnersPath)) {
    console.log("⚠️ partners.json not found, skipping partners seed");
    return;
  }

  const partnersData: PartnerData[] = JSON.parse(fs.readFileSync(partnersPath, "utf-8"));

  for (const partner of partnersData) {
    const existing = await prisma.partner.findFirst({
      where: { name: partner.name },
    });

    if (existing) {
      console.log(`🔄 Updating partner "${partner.name}"...`);
      await prisma.partner.update({
        where: { id: existing.id },
        data: {
          name: partner.name,
          category: partner.category,
          city: partner.city,
          logo: partner.logo || null,
          advantages: partner.advantages,
          conditions: partner.conditions || null,
          website: partner.website || null,
          address: partner.address || null,
          active: partner.active,
        },
      });
      console.log(`✅ Updated partner: ${partner.name}`);
    } else {
      await prisma.partner.create({
        data: {
          name: partner.name,
          category: partner.category,
          city: partner.city,
          logo: partner.logo || null,
          advantages: partner.advantages,
          conditions: partner.conditions || null,
          website: partner.website || null,
          address: partner.address || null,
          active: partner.active,
        },
      });
      console.log(`✅ Created partner: ${partner.name}`);
    }
  }

  console.log("🎉 Partners seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
