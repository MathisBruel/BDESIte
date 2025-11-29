import { z } from "zod";

export const PartnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "bar",
    "restaurant",
    "sport",
    "culture",
    "services",
    "shopping",
    "sante",
    "alimentaire",
    "autre",
  ]),
  city: z.string(),
  logo: z.string().nullable().optional(),
  advantages: z.array(z.string()),
  conditions: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  address: z.string().nullable().optional(),
  active: z.boolean().default(true),
  createdAt: z.date().or(z.string()).nullable().optional(),
  updatedAt: z.date().or(z.string()).nullable().optional(),
});

export const EventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  endDate: z.string().nullable().optional(),
  place: z.string(),
  cover: z.string().nullable().optional(),
  tags: z.array(z.string()),
  description: z.string(),
  ticketUrl: z.string().url().nullable().optional(),
  photosUrl: z.string().url().nullable().optional(),
  published: z.boolean().default(true),
});

export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  photo: z.string().nullable().optional(),
  photoPosition: z.enum(["top", "center", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"]).nullable().optional().default("center"),
  links: z
    .object({
      instagram: z.string().nullable().optional(),
      linkedin: z.string().nullable().optional(),
      email: z.string().email().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const SettingsSchema = z.object({
  association: z.string(),
  year: z.string(),
  email: z.string().email(),
  shopUrl: z.string().url().nullable().optional(),
  instagram: z.string().url().nullable().optional(),
  discord: z.string().url().nullable().optional(),
  facebook: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
});

export type Partner = z.infer<typeof PartnerSchema>;
export type Event = z.infer<typeof EventSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type Settings = z.infer<typeof SettingsSchema>;

// Texts schema for all UI copy
export const TextsSchema = z.object({
  header: z.object({
    brand: z.string(),
    nav: z.object({
      home: z.string(),
      events: z.string(),
      partners: z.string(),
      card: z.string(),
      team: z.string(),
      contact: z.string(),
    }),
    ctaBuyCard: z.string(),
  }),
  footer: z.object({
    navigation: z.string(),
    nav: z.object({
      home: z.string(),
      events: z.string(),
      partners: z.string(),
      team: z.string(),
    }),
    contact: z.string(),
    social: z.string(),
    legal: z.object({
      mentions: z.string(),
      privacy: z.string(),
      copyright: z.string(),
    }),
    associationTypeBadge: z.string(),
    schoolLine: z.string(),
  }),
  home: z.object({
    badgeYearPrefix: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    ctaViewEvents: z.string(),
    ctaSeeAdvantages: z.string(),
    scrollDownAria: z.string(),
    presentation: z.object({
      title: z.string(),
      convivialityTitle: z.string(),
      convivialityText: z.string(),
      eventsTitle: z.string(),
      eventsText: z.string(),
      engagementTitle: z.string(),
      engagementText: z.string(),
      intro: z.string(),
    }),
    upcoming: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    past: z.object({
      title: z.string(),
      subtitle: z.string(),
      completed: z.string(),
      moreComing: z.string(),
      details: z.string(),
      photos: z.string(),
    }),
    card: z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      ctaBuy: z.string(),
      ctaSeePartners: z.string(),
      badges: z.array(z.string()),
    }),
    team: z.object({
      title: z.string(),
      hero: z.string(),
      heroSubtitle: z.string(),
      meet: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      subtitle: z.string(),
      email: z.string(),
      instagram: z.object({ title: z.string(), subtitle: z.string() }),
      discord: z.object({ title: z.string(), subtitle: z.string() }),
    }),
    accessibility: z.object({ menu: z.string() }),
    brandAlt: z.string(),
    brandAltBde: z.string(),
    teamImageAlt: z.string(),
  }),
});

export type Texts = z.infer<typeof TextsSchema>;

