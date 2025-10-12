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

