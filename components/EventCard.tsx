import Image from "next/image";
import Link from "next/link";
import { Badge } from "./Badge";
import { Button } from "./Button";
import type { Event } from "@/lib/schemas";
import { formatDate, formatTime, formatDateTimeRange } from "@/lib/utils";
import { getTexts } from "@/lib/data";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();
  const texts = getTexts();

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full ${
        isPast ? "opacity-75" : ""
      }`}
    >
      {event.cover && (
        <div className="relative w-full h-48">
          <Image src={event.cover} alt={event.title} fill className="object-cover" />
          {isPast && (
            <div className="absolute top-2 right-2">
              <Badge variant="default">Terminé</Badge>
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 relative">
        {event.photosUrl && (
          <a
            href={event.photosUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={texts.home.past.photos}
            className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 shadow"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
              <path d="M20 6h-2.586l-1.121-1.121A2 2 0 0015.172 4H8.828a2 2 0 00-1.414.586L6.293 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm0 12H4V8h3.172l1.414-1.414c.188-.188.442-.293.707-.293h6.414c.265 0 .52.105.707.293L16.828 8H20v10z"/>
            </svg>
          </a>
        )}
        <div className="mb-3">
          <div className="text-sm font-semibold text-brand-red mb-1">
            {event.endDate ? (
              (() => {
                const sameDayFormatter = new Intl.DateTimeFormat("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  timeZone: "Europe/Paris",
                });
                const isSameDay = sameDayFormatter.format(new Date(event.date)) === sameDayFormatter.format(new Date(event.endDate));
                return isSameDay
                  ? `${formatDate(event.date)} • ${formatTime(event.date)} - ${formatTime(event.endDate)}`
                  : `Du ${new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "Europe/Paris" })} au ${new Date(event.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "Europe/Paris" })}`;
              })()
            ) : (
              `${formatDate(event.date)} • ${formatTime(event.date)}`
            )}
          </div>
          <div className="text-xs text-gray-600">{event.place}</div>
        </div>

        <h3 className="text-xl font-bold font-spartan text-brand-black mb-3">{event.title}</h3>

        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {!compact && (
          <p className="text-sm text-gray-700 mb-4 flex-1 line-clamp-3">{event.description}</p>
        )}

        <div className="flex gap-2 mt-auto">
          <Button href={`/evenements/${event.slug}`} variant="outline" className="flex-1">
            {texts.home.past.details}
          </Button>
          {event.ticketUrl && !isPast && (
            <Button href={event.ticketUrl} variant="primary" className="flex-1">
              Billetterie
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

