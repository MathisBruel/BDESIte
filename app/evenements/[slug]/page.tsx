import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowLeft, Camera, Ticket } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getEventBySlug, getTexts } from "@/lib/data";
import { formatDate, formatTime, formatDateTimeRange } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Événement introuvable" };
  return {
    title: `${event.title} | BDE SUP'RNOVA`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const texts = await getTexts();

  if (!event) notFound();

  const isPast = new Date(event.date) < new Date();

  return (
    <>
      <Header texts={texts} />
      <main>
        {/* Hero cover */}
        {event.cover ? (
          <div className="relative w-full h-[50vh] min-h-[320px] max-h-[520px] bg-brand-noir overflow-hidden">
            <Image
              src={getImageUrl(event.cover)}
              alt={event.title}
              fill
              className="object-cover opacity-70"
              priority
              unoptimized={getImageUrl(event.cover).startsWith("/api/images/")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-noir via-brand-noir/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <Link
                href="/#evenements"
                className="inline-flex items-center gap-2 font-spartan font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Événements
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="font-spartan font-bold text-xs uppercase tracking-widest px-3 py-1 bg-white/10 text-white border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
                {isPast && (
                  <span className="stamp text-xs px-2 py-0.5 bg-white/90">
                    {texts.home.past.completed ?? "Terminé"}
                  </span>
                )}
              </div>
              <h1 className="font-spartan font-black text-3xl sm:text-5xl text-white leading-tight max-w-3xl">
                {event.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="bg-brand-noir py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/#evenements"
                className="inline-flex items-center gap-2 font-spartan font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Événements
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="font-spartan font-bold text-xs uppercase tracking-widest px-3 py-1 bg-white/10 text-white border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
                {isPast && (
                  <span className="stamp text-xs px-2 py-0.5 bg-white/90">
                    {texts.home.past.completed ?? "Terminé"}
                  </span>
                )}
              </div>
              <h1 className="font-spartan font-black text-3xl sm:text-5xl text-white leading-tight max-w-3xl">
                {event.title}
              </h1>
            </div>
          </div>
        )}

        {/* Contenu */}
        <div className="bg-brand-craie">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Corps principal */}
              <div className="lg:col-span-2">
                <h2 className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-4">
                  Description
                </h2>
                <p className="font-lato text-brand-noir/75 leading-relaxed text-base whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">

                {/* Infos */}
                <div className="bg-white p-6 border border-brand-noir/8">
                  <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/35 mb-5">
                    Informations
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Calendar className="h-4 w-4 text-brand-rouge shrink-0 mt-0.5" />
                      <div>
                        <div className="font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/40 mb-0.5">
                          Date
                        </div>
                        <div className="font-lato text-sm text-brand-noir">
                          {formatDateTimeRange(event.date, event.endDate)}
                        </div>
                      </div>
                    </div>
                    {event.place && (
                      <div className="flex gap-3">
                        <MapPin className="h-4 w-4 text-brand-rouge shrink-0 mt-0.5" />
                        <div>
                          <div className="font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/40 mb-0.5">
                            Lieu
                          </div>
                          <div className="font-lato text-sm text-brand-noir">{event.place}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Billetterie */}
                {event.ticketUrl && !isPast && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-6 py-4 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                  >
                    <span>Réserver ma place</span>
                    <Ticket className="h-4 w-4" />
                  </a>
                )}

                {/* Photos */}
                {event.photosUrl && (
                  <a
                    href={event.photosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-6 py-4 bg-brand-noir text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-or hover:text-brand-noir transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-or"
                  >
                    <span>{texts.home.past.photos ?? "Voir les photos"}</span>
                    <Camera className="h-4 w-4" />
                  </a>
                )}

                {/* Retour */}
                <Link
                  href="/#evenements"
                  className="flex items-center gap-2 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/45 hover:text-brand-rouge transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Tous les événements
                </Link>

              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
