import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} à ${formatTime(date)}`;
}

export function formatDateTimeRange(startDate: string | Date, endDate?: string | Date): string {
  if (!endDate) {
    return formatDateTime(startDate);
  }

  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  const isSameDay = start.toDateString() === end.toDateString();

  if (isSameDay) {
    return `${formatDate(start)} de ${formatTime(start)} à ${formatTime(end)}`;
  }

  return `Du ${formatDateTime(start)} au ${formatDateTime(end)}`;
}

export const categoryLabels: Record<string, string> = {
  bar: "Bar",
  restaurant: "Restaurant",
  sport: "Sport",
  culture: "Culture",
  services: "Services",
  shopping: "Shopping",
  sante: "Santé",
  alimentaire: "Alimentaire",
  autre: "Autre",
};

