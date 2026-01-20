"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatText } from "@/lib/utils";

interface HomeCardSectionProps {
    texts: any;
    settings: any;
    partnersCount: number;
}

export function HomeCardSection({ texts, settings, partnersCount }: HomeCardSectionProps) {
    return (
        <Section className="bg-grad-secondary relative overflow-hidden" id="carte-bde">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 text-9xl animate-spin-slow">💳</div>
                <div className="absolute bottom-10 left-10 text-8xl animate-pulse">✨</div>
            </div>
            <motion.div
                className="relative z-10 text-center text-brand-black py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-6">
                    {formatText(texts.home.card.title, { year: settings.year })}
                </h2>
                <div className="w-24 h-2 bg-brand-black mx-auto mb-8 rounded-full"></div>
                <p className="text-2xl mb-4 font-bold">
                    {texts.home.card.subtitle}
                </p>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                    {formatText(texts.home.card.description, { partnersCount })}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                        variant="cta"
                        href="/carte-bde"
                        className="bg-grad-primary text-brand-black hover:scale-110 text-xl"
                    >
                        {texts.home.card.ctaBuy}
                    </Button>
                    <Button
                        variant="outline"
                        href="/partenaires"
                        className="bg-transparent border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white text-xl"
                    >
                        {texts.home.card.ctaSeePartners}
                    </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-lg">
                    {texts.home.card.badges.map((b: string) => (
                        <Badge key={b} variant="yellow" className="text-base px-4 py-2">{formatText(b, { partnersCount })}</Badge>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}
