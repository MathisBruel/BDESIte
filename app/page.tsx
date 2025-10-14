"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/Section";
import { EventCard } from "@/components/EventCard";
import { TeamCard } from "@/components/TeamCard";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { getUpcomingEvents, getPastEvents, getSettings, getTeamMembers, getActivePartners } from "@/lib/data";
import { getTransition, getOptimizedSpring, getViewportConfig, hardwareAcceleratedClasses } from "@/utils/animation";

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents(6);
  const pastEvents = getPastEvents().slice(0, 3);
  const settings = getSettings();
  const team = getTeamMembers();
  const partnersCount = getActivePartners().length;

  return (
    <>
      <Header />
      <main>
        <section className="relative bg-grad-secondary min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-9xl animate-pulse gpu-accelerated">🎉</div>
            <div className="absolute top-40 right-20 text-7xl animate-bounce delay-100 gpu-accelerated">🎊</div>
            <div className="absolute bottom-20 left-1/4 text-8xl animate-pulse delay-200 gpu-accelerated">⭐</div>
            <div className="absolute bottom-40 right-1/3 text-6xl animate-bounce gpu-accelerated">🔥</div>
          </div>

          <Container>
            <motion.div
              className={`relative z-10 text-center ${hardwareAcceleratedClasses}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(0.8)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...getOptimizedSpring(100, 10), delay: 0.1 }}
                className={`mb-6 ${hardwareAcceleratedClasses}`}
              >
                <Image
                  src="/images/assets/Logo couleur.png"
                  alt="Logo BDE Sup'RNova"
                  width={200}
                  height={200}
                  className="mx-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={getTransition(0.6, 0.2)}
                className={hardwareAcceleratedClasses}
              >
                <Badge variant="yellow" className="text-base px-6 py-2 mb-6 text-brand-black font-bold">
                  ⚡ Année {settings.year} ⚡
                </Badge>
              </motion.div>

              <motion.h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-spartan text-white mb-6 leading-tight ${hardwareAcceleratedClasses}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getTransition(0.8, 0.3)}
              >
                BDE Sup&apos;RNova
              </motion.h1>

              <motion.p
                className={`text-2xl sm:text-3xl md:text-4xl text-white/95 mb-4 font-bold ${hardwareAcceleratedClasses}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getTransition(0.8, 0.4)}
              >
                Ta vie étudiante à 100% ! 🚀
              </motion.p>

              <motion.p
                className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 ${hardwareAcceleratedClasses}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getTransition(0.8, 0.5)}
              >
                Soirées de folie 🎉 • {partnersCount}+ partenaires 🤝 • Événements inoubliables 🎊 • Une équipe au top 💪
              </motion.p>

              <motion.div
                className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${hardwareAcceleratedClasses}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={getTransition(0.8, 0.6)}
              >
                <button
                  onClick={() => {
                    const element = document.getElementById("evenements");
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-grad-secondary text-white font-chunk text-lg uppercase tracking-wide hover:scale-110 focus:ring-brand-yellow shadow-lg hover:shadow-xl bg-white text-brand-red hover:bg-white/90"
                >
                  🔥 Voir les événements
                </button>
                <Button
                  variant="outline"
                  href="/partenaires"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-red text-lg"
                >
                  💎 Découvrir les avantages
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
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                  className="text-white text-4xl hover:scale-125 transition-transform"
                  aria-label="Défiler vers le bas"
                >
                  ⬇️
                </button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <Section id="presentation" className="bg-white">
          <motion.div
            className={`max-w-4xl mx-auto ${hardwareAcceleratedClasses}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={getTransition(0.6)}
            viewport={getViewportConfig()}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-6 text-brand-red">
                Qui sommes-nous ? 🎓
              </h2>
              <div className="w-24 h-2 bg-grad-secondary mx-auto mb-8 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className={`text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform smooth-transition ${hardwareAcceleratedClasses}`}
                whileHover={{ y: -5 }}
                transition={getTransition(0.3)}
              >
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">Convivialité</h3>
                <p className="text-gray-700">
                  On crée du lien entre tous les étudiants dans une ambiance de fou !
                </p>
              </motion.div>

              <motion.div
                className={`text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform smooth-transition ${hardwareAcceleratedClasses}`}
                whileHover={{ y: -5 }}
                transition={getTransition(0.3)}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">Événements</h3>
                <p className="text-gray-700">
                  Des soirées, du sport, de la culture... Y&apos;en a pour tous les goûts !
                </p>
              </motion.div>

              <motion.div
                className={`text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform smooth-transition ${hardwareAcceleratedClasses}`}
                whileHover={{ y: -5 }}
                transition={getTransition(0.3)}
              >
                <div className="text-6xl mb-4">💪</div>
                <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">Engagement</h3>
                <p className="text-gray-700">
                  Une équipe de passionnés à ton service toute l&apos;année !
                </p>
              </motion.div>
            </div>

            <p className="text-xl text-center text-gray-700 leading-relaxed">
              Le <span className="font-bold text-brand-red">BDE Sup&apos;RNova</span>, c&apos;est
              LE Bureau des Étudiants qui fait vibrer le campus de Sup de Co Rennes ! Notre
              mission ? Rendre ton année étudiante absolument <span className="font-bold text-brand-red">INOUBLIABLE</span> 🚀
            </p>
          </motion.div>
        </Section>

        {upcomingEvents.length > 0 && (
          <Section background="gray" id="evenements">
            <motion.div
              className={hardwareAcceleratedClasses}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={getTransition(0.6)}
              viewport={getViewportConfig()}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-brand-red">
                  🎊 Événements à venir
                </h2>
                <div className="w-24 h-2 bg-grad-secondary mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-700 font-medium">
                  Prêt à faire la fête ? Voici ce qui t&apos;attend ! 🔥
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.slug}
                    className={hardwareAcceleratedClasses}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={getTransition(0.5, index * 0.1)}
                    viewport={getViewportConfig()}
                    whileHover={{ scale: 1.03 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>
        )}

        {pastEvents.length > 0 && (
          <Section className="bg-white">
            <motion.div
              className={hardwareAcceleratedClasses}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={getTransition(0.6)}
              viewport={getViewportConfig()}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-gray-700">
                  📸 Nos derniers événements
                </h2>
                <div className="w-24 h-2 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-600 font-medium">
                  Retour en images sur les meilleurs moments ! 🎬
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.slug}
                    className={`relative group ${hardwareAcceleratedClasses}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={getTransition(0.5, index * 0.1)}
                    viewport={getViewportConfig()}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-xl transition-all">
                      {event.cover && (
                        <div className="relative w-full h-64 overflow-hidden">
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                          <Image 
                            src={event.cover} 
                            alt={event.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 z-20">
                            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              ✓ Terminé
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
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
                            {event.tags.slice(0, 3).map((tag) => (
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
                          Voir les détails →
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 text-lg">
                  Et ce n&apos;est que le début... Plein d&apos;autres souvenirs à venir ! 🚀
                </p>
              </div>
            </motion.div>
          </Section>
        )}

        <Section className="bg-grad-secondary relative overflow-hidden" id="carte-bde">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 text-9xl animate-spin-slow gpu-accelerated">💳</div>
            <div className="absolute bottom-10 left-10 text-8xl animate-pulse gpu-accelerated">✨</div>
          </div>
          <motion.div
            className={`relative z-10 text-center text-white py-12 ${hardwareAcceleratedClasses}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={getTransition(0.6)}
            viewport={getViewportConfig()}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-6">
              💎 Carte BDE {settings.year}
            </h2>
            <div className="w-24 h-2 bg-white mx-auto mb-8 rounded-full"></div>
            <p className="text-2xl mb-4 font-bold">
              Ta carte magique pour économiser toute l&apos;année ! 🎁
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Plus de {partnersCount} partenaires à Rennes : bars, restos, sport, culture...
              La carte est rentabilisée dès ta 2ème sortie ! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="cta"
                href="/carte-bde"
                className="bg-white text-brand-red hover:bg-white/90 hover:scale-110 text-xl"
              >
                🛒 Acheter ma carte
              </Button>
              <Button
                variant="outline"
                href="/partenaires"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-red text-xl"
              >
                👀 Voir les partenaires
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <Badge variant="yellow" className="text-base px-4 py-2">💰 Économies garanties</Badge>
              <Badge variant="yellow" className="text-base px-4 py-2">🎉 Accès prioritaire</Badge>
              <Badge variant="yellow" className="text-base px-4 py-2">🤝 {partnersCount}+ partenaires</Badge>
            </div>
          </motion.div>
        </Section>

        <Section id="equipe" className="bg-white">
          <motion.div
            className={hardwareAcceleratedClasses}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={getTransition(0.6)}
            viewport={getViewportConfig()}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-brand-red">
                🌟 L&apos;équipe du BDE
              </h2>
              <div className="w-24 h-2 bg-grad-secondary mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                Des étudiants passionnés qui bossent dur pour vous faire kiffer votre année ! 💪
              </p>
            </div>

            <motion.div
              className={`mb-12 max-w-3xl mx-auto ${hardwareAcceleratedClasses}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={getTransition(0.8, 0.2)}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-red/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/images/team/groupe.jpg"
                  alt="L'équipe du BDE Sup'RNova"
                  width={900}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                  <p className="text-white text-xl md:text-2xl font-bold font-spartan text-center">
                    La team Sup&apos;RNova {settings.year} 🚀
                  </p>
                  <p className="text-white/90 text-center mt-1 text-sm md:text-base">
                    Ensemble pour faire vibrer le campus !
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-spartan text-gray-800">
                Rencontrez les membres du bureau 👇
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className={hardwareAcceleratedClasses}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={getTransition(0.5, index * 0.1)}
                  viewport={getViewportConfig()}
                  whileHover={{ scale: 1.05 }}
                >
                  <TeamCard member={member} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section background="gray" id="contact">
          <motion.div
            className={`max-w-4xl mx-auto ${hardwareAcceleratedClasses}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={getTransition(0.6)}
            viewport={getViewportConfig()}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-spartan mb-4 text-brand-red">
                📬 On reste en contact !
              </h2>
              <div className="w-24 h-2 bg-grad-secondary mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-700 font-medium">
                Une question ? Une idée ? N&apos;hésite pas à nous contacter ! 💬
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className={`bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform smooth-transition ${hardwareAcceleratedClasses}`}
                whileHover={{ y: -5 }}
                transition={getTransition(0.3)}
              >
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-xl font-bold font-spartan mb-3">Email</h3>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-brand-red hover:underline text-lg font-medium break-all"
                >
                  {settings.email}
                </a>
              </motion.div>

              {settings.instagram && (
                <motion.a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform smooth-transition block ${hardwareAcceleratedClasses}`}
                  whileHover={{ y: -5 }}
                  transition={getTransition(0.3)}
                >
                  <div className="flex justify-center mb-4">
                    <svg className="h-16 w-16" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: "#f09433" }} />
                          <stop offset="25%" style={{ stopColor: "#e6683c" }} />
                          <stop offset="50%" style={{ stopColor: "#dc2743" }} />
                          <stop offset="75%" style={{ stopColor: "#cc2366" }} />
                          <stop offset="100%" style={{ stopColor: "#bc1888" }} />
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-spartan mb-2">Instagram</h3>
                  <p className="text-gray-600 text-sm">Suis nos actus !</p>
                </motion.a>
              )}

              {settings.discord && (
                <motion.a
                  href={settings.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform smooth-transition block ${hardwareAcceleratedClasses}`}
                  whileHover={{ y: -5 }}
                  transition={getTransition(0.3)}
                >
                  <div className="flex justify-center mb-4">
                    <svg className="h-16 w-16" fill="#5865F2" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold font-spartan mb-2">Discord</h3>
                  <p className="text-gray-600 text-sm">Rejoins la communauté !</p>
                </motion.a>
              )}
            </div>
          </motion.div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

