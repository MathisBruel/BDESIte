/**
 * EXAMPLE: Fixed scroll implementation for PR #3
 * 
 * This file demonstrates how to properly implement smooth scrolling
 * that prevents flickering on Windows browsers.
 * 
 * The key issue: CSS smooth-scroll and JavaScript scrollTo() conflict,
 * causing double-smoothing and flickering on Windows.
 */

"use client";

import { smoothScrollTo, scrollToTop } from "@/utils/scroll";

// ✅ CORRECT: Hero scroll button with fixed implementation
export function HeroScrollButtonFixed() {
  return (
    <button
      onClick={() => smoothScrollTo("presentation")}
      className="text-white text-4xl hover:scale-125 transition-transform"
      aria-label="Défiler vers le bas"
    >
      ⬇️
    </button>
  );
}

// ❌ WRONG: Original implementation that causes flickering
export function HeroScrollButtonWrong() {
  return (
    <button
      onClick={() => {
        const element = document.getElementById("presentation");
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" }); // ❌ Conflicts with CSS
        }
      }}
      className="text-white text-4xl hover:scale-125 transition-transform"
      aria-label="Défiler vers le bas"
    >
      ⬇️
    </button>
  );
}

// ✅ CORRECT: Event section button with fixed scroll
export function ViewEventsButtonFixed() {
  return (
    <button
      onClick={() => smoothScrollTo("evenements")}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-grad-secondary text-white font-chunk text-lg uppercase tracking-wide hover:scale-110 focus:ring-brand-yellow shadow-lg hover:shadow-xl bg-white text-brand-red hover:bg-white/90"
    >
      🔥 Voir les événements
    </button>
  );
}

// ❌ WRONG: Original with flickering scroll
export function ViewEventsButtonWrong() {
  return (
    <button
      onClick={() => {
        const element = document.getElementById("evenements");
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" }); // ❌ Flickering
        }
      }}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-grad-secondary text-white font-chunk text-lg uppercase tracking-wide hover:scale-110 focus:ring-brand-yellow shadow-lg hover:shadow-xl bg-white text-brand-red hover:bg-white/90"
    >
      🔥 Voir les événements
    </button>
  );
}

// ✅ CORRECT: Fixed Header scroll handler
export function useFixedScrollHandler() {
  const handleScroll = (e: React.MouseEvent, scrollTo: string, href: string) => {
    e.preventDefault();
    
    // For external pages, navigate normally
    if (!href.startsWith("/#")) {
      window.location.href = href;
      return;
    }
    
    // For same-page anchors, use smooth scroll utility
    if (scrollTo === "top") {
      scrollToTop();
    } else {
      smoothScrollTo(scrollTo);
    }
  };
  
  return handleScroll;
}

// ❌ WRONG: Original Header implementation with complex logic
export function useWrongScrollHandler() {
  const handleScroll = (e: React.MouseEvent, scrollTo: string, href: string) => {
    e.preventDefault();
    
    // Complex pathname checking that can fail
    const pathname = window.location.pathname;
    
    if (pathname !== "/") {
      window.location.href = href;
      setTimeout(() => {  // ❌ setTimeout is unreliable
        if (scrollTo === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.getElementById(scrollTo);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" }); // ❌ Flickering
          }
        }
      }, 100);
    } else {
      if (scrollTo === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" }); // ❌ Flickering
      } else {
        const element = document.getElementById(scrollTo);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" }); // ❌ Flickering
        }
      }
    }
  };
  
  return handleScroll;
}

// ✅ BONUS: Scroll with callback
export function ScrollWithCallback() {
  const handleScrollWithAction = () => {
    smoothScrollTo("presentation");
    
    // Can add callback after scroll completes
    setTimeout(() => {
      console.log("Scroll completed!");
      // Trigger analytics, animations, etc.
    }, 800); // Match scroll duration
  };
  
  return (
    <button onClick={handleScrollWithAction}>
      Scroll with Action
    </button>
  );
}

/**
 * CSS Changes Required (app/globals.css):
 * 
 * Add this to prevent double-smoothing:
 * 
 * ```css
 * html {
 *   scroll-behavior: smooth;
 * }
 * 
 * html.js-scrolling {
 *   scroll-behavior: auto;
 * }
 * ```
 * 
 * The .js-scrolling class is automatically added/removed by smoothScrollTo()
 */

/**
 * Key Takeaways:
 * 
 * 1. NEVER use window.scrollTo with behavior: "smooth" when CSS smooth-scroll is enabled
 *    - Causes double-smoothing and flickering on Windows
 *    - Use custom JavaScript implementation instead
 * 
 * 2. USE requestAnimationFrame for smooth animations
 *    - Better performance than setTimeout
 *    - More reliable timing
 *    - GPU-accelerated
 * 
 * 3. DISABLE CSS smooth-scroll during JavaScript scrolling
 *    - Add .js-scrolling class to html element
 *    - Remove after animation completes
 * 
 * 4. CONSIDER easing functions for natural motion
 *    - easeInOutCubic provides smooth acceleration/deceleration
 *    - Feels more natural than linear scrolling
 * 
 * 5. AVOID setTimeout for scroll operations
 *    - Unreliable timing
 *    - Doesn't guarantee element is loaded/rendered
 *    - Use callbacks or promises instead
 */
