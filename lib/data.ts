import partnersData from "@/data/partners.json";
import eventsData from "@/data/events.json";
import teamData from "@/data/team.json";
import settingsData from "@/data/settings.json";
import { PartnerSchema, EventSchema, TeamMemberSchema, SettingsSchema, TextsSchema } from "./schemas";
import type { Partner, Event, TeamMember, Settings, Texts } from "./schemas";
import textsData from "@/data/texts.json";
import { z } from "zod";

function validateData<T>(data: unknown, schema: z.ZodSchema<T>): T[] | T {
  if (Array.isArray(data)) {
    return data.map((item) => schema.parse(item));
  }
  return schema.parse(data);
}

export function getPartners(): Partner[] {
  return validateData(partnersData, PartnerSchema) as Partner[];
}

export function getActivePartners(): Partner[] {
  return getPartners().filter((p) => p.active);
}

export function getPartnersByCategory(category: string): Partner[] {
  return getActivePartners().filter((p) => p.category === category);
}

export function getEvents(): Event[] {
  return validateData(eventsData, EventSchema) as Event[];
}

export function getPublishedEvents(): Event[] {
  return getEvents()
    .filter((e) => e.published)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = getPublishedEvents().filter((e) => new Date(e.date) >= now);
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(): Event[] {
  const now = new Date();
  return getPublishedEvents()
    .filter((e) => new Date(e.date) < now)
    .reverse();
}

export function getEventBySlug(slug: string): Event | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getTeamMembers(): TeamMember[] {
  return validateData(teamData, TeamMemberSchema) as TeamMember[];
}

export function getSettings(): Settings {
  return validateData(settingsData, SettingsSchema) as Settings;
}

export function getTexts(): Texts {
  return validateData(textsData, TextsSchema) as Texts;
}

