"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

interface HomePresentationProps {
    texts: any;
}

export function HomePresentation({ texts }: HomePresentationProps) {
    return (
        <Section id="presentation" className="bg-white">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-6 text-brand-red">
                        {texts.home.presentation.title}
                    </h2>
                    <div className="w-24 h-2 bg-grad-secondary mx-auto mb-8 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                        className="text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform"
                        whileHover={{ y: -5 }}
                    >
                        <div className="text-6xl mb-4">🤝</div>
                        <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">{texts.home.presentation.convivialityTitle}</h3>
                        <p className="text-gray-700">
                            {texts.home.presentation.convivialityText}
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform"
                        whileHover={{ y: -5 }}
                    >
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">{texts.home.presentation.eventsTitle}</h3>
                        <p className="text-gray-700">
                            {texts.home.presentation.eventsText}
                        </p>
                    </motion.div>

                    <motion.div
                        className="text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform"
                        whileHover={{ y: -5 }}
                    >
                        <div className="text-6xl mb-4">💪</div>
                        <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">{texts.home.presentation.engagementTitle}</h3>
                        <p className="text-gray-700">
                            {texts.home.presentation.engagementText}
                        </p>
                    </motion.div>
                </div>

                <p className="text-xl text-center text-gray-700 leading-relaxed">
                    {texts.home.presentation.intro}
                </p>
            </motion.div>
        </Section>
    );
}
