"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "@/components/features/TeamCard";
import { formatText } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";

interface HomeTeamProps {
    texts: any;
    settings: any;
    team: any[];
}

export function HomeTeam({ texts, settings, team }: HomeTeamProps) {
    return (
        <Section id="equipe" className="bg-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-brand-red">
                        {texts.home.team.title}
                    </h2>
                    <div className="w-24 h-2 bg-grad-secondary mx-auto mb-6 rounded-full"></div>
                    <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                        Des étudiants passionnés qui bossent dur pour vous faire kiffer votre année ! 💪
                    </p>
                </div>

                <motion.div
                    className="mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <Image
                            src={getImageUrl("team/groupe.jpg")}
                            alt={texts.home.teamImageAlt}
                            width={900}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                            <p className="text-white text-xl md:text-2xl font-bold font-spartan text-center">
                                {formatText(texts.home.team.hero, { year: settings.year })}
                            </p>
                            <p className="text-white/90 text-center mt-1 text-sm md:text-base">
                                {texts.home.team.heroSubtitle}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold font-spartan text-gray-800">
                        {texts.home.team.meet}
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}
