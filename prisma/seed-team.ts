import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface TeamMemberData {
  name: string;
  role: string;
  photo: string;
  photoPosition?: string;
  links?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

async function main() {
  console.log("👥 Seeding team members...");

  const teamPath = path.join(process.cwd(), "data", "team.json");
  
  if (!fs.existsSync(teamPath)) {
    console.log("⚠️ team.json not found, skipping team seed");
    return;
  }

  const teamData: TeamMemberData[] = JSON.parse(fs.readFileSync(teamPath, "utf-8"));

  for (const member of teamData) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });

    if (existing) {
      console.log(`⏭️ Team member "${member.name}" already exists, skipping`);
      continue;
    }

    await prisma.teamMember.create({
      data: {
        name: member.name,
        role: member.role,
        photo: member.photo,
        photoPosition: member.photoPosition || "center",
        linkedin: member.links?.linkedin || null,
        instagram: member.links?.instagram || null,
        email: member.links?.email || null,
      },
    });

    console.log(`✅ Created team member: ${member.name}`);
  }

  console.log("🎉 Team seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
