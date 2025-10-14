/**
 * Animation utilities for cross-platform compatibility
 * Optimizes animations for Windows browsers while maintaining quality on other platforms
 */

/**
 * Detects if the user is on Windows
 */
export function isWindows(): boolean {
  if (typeof window === "undefined") return false;
  return /Windows/.test(navigator.userAgent);
}

/**
 * Detects if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get optimized animation duration based on platform
 * Windows typically needs slightly longer durations for smoother animations
 */
export function getAnimationDuration(baseDuration: number): number {
  if (prefersReducedMotion()) return 0.01;
  if (isWindows()) return baseDuration * 1.15; // 15% longer on Windows
  return baseDuration;
}

/**
 * Get optimized spring configuration for Framer Motion
 * Windows browsers benefit from less stiff springs
 */
export function getOptimizedSpring(stiffness: number = 100, damping: number = 10) {
  if (prefersReducedMotion()) {
    return { type: "tween" as const, duration: 0.01 };
  }
  
  if (isWindows()) {
    return {
      type: "spring" as const,
      stiffness: stiffness * 0.85, // Reduce stiffness by 15%
      damping: damping * 1.1, // Increase damping by 10%
    };
  }
  
  return {
    type: "spring" as const,
    stiffness,
    damping,
  };
}

/**
 * Get optimized viewport settings for whileInView animations
 * Windows needs more margin to trigger animations smoothly
 */
export function getViewportConfig() {
  return {
    once: true,
    margin: isWindows() ? "0px 0px -100px 0px" : "0px 0px -50px 0px",
    amount: isWindows() ? 0.2 : 0.3,
  };
}

/**
 * Standard animation variants optimized for cross-platform use
 */
export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
};

/**
 * Get transition config optimized for the platform
 */
export function getTransition(duration: number, delay: number = 0, type: "tween" | "spring" = "tween") {
  if (prefersReducedMotion()) {
    return { duration: 0.01, delay: 0 };
  }

  const optimizedDuration = getAnimationDuration(duration);
  
  if (type === "spring") {
    const springConfig = getOptimizedSpring();
    return { ...springConfig, delay };
  }
  
  return {
    duration: optimizedDuration,
    delay,
    ease: isWindows() ? [0.4, 0.0, 0.2, 1] : [0.4, 0.0, 0.2, 1], // Cubic bezier for smooth transitions
  };
}

/**
 * CSS class names for hardware acceleration
 * Helps with animation performance on Windows
 */
export const hardwareAcceleratedClasses = "will-change-transform transform-gpu";
