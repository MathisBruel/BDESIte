"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "./Section";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { getBlurPlaceholder } from "@/lib/blur-placeholders";

export function MerchSection() {
    return (
        <Section className="bg-gray-50" id="merch">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block"
                >
                    <Badge variant="yellow" className="text-sm px-4 py-1 mb-4 text-brand-black font-bold inline-block shadow-sm">
                        ⏳ Jusqu&apos;au 1er décembre
                    </Badge>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-spartan mb-4 text-brand-black">
                    La Boutique du Merch
                </h2>
                <div className="w-16 h-1 bg-brand-red mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Portez les couleurs de votre BDE ! Commandez votre pull ou profitez du pack avec la carte BDE.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
                {/* Pull Offer */}
                <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center cursor-pointer"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                >
                    <div className="relative h-48 w-full mb-4">
                        <Image
                            src="/images/assets/Pull/Ink Blue.png"
                            alt="Pull BDE SUP'RNOVA"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-contain"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={getBlurPlaceholder("/images/assets/Pull/Ink Blue.png")}
                        />
                    </div>
                    <h3 className="text-xl font-bold font-spartan mb-1 text-gray-800">Le Pull BDE</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        Confort et style pour l&apos;année.
                    </p>
                </motion.div>

                {/* Bundle Offer */}
                <motion.div
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                >
                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="yellow" className="text-xs font-bold px-2 py-0.5 shadow-sm">Pack Promo</Badge>
                    </div>
                    <div className="relative h-48 w-full mb-4">
                        <Image
                            src="/images/assets/Pull-et-cartes/Sky blue.png"
                            alt="Pack Pull + Carte BDE"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-contain"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={getBlurPlaceholder("/images/assets/Pull-et-cartes/Sky blue.png")}
                        />
                    </div>
                    <h3 className="text-xl font-bold font-spartan mb-1 text-gray-800">Pack Pull + Carte</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        Le combo gagnant pour les étudiants.
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Button
                        href="https://boutique.suprennes.me"
                        className="bg-brand-red text-white text-lg px-8 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                    >
                        Accéder à la Boutique
                    </Button>
                </motion.div>
            </motion.div>
        </Section>
    );
}
