"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { Container } from "./Container";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  showCtas?: boolean;
  variant?: "default" | "partners" | "card";
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  showCtas = true,
  variant = "default",
}: HeroProps) {
  const overlayClass = variant === "default" ? "bg-black/10" : "";
  return (
    <section className="relative bg-grad-secondary py-24 sm:py-32 overflow-hidden">
      {variant === "partners" && (
        <>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,#ffde59,transparent)] opacity-40" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(closest-side,#cc3533,transparent)] opacity-30" />
          <div className="absolute top-10 left-12 text-7xl opacity-20 select-none">🤝</div>
          <div className="absolute bottom-12 right-24 text-6xl opacity-20 select-none">⭐</div>
        </>
      )}
      {variant === "card" && (
        <>
          <div className="absolute -top-20 right-10 w-[26rem] h-[26rem] rounded-full bg-[radial-gradient(closest-side,#ff92b9,transparent)] opacity-30" />
          <div className="absolute -bottom-24 left-6 w-[22rem] h-[22rem] rounded-full bg-[radial-gradient(closest-side,#ffe492,transparent)] opacity-40" />
          <div className="absolute top-12 right-24 text-7xl opacity-25 select-none">💳</div>
          <div className="absolute bottom-16 left-24 text-6xl opacity-25 select-none">✨</div>
        </>
      )}
      <Container>
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-spartan text-brand-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-xl sm:text-2xl text-brand-black/90 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              className="text-lg text-brand-black/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {description}
            </motion.p>
          )}

          {showCtas && (primaryCta || secondaryCta) && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {primaryCta && (
                <Button variant="cta" href={primaryCta.href} className="bg-grad-primary text-brand-black">
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  href={secondaryCta.href}
                  className="bg-transparent border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>

      <div className={`absolute inset-0 ${overlayClass}`}></div>
    </section>
  );
}

