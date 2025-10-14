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

export function animateScrollToY(targetY: number, durationMs = 600): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.pageYOffset;
    const distanceY = targetY - startY;
    if (durationMs <= 0 || Math.abs(distanceY) < 1) {
      window.scrollTo(0, targetY);
      resolve();
      return;
    }
    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(t);
      const currentY = startY + distanceY * eased;
      window.scrollTo(0, Math.round(currentY));
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

export function smoothScrollToElementById(id: string, offsetPx = 80, durationMs = 600): void {
  if (!id) {
    void animateScrollToY(0, durationMs);
    return;
  }
  const element = document.getElementById(id);
  if (!element) return;
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetY = elementPosition - offsetPx;
  void animateScrollToY(targetY, durationMs);
}

// Simple template interpolation: replaces {key} with values[key]
export function formatText(template: string, values: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value !== undefined && value !== null ? String(value) : `{${key}}`;
  });
}

