import { notFound } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getEventBySlug, getEvents, getTexts } from "@/lib/data";
import { formatDateTime, formatDateTimeRange } from "@/lib/utils";

export async function generateStaticParams() {
  const events = getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Événement introuvable",
    };
  }

  return {
    title: `${event.title} | BDE Sup'RNova`,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  const texts = getTexts();

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <>
      <Header />
      <main>
        {event.cover && (
          <div className="relative w-full h-[400px]">
            <Image src={event.cover} alt={event.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}

        <Section className="-mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="yellow">
                  {tag}
                </Badge>
              ))}
              {isPast && <Badge variant="default">Terminé</Badge>}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-spartan mb-6">{event.title}</h1>

            <div className="flex flex-col sm:flex-row gap-6 mb-8 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <div className="font-semibold">Date</div>
                  <div>{formatDateTimeRange(event.date, event.endDate)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="font-semibold">Lieu</div>
                  <div>{event.place}</div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold font-spartan mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>

            {event.ticketUrl && !isPast && (
              <div className="bg-grad-secondary p-6 rounded-xl text-center">
                <h3 className="text-2xl font-bold font-spartan text-white mb-4">
                  Réservez votre place !
                </h3>
                <Button
                  href={event.ticketUrl}
                  variant="cta"
                  className="bg-white text-brand-red hover:bg-white/90"
                >
                  Accéder à la billetterie
                </Button>
              </div>
            )}

            {event.photosUrl && (
              <div className="mt-6 bg-brand-pale/40 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold font-spartan text-brand-red mb-3">
                  📸 Galerie photos
                </h3>
                <a
                  href={event.photosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={texts.home.past.photos}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-red hover:bg-brand-pale shadow"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
                    <path d="M20 6h-2.586l-1.121-1.121A2 2 0 0015.172 4H8.828a2 2 0 00-1.414.586L6.293 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm0 12H4V8h3.172l1.414-1.414c.188-.188.442-.293.707-.293h6.414c.265 0 .52.105.707.293L16.828 8H20v10z"/>
                  </svg>
                </a>
              </div>
            )}

            <div className="mt-8 text-center">
              <Button href="/#evenements" variant="outline">
                ← Retour aux événements
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

