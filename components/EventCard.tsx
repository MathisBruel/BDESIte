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

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <div className="text-sm font-semibold text-brand-red mb-1">
            {event.endDate ? (
              <>
                {new Date(event.date).toDateString() === new Date(event.endDate).toDateString() ? (
                  `${formatDate(event.date)} • ${formatTime(event.date)} - ${formatTime(event.endDate)}`
                ) : (
                  `Du ${new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} au ${new Date(event.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`
                )}
              </>
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
          {event.photosUrl && (
            <Button href={event.photosUrl} variant="secondary" className="flex-1">
              {texts.home.past.photos}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

