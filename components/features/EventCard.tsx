import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import type { Event } from "@/lib/schemas";
import { formatDate, formatTime } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";

interface EventCardProps {
  event: Event;
  compact?: boolean;
  texts: any;
  past?: boolean;
}

export function EventCard({ event, compact = false, texts, past = false }: EventCardProps) {
  const isPast = past || new Date(event.date) < new Date();

  return (
    <div
      className={`group relative flex flex-col h-full overflow-hidden border transition-all duration-200 ${
        isPast
          ? "bg-brand-craie border-brand-noir/10 hover:border-brand-noir/30"
          : "bg-brand-noir border-brand-noir hover:border-brand-rouge"
      }`}
    >
      {/* Cover */}
      {event.cover && (
        <div className="relative w-full h-48 overflow-hidden shrink-0">
          <Image
            src={getImageUrl(event.cover)}
            alt={event.title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isPast ? "grayscale-[60%] group-hover:grayscale-0" : ""
            }`}
          />
          {/* Stamp "TERMINÉ" pour événements passés */}
          {isPast && (
            <div className="absolute top-3 right-3 z-10">
              <span className="stamp text-sm px-2 py-0.5 bg-white/90">
                {texts.home.past.completed ?? "Terminé"}
              </span>
            </div>
          )}
          {/* Lien photos */}
          {event.photosUrl && (
            <a
              href={event.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={texts.home.past.photos ?? "Voir les photos"}
              className="absolute bottom-3 right-3 z-10 p-2 bg-white/90 text-brand-noir hover:bg-brand-or transition-colors"
            >
              <Camera className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Date + lieu */}
        <div className="mb-3">
          <div className={`text-xs font-spartan font-bold uppercase tracking-wider mb-1 ${isPast ? "text-brand-noir/50" : "text-brand-rouge"}`}>
            {event.endDate ? (
              (() => {
                const fmt = new Intl.DateTimeFormat("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  timeZone: "Europe/Paris",
                });
                const sameDay =
                  fmt.format(new Date(event.date)) ===
                  fmt.format(new Date(event.endDate));
                return sameDay
                  ? `${formatDate(event.date)} · ${formatTime(event.date)} — ${formatTime(event.endDate)}`
                  : `Du ${formatDate(event.date)} au ${formatDate(event.endDate)}`;
              })()
            ) : (
              `${formatDate(event.date)} · ${formatTime(event.date)}`
            )}
          </div>
          <div className={`text-xs font-lato ${isPast ? "text-brand-noir/40" : "text-white/45"}`}>
            {event.place}
          </div>
        </div>

        {/* Titre */}
        <h3
          className={`font-spartan font-black text-lg leading-tight mb-3 transition-colors ${
            isPast
              ? "text-brand-noir group-hover:text-brand-rouge"
              : "text-white group-hover:text-brand-or"
          }`}
        >
          {event.title}
        </h3>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-xs font-lato px-2 py-0.5 ${
                  isPast
                    ? "bg-brand-noir/8 text-brand-noir/60"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {!compact && (
          <p
            className={`text-sm font-lato mb-4 flex-1 line-clamp-3 leading-relaxed ${
              isPast ? "text-brand-noir/55" : "text-white/55"
            }`}
          >
            {event.description}
          </p>
        )}

        {/* CTA */}
        <div className="flex gap-2 mt-auto pt-2">
          <Link
            href={`/evenements/${event.slug}`}
            className={`flex-1 text-center py-2.5 text-xs font-spartan font-bold uppercase tracking-wide transition-colors ${
              isPast
                ? "border border-brand-noir/20 text-brand-noir hover:bg-brand-noir hover:text-white"
                : "border border-white/20 text-white hover:bg-brand-rouge hover:border-brand-rouge"
            }`}
          >
            {texts.home.past.details ?? "Voir les détails"}
          </Link>
          {event.ticketUrl && !isPast && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 text-xs font-spartan font-bold uppercase tracking-wide bg-brand-rouge text-white hover:bg-brand-or hover:text-brand-noir transition-colors"
            >
              Billetterie
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
