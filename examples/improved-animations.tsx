/**
 * EXAMPLE: Improved animation transitions for PR #3
 * 
 * This file demonstrates how to create more natural, varied animations
 * that don't feel mechanical or robotic.
 * 
 * Key principles:
 * 1. Vary animation durations
 * 2. Use different easing curves for different elements
 * 3. Add subtle spring physics where appropriate
 * 4. Create visual hierarchy with timing
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  getTransition, 
  getOptimizedSpring, 
  hardwareAcceleratedClasses,
  staggerConfig 
} from "@/utils/animation-enhanced";

// ✅ CORRECT: Hero section with varied, natural animations
export function HeroSectionFixed() {
  return (
    <div className="relative z-10 text-center">
      {/* Logo - bouncy entrance with spring physics */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          ...getOptimizedSpring(100, 15),  // Bouncy spring
          delay: 0.1 
        }}
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

      {/* Title - snappy, energetic entrance */}
      <motion.h1
        className={`text-5xl font-bold font-spartan text-white mb-6 ${hardwareAcceleratedClasses}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition(0.6, 0.2, "tween", "snappy")}
      >
        BDE Sup&apos;RNova
      </motion.h1>

      {/* Subtitle - smooth, flowing entrance */}
      <motion.p
        className={`text-2xl text-white/95 mb-4 font-bold ${hardwareAcceleratedClasses}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition(0.8, 0.4, "tween", "gentle")}
      >
        Ta vie étudiante à 100% ! 🚀
      </motion.p>

      {/* Description - gentle fade in */}
      <motion.p
        className={`text-lg text-white/90 max-w-3xl mx-auto mb-10 ${hardwareAcceleratedClasses}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition(0.8, 0.5, "tween", "easeOut")}
      >
        Soirées de folie 🎉 • Partenaires 🤝 • Événements inoubliables 🎊
      </motion.p>

      {/* Buttons - quick, responsive appearance */}
      <motion.div
        className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${hardwareAcceleratedClasses}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition(0.5, 0.6, "tween", "sharp")}
      >
        <button className="px-6 py-3 bg-white text-brand-red rounded-lg font-bold hover:scale-105 transition-transform">
          🔥 Voir les événements
        </button>
      </motion.div>
    </div>
  );
}

// ❌ WRONG: Original with monotonous animations
export function HeroSectionWrong() {
  return (
    <div className="relative z-10 text-center">
      {/* Everything uses the same duration and easing - feels robotic */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}  // ❌ No damping
        className="mb-6"
      >
        <Image
          src="/images/assets/Logo couleur.png"
          alt="Logo"
          width={200}
          height={200}
        />
      </motion.div>

      <motion.h1
        className="text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}  // ❌ Same as everything else
      >
        BDE Sup&apos;RNova
      </motion.h1>

      <motion.p
        className="text-2xl text-white/95 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}  // ❌ Still the same
      >
        Ta vie étudiante à 100% ! 🚀
      </motion.p>
    </div>
  );
}

// ✅ CORRECT: Card grid with sophisticated stagger
export function EventCardsGridFixed({ events }: { events: any[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: staggerConfig.medium,  // ✅ Built-in stagger config
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {events.map((event) => (
        <motion.div
          key={event.id}
          className={hardwareAcceleratedClasses}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: getTransition(0.5, 0, "tween", "easeOut")
            }
          }}
          whileHover={{ 
            scale: 1.03,
            y: -5,
            transition: getTransition(0.2, 0, "tween", "easeOut")
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ❌ WRONG: Linear stagger with manual index calculation
export function EventCardsGridWrong({ events }: { events: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}  // ❌ Linear, mechanical
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}  // ❌ No transition on hover
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ✅ CORRECT: Presentation cards with personality
export function PresentationCardsFixed() {
  const cards = [
    { icon: "🤝", title: "Convivialité", description: "Des moments de partage" },
    { icon: "🎉", title: "Événements", description: "Des soirées inoubliables" },
    { icon: "💪", title: "Engagement", description: "Une équipe au top" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`text-center p-6 bg-brand-pale/30 rounded-2xl ${hardwareAcceleratedClasses}`}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={getTransition(0.6, index * 0.15, "tween", "easeOut")}  // ✅ Stagger with delay
          viewport={{ once: true }}
          whileHover={{ 
            y: -5, 
            scale: 1.05,
            transition: getTransition(0.3, 0, "tween", "gentle")  // ✅ Smooth hover
          }}
        >
          <div className="text-6xl mb-4">{card.icon}</div>
          <h3 className="text-2xl font-bold mb-3 text-brand-red">{card.title}</h3>
          <p className="text-gray-700">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ✅ BONUS: Interactive button with multiple states
export function InteractiveButtonFixed() {
  return (
    <motion.button
      className={`px-8 py-4 bg-brand-red text-white rounded-xl font-bold text-lg ${hardwareAcceleratedClasses}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={getTransition(0.5, 0, "spring")}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        transition: getTransition(0.2, 0, "tween", "sharp")
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      🎉 Acheter la carte
    </motion.button>
  );
}

// ✅ BONUS: Scroll reveal with cascade effect
export function CascadeRevealSection() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          }
        }
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item}
          className={`p-6 mb-4 bg-white rounded-lg shadow-md ${hardwareAcceleratedClasses}`}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: getTransition(0.6, 0, "tween", "easeOut")
            }
          }}
        >
          <h3 className="font-bold">{item}</h3>
          <p className="text-gray-600">Content for {item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Key Takeaways:
 * 
 * 1. VARY animation durations
 *    - Important elements: shorter (0.5-0.6s)
 *    - Decorative elements: longer (0.8-1s)
 *    - Creates visual hierarchy
 * 
 * 2. USE different easing for different purposes
 *    - Hero title: "snappy" for impact
 *    - Body text: "gentle" for readability
 *    - Buttons: "sharp" for responsiveness
 *    - Cards: "easeOut" for smoothness
 * 
 * 3. ADD spring physics sparingly
 *    - Great for logos and important elements
 *    - Adds personality and playfulness
 *    - Don't overuse - can feel bouncy
 * 
 * 4. USE staggerChildren over manual delays
 *    - Cleaner code
 *    - Better performance
 *    - More maintainable
 * 
 * 5. ALWAYS add transitions to hover states
 *    - Makes interactions feel polished
 *    - Prevents jarring snaps
 *    - Use shorter durations (0.2-0.3s)
 * 
 * 6. CONSIDER motion hierarchy
 *    - Main content appears first
 *    - Supporting content follows
 *    - Decorative elements last
 */
