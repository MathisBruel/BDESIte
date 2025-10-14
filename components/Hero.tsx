"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { Container } from "./Container";
import { getTransition, hardwareAcceleratedClasses } from "@/utils/animation";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  showCtas?: boolean;
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  showCtas = true,
}: HeroProps) {
  return (
    <section className="relative bg-grad-secondary py-24 sm:py-32 overflow-hidden">
      <Container>
        <motion.div
          className={`relative z-10 text-center ${hardwareAcceleratedClasses}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(0.8)}
        >
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold font-spartan text-white mb-6 ${hardwareAcceleratedClasses}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={getTransition(0.8, 0.2)}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className={`text-xl sm:text-2xl text-white/90 mb-4 ${hardwareAcceleratedClasses}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(0.8, 0.3)}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              className={`text-lg text-white/80 max-w-3xl mx-auto mb-8 ${hardwareAcceleratedClasses}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(0.8, 0.4)}
            >
              {description}
            </motion.p>
          )}

          {showCtas && (primaryCta || secondaryCta) && (
            <motion.div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${hardwareAcceleratedClasses}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(0.8, 0.5)}
            >
              {primaryCta && (
                <Button variant="cta" href={primaryCta.href}>
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  href={secondaryCta.href}
                  className="bg-white border-white hover:bg-white/90"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>

      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}

