/**
 * EXAMPLE: Fixed hover effects for PR #3
 * 
 * This file demonstrates the correct way to implement hover effects
 * that avoid the issues identified in PR3-ADDITIONAL-FIXES.md
 * 
 * Key improvements:
 * 1. Unified hover effects in Framer Motion (no mixing CSS and Framer)
 * 2. Explicit transition durations
 * 3. Proper easing functions
 * 4. Hardware acceleration hints
 */

import { motion } from "framer-motion";
import { hardwareAcceleratedClasses } from "@/utils/animation-enhanced";

// ✅ CORRECT: Presentation Section Card with fixed hover
export function PresentationCardFixed() {
  return (
    <motion.div
      className={`text-center p-6 bg-brand-pale/30 rounded-2xl transition-all ${hardwareAcceleratedClasses}`}
      whileHover={{ 
        y: -5, 
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="text-6xl mb-4">🤝</div>
      <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">Convivialité</h3>
      <p className="text-gray-700">
        Des moments de partage et de convivialité entre étudiants. On crée des souvenirs inoubliables ensemble ! ✨
      </p>
    </motion.div>
  );
}

// ❌ WRONG: Original implementation with conflicting hover effects
export function PresentationCardWrong() {
  return (
    <motion.div
      className="text-center p-6 bg-brand-pale/30 rounded-2xl hover:scale-105 transition-transform"
      whileHover={{ y: -5 }}  // ❌ No transition specified, conflicts with CSS
    >
      <div className="text-6xl mb-4">🤝</div>
      <h3 className="text-2xl font-bold font-spartan mb-3 text-brand-red">Convivialité</h3>
      <p className="text-gray-700">
        Des moments de partage et de convivialité entre étudiants.
      </p>
    </motion.div>
  );
}

// ✅ CORRECT: Event card with smooth hover
export function EventCardWrapperFixed({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className={hardwareAcceleratedClasses}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2, ease: "easeOut" }  // ✅ Explicit transition
      }}
    >
      {children}
    </motion.div>
  );
}

// ❌ WRONG: Original without hover transition
export function EventCardWrapperWrong({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}  // ❌ No transition = jarring snap
    >
      {children}
    </motion.div>
  );
}

// ✅ CORRECT: Contact card with unified hover animation
export function ContactCardFixed() {
  return (
    <motion.a
      href="mailto:bde@suprnova.fr"
      className={`bg-white p-8 rounded-2xl shadow-lg text-center block ${hardwareAcceleratedClasses}`}
      whileHover={{ 
        y: -5, 
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="text-5xl mb-4">📧</div>
      <h3 className="text-xl font-bold font-spartan mb-3">Email</h3>
      <p className="text-gray-600">bde@suprnova.fr</p>
    </motion.a>
  );
}

// ❌ WRONG: Original with conflicting effects
export function ContactCardWrong() {
  return (
    <motion.a
      href="mailto:bde@suprnova.fr"
      className="bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform block"
      whileHover={{ y: -5 }}  // ❌ Conflicts with CSS hover:scale-105
    >
      <div className="text-5xl mb-4">📧</div>
      <h3 className="text-xl font-bold font-spartan mb-3">Email</h3>
      <p className="text-gray-600">bde@suprnova.fr</p>
    </motion.a>
  );
}

// ✅ BONUS: Advanced hover with multiple states
export function AdvancedHoverCard() {
  return (
    <motion.div
      className={`bg-white p-6 rounded-xl shadow-md ${hardwareAcceleratedClasses}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: { 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1]  // Custom cubic bezier
        }
      }}
      whileTap={{ 
        scale: 0.98,  // Slight press effect
        transition: { duration: 0.1 }
      }}
    >
      <h3 className="font-bold text-lg mb-2">Advanced Card</h3>
      <p className="text-gray-600">With smooth hover and tap states</p>
    </motion.div>
  );
}

/**
 * Key Takeaways:
 * 
 * 1. NEVER mix CSS hover effects with Framer Motion whileHover
 *    - Choose one approach and stick with it
 *    - Framer Motion is preferred for consistency
 * 
 * 2. ALWAYS specify transition in whileHover
 *    - Without it, animations snap instantly
 *    - Use appropriate durations (0.2-0.3s for hover)
 * 
 * 3. USE proper easing functions
 *    - "easeOut" for hover effects
 *    - Custom bezier curves for fine control
 * 
 * 4. ADD hardware acceleration classes
 *    - Improves performance, especially on Windows
 *    - Use hardwareAcceleratedClasses from utils
 * 
 * 5. CONSIDER whileTap for interactive elements
 *    - Provides tactile feedback
 *    - Enhances perceived responsiveness
 */
