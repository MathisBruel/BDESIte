"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { EventCard } from "@/components/features/EventCard";
import { Button } from "@/components/ui/Button";
import { getImageUrl } from "@/lib/image-url";

interface HomeEventsProps {
    upcomingEvents: any[];
    pastEvents: any[];
    texts: any;
}

export function HomeEvents({ upcomingEvents, pastEvents, texts }: HomeEventsProps) {
    return (
        <>
            {upcomingEvents.length > 0 && (
                <Section background="gray" id="evenements">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-brand-red">
                                {texts.home.upcoming.title}
                            </h2>
                            <div className="w-24 h-2 bg-grad-secondary mx-auto mb-6 rounded-full"></div>
                            <p className="text-xl text-gray-700 font-medium">
                                {texts.home.upcoming.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.slug}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <EventCard event={event} texts={texts} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </Section>
            )}

            {pastEvents.length > 0 && (
                <Section className="bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-gray-700">
                                {texts.home.past.title}
                            </h2>
                            <div className="w-24 h-2 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6 rounded-full"></div>
                            <p className="text-xl text-gray-600 font-medium">
                                {texts.home.past.subtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pastEvents.map((event, index) => (
                                <motion.div
                                    key={event.slug}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group"
                                >
                                    <div className="relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all">
                                        {event.cover && (
                                            <div className="relative w-full h-64 overflow-hidden">
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                                                <Image
                                                    src={getImageUrl(event.cover)}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        {texts.home.past.completed}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 relative">
                                            {event.photosUrl && (
                                                <a
                                                    href={event.photosUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={texts.home.past.photos}
                                                    className="absolute top-3 right-3 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 shadow"
                                                >
                                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                                                        <path d="M20 6h-2.586l-1.121-1.121A2 2 0 0015.172 4H8.828a2 2 0 00-1.414.586L6.293 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm0 12H4V8h3.172l1.414-1.414c.188-.188.442-.293.707-.293h6.414c.265 0 .52.105.707.293L16.828 8H20v10z" />
                                                    </svg>
                                                </a>
                                            )}
                                            <div className="text-sm font-semibold text-gray-500 mb-2">
                                                {event.endDate && new Date(event.date).toDateString() !== new Date(event.endDate).toDateString() ? (
                                                    <>
                                                        Du {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} au {new Date(event.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                                                    </>
                                                ) : (
                                                    new Date(event.date).toLocaleDateString("fr-FR", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    })
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold font-spartan text-gray-800 mb-3 group-hover:text-brand-red transition-colors">
                                                {event.title}
                                            </h3>

                                            {event.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {event.tags.slice(0, 3).map((tag: string) => (
                                                        <span
                                                            key={tag}
                                                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {event.description}
                                            </p>

                                            <Button
                                                href={`/evenements/${event.slug}`}
                                                variant="outline"
                                                className="w-full"
                                            >
                                                {texts.home.past.details}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-gray-600 text-lg">
                                {texts.home.past.moreComing}
                            </p>
                        </div>
                    </motion.div>
                </Section>
            )}
        </>
    );
}
