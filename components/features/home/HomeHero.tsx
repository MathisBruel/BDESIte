"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { animateScrollToY, formatText } from "@/lib/utils";
import { SCROLL_OFFSET } from "@/lib/constants";
import { getImageUrl } from "@/lib/image-url";

interface HomeHeroProps {
    texts: any;
    settings: any;
    partnersCount: number;
}

export function HomeHero({ texts, settings, partnersCount }: HomeHeroProps) {
    return (
        <section className="relative bg-grad-secondary min-h-[85vh] flex items-center justify-center overflow-hidden pb-16">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 text-9xl animate-pulse">🎉</div>
                <div className="absolute top-40 right-20 text-7xl animate-bounce delay-100">🎊</div>
                <div className="absolute bottom-20 left-1/4 text-8xl animate-pulse delay-200">⭐</div>
                <div className="absolute bottom-40 right-1/3 text-6xl animate-bounce">🔥</div>
            </div>

            <Container>
                <motion.div
                    className="relative z-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
                        className="mb-6"
                    >
                        <Image
                            src={getImageUrl("assets/Logo couleur.png")}
                            alt={texts.home.brandAltBde}
                            width={200}
                            height={200}
                            className="mx-auto drop-shadow-2xl"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Badge variant="yellow" className="text-base px-6 py-2 mb-6 text-brand-black font-bold">
                            {texts.home.badgeYearPrefix} {settings.year} ⚡
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-spartan text-brand-black mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {texts.home.title}
                    </motion.h1>

                    <motion.p
                        className="text-2xl sm:text-3xl md:text-4xl text-brand-black/95 mb-4 font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {texts.home.subtitle}
                    </motion.p>

                    <motion.p
                        className="text-lg sm:text-xl text-brand-black/90 max-w-3xl mx-auto mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {formatText(texts.home.description, { partnersCount })}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            onClick={() => {
                                const element = document.getElementById("evenements");
                                if (element) {
                                    const offset = SCROLL_OFFSET;
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                    const target = elementPosition - offset;
                                    void animateScrollToY(target, 600);
                                }
                            }}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-grad-primary text-brand-black font-chunk text-lg uppercase tracking-wide hover:scale-110 focus:ring-brand-yellow shadow-lg hover:shadow-xl"
                        >
                            {texts.home.ctaViewEvents}
                        </button>
                        <Button
                            variant="outline"
                            href="/partenaires"
                            className="bg-transparent border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white text-lg"
                        >
                            {texts.home.ctaSeeAdvantages}
                        </Button>
                    </motion.div>

                    <motion.div
                        className="mt-12 animate-bounce"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <button
                            onClick={() => {
                                const element = document.getElementById("presentation");
                                if (element) {
                                    const offset = SCROLL_OFFSET;
                                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                    const target = elementPosition - offset;
                                    void animateScrollToY(target, 600);
                                }
                            }}
                            className="text-brand-black text-4xl hover:scale-125 transition-transform"
                            aria-label={texts.home.scrollDownAria}
                        >
                            ⬇️
                        </button>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
