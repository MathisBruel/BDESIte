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
  logo: z.string().optional(),
  advantages: z.array(z.string()),
  conditions: z.string().optional(),
  website: z.string().url().optional(),
  address: z.string().optional(),
  active: z.boolean().default(true),
});

export const EventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  endDate: z.string().optional(),
  place: z.string(),
  cover: z.string().optional(),
  tags: z.array(z.string()),
  description: z.string(),
  ticketUrl: z.string().url().optional(),
  photosUrl: z.string().url().optional(),
  published: z.boolean().default(true),
});

export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  photo: z.string().optional(),
  photoPosition: z.enum(["top", "center", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"]).optional().default("center"),
  links: z
    .object({
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
});

export const SettingsSchema = z.object({
  association: z.string(),
  year: z.string(),
  email: z.string().email(),
  shopUrl: z.string().url(),
  instagram: z.string().url().optional(),
  discord: z.string().url().optional(),
  facebook: z.string().url().optional(),
  linkedin: z.string().url().optional(),
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

