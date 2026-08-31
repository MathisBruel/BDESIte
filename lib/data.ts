
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { Partner, Texts, TeamMember } from './schemas';
import { FALLBACK_TEXTS } from "./fallback-texts";

export interface Product {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string | null;
  active: boolean;
  order: number;
}

export async function getProducts(): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch active products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  noStore();
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}

export async function getTeamMemberById(id: string) {
  noStore();
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!member) return null;
    return {
      ...member,
      links: {
        instagram: member.instagram,
        linkedin: member.linkedin,
        email: member.email,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch team member with id ${id}:`, error);
    return null;
  }
}

export async function getPartners() {
  noStore();
  try {
    const partners = await prisma.partner.findMany({
      // Return all partners for admin
    })
    console.log(`[getPartners] Fetched ${partners.length} partners`);
    return partners;
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

export async function getEvents() {
  noStore();
  try {
    const events = await prisma.event.findMany({
      // Return all events for admin
      orderBy: { date: 'asc' },
    })
    console.log(`[getEvents] Fetched ${events.length} events`);
    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  noStore();
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
  noStore();
  try {
    const currentYear = await prisma.academicYear.findFirst({ where: { isCurrent: true } });

    if (currentYear) {
      const memberships = await prisma.teamMembership.findMany({
        where: { academicYearId: currentYear.id },
        orderBy: { order: "asc" },
        include: { teamMember: true },
      });

      if (memberships.length > 0) {
        return memberships.map((m) => ({
          ...m.teamMember,
          role: m.role || m.teamMember.role,
          links: {
            instagram: m.teamMember.instagram,
            linkedin: m.teamMember.linkedin,
            email: m.teamMember.email,
          },
        }));
      }
    }

    const members = await prisma.teamMember.findMany({ orderBy: { createdAt: "asc" } });
    return members.map((member) => ({
      ...member,
      links: {
        instagram: member.instagram,
        linkedin: member.linkedin,
        email: member.email,
      },
    }));
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function getSettings() {
  noStore();
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
      association: "BDE SUP'RNOVA",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function getUpcomingEvents(limit?: number) {
  noStore();
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
  noStore();
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
  noStore();
  try {
    console.log("[getActivePartners] Querying database for active partners...");
    const partners = await prisma.partner.findMany({
      where: { active: true },
    })
    console.log(`[getActivePartners] Found ${partners.length} active partners`);
    return partners as Partner[]
  } catch (error) {
    console.error("[getActivePartners] Failed to fetch active partners:", error);
    return [];
  }
}

function unflattenObject(data: { key: string; value: string }[]): any {
  const result: any = {};
  for (const item of data) {
    const keys = item.key.split('.');
    let current = result;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        try {
          current[key] = JSON.parse(item.value);
        } catch {
          current[key] = item.value;
        }
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    }
  }
  return result;
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

import { unstable_cache } from "next/cache";

export const getTexts = unstable_cache(
  async (): Promise<Texts> => {
    const { FALLBACK_TEXTS } = await import("./fallback-texts");

    try {
      const content = await prisma.siteContent.findMany();

      if (content.length === 0) {
        console.warn("No texts found in database, using fallback texts");
        return FALLBACK_TEXTS;
      }

      const dbTexts: any = {};

      // Group by section
      const bySection: Record<string, { key: string; value: string }[]> = {};
      for (const item of content) {
        if (!bySection[item.section]) {
          bySection[item.section] = [];
        }
        bySection[item.section].push({ key: item.key, value: item.value });
      }

      // Unflatten each section
      for (const [section, items] of Object.entries(bySection)) {
        dbTexts[section] = unflattenObject(items);
      }

      // Merge database texts with fallback to ensure all keys exist
      const mergedTexts = deepMerge(FALLBACK_TEXTS, dbTexts);
      return mergedTexts as Texts;

    } catch (error) {
      console.error("Failed to fetch texts from DB, using fallback:", error);
      return FALLBACK_TEXTS;
    }
  },
  ["site-texts"],
  {
    tags: ["site-texts"],
  }
);

export async function getVisitStats() {
  noStore();
  try {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // @ts-ignore
    const thisMonthVisits = await prisma.visit.count({
      where: {
        createdAt: {
          gte: firstDayThisMonth,
        },
      },
    });

    // @ts-ignore
    const lastMonthVisits = await prisma.visit.count({
      where: {
        createdAt: {
          gte: firstDayLastMonth,
          lte: lastDayLastMonth,
        },
      },
    });

    let trend = 0;
    if (lastMonthVisits > 0) {
      trend = ((thisMonthVisits - lastMonthVisits) / lastMonthVisits) * 100;
    } else if (thisMonthVisits > 0) {
      trend = 100;
    }

    return {
      value: thisMonthVisits,
      trend: Math.round(trend),
    };
  } catch (error) {
    console.error("Failed to fetch visit stats:", error);
    return { value: 0, trend: 0 };
  }
}

export async function getAcademicYears() {
  noStore();
  try {
    return await prisma.academicYear.findMany({
      orderBy: { startDate: "desc" },
      include: { _count: { select: { events: true, memberships: true } } },
    });
  } catch (error) {
    console.error("Failed to fetch academic years:", error);
    return [];
  }
}

export async function getAcademicYearById(id: string) {
  noStore();
  try {
    return await prisma.academicYear.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function getCurrentAcademicYear() {
  noStore();
  try {
    return await prisma.academicYear.findFirst({ where: { isCurrent: true } });
  } catch {
    return null;
  }
}
