import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { Partner } from './schemas'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
  pool: Pool
}

// Create a connection pool
const pool = globalForPrisma.pool || new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/bde_db',
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool
}

// Create the Prisma adapter
const adapter = new PrismaPg(pool)

// Initialize Prisma Client with the adapter
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getPartners() {
  try {
    return await prisma.partner.findMany({
      where: { active: true },
    })
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

export async function getEvents() {
  try {
    return await prisma.event.findMany({
      where: { published: true },
      orderBy: { date: 'asc' },
    })
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    return await prisma.event.findUnique({
      where: { slug },
    })
  } catch (error) {
    console.error(`Failed to fetch event with slug ${slug}:`, error);
    return null;
  }
}

export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' }, // Or any other order preference
    })
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      throw new Error("Settings not found");
    }
    return settings;
  } catch (error) {
    console.warn("Failed to fetch settings, using defaults:", error);
    return {
      id: 1,
      year: "2024-2025",
      shopUrl: "#",
      email: "contact@bde-sup-rnova.fr",
      instagram: "https://instagram.com/bde_suprnova",
      discord: "https://discord.gg/bde",
      linkedin: "https://linkedin.com/company/bde-sup-rnova",
      facebook: "https://facebook.com/bde-sup-rnova",
      association: "BDE Sup'RNova",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function getUpcomingEvents(limit?: number) {
  try {
    return await prisma.event.findMany({
      where: {
        published: true,
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: 'asc' },
      take: limit,
    })
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error);
    return [];
  }
}

export async function getPastEvents() {
  try {
    return await prisma.event.findMany({
      where: {
        published: true,
        date: {
          lt: new Date(),
        },
      },
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    return [];
  }
}

export async function getActivePartners(): Promise<Partner[]> {
  try {
    const partners = await prisma.partner.findMany({
      where: { active: true },
    })
    return partners as Partner[]
  } catch (error) {
    console.error("Failed to fetch active partners:", error);
    return [];
  }
}

import { DEFAULT_TEXTS } from "./constants";

export async function getTexts() {
  return DEFAULT_TEXTS;
}
