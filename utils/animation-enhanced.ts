/**
 * Enhanced animation utilities with easing presets and mobile optimization
 * 
 * This is an enhanced version of animation.ts with additional features:
 * - Multiple easing presets for varied animation feel
 * - Mobile device optimization
 * - Better performance on resource-constrained devices
 */

/**
 * Detects if the user is on Windows
 */
export function isWindows(): boolean {
  if (typeof window === "undefined") return false;
  return /Windows/.test(navigator.userAgent);
}

/**
 * Detects if the user is on a mobile device
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;
}

/**
 * Detects if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Easing presets for different animation personalities
 */
export const easingPresets = {
  // Smooth, natural deceleration - good for most animations
  easeOut: [0.4, 0, 0.2, 1],
  
  // Smooth acceleration and deceleration - good for page transitions
  easeInOut: [0.4, 0, 0.6, 1],
  
  // Quick start, smooth end - good for exit animations
  easeIn: [0.4, 0, 1, 1],
  
  // Sharp, responsive - great for buttons and interactive elements
  sharp: [0.4, 0, 0.2, 1],
  
  // Playful bounce effect - great for celebratory animations
  bounce: [0.68, -0.55, 0.265, 1.55],
  
  // Gentle, flowing motion - good for subtle effects
  gentle: [0.25, 0.1, 0.25, 1],
  
  // Snappy, energetic - good for hero elements
  snappy: [0.6, 0.01, 0.05, 0.95],
} as const;

export type EasingPreset = keyof typeof easingPresets;

/**
 * Get optimized animation duration based on platform
 * Windows needs slightly longer durations, mobile needs shorter
 */
export function getAnimationDuration(baseDuration: number): number {
  if (prefersReducedMotion()) return 0.01;
  if (isMobile()) return baseDuration * 0.7; // 30% faster on mobile
  if (isWindows()) return baseDuration * 1.15; // 15% longer on Windows
  return baseDuration;
}

/**
 * Get optimized spring configuration for Framer Motion
 * Adjusts spring parameters based on platform and device capabilities
 */
export function getOptimizedSpring(stiffness: number = 100, damping: number = 10) {
  if (prefersReducedMotion()) {
    return { type: "tween" as const, duration: 0.01 };
  }
  
  // Mobile devices: less bouncy springs for better performance
  if (isMobile()) {
    return {
      type: "spring" as const,
      stiffness: stiffness * 0.8,
      damping: damping * 1.2,
    };
  }
  
  // Windows: softer springs for smoother animations
  if (isWindows()) {
    return {
      type: "spring" as const,
      stiffness: stiffness * 0.85,
      damping: damping * 1.1,
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
 * Adjusts based on platform for better scroll performance
 */
export function getViewportConfig() {
  return {
    once: true,
    margin: isWindows() 
      ? "0px 0px -100px 0px" 
      : isMobile()
        ? "0px 0px -30px 0px"  // Less margin on mobile
        : "0px 0px -50px 0px",
    amount: isWindows() ? 0.2 : isMobile() ? 0.15 : 0.3,
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
 * Get transition config optimized for the platform with easing presets
 * 
 * @param duration - Base duration in seconds
 * @param delay - Delay before animation starts in seconds
 * @param type - Animation type (tween or spring)
 * @param easing - Easing preset name
 * 
 * @example
 * // Snappy button animation
 * transition={getTransition(0.3, 0, "tween", "sharp")}
 * 
 * // Gentle card hover
 * transition={getTransition(0.4, 0, "tween", "gentle")}
 * 
 * // Bouncy logo entrance
 * transition={getTransition(0.8, 0.1, "spring")}
 */
export function getTransition(
  duration: number, 
  delay: number = 0, 
  type: "tween" | "spring" = "tween",
  easing: EasingPreset = "easeOut"
) {
  if (prefersReducedMotion()) {
    return { duration: 0.01, delay: 0 };
  }

  const optimizedDuration = getAnimationDuration(duration);
  const optimizedDelay = isMobile() ? delay * 0.5 : delay; // Reduce delays on mobile
  
  if (type === "spring") {
    const springConfig = getOptimizedSpring();
    return { ...springConfig, delay: optimizedDelay };
  }
  
  return {
    duration: optimizedDuration,
    delay: optimizedDelay,
    ease: easingPresets[easing],
  };
}

/**
 * Get responsive transition with automatic mobile optimization
 * Alias for getTransition with better naming for responsive contexts
 */
export const getResponsiveTransition = getTransition;

/**
 * CSS class names for hardware acceleration
 * Helps with animation performance especially on Windows
 */
export const hardwareAcceleratedClasses = "will-change-transform transform-gpu";

/**
 * Hover animation presets
 * Use these for consistent hover effects across the site
 */
export const hoverPresets = {
  // Subtle lift and scale
  lift: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: easingPresets.easeOut },
  },
  
  // More pronounced lift for cards
  liftCard: {
    y: -8,
    scale: 1.03,
    transition: { duration: 0.3, ease: easingPresets.gentle },
  },
  
  // Scale only (good for buttons)
  scale: {
    scale: 1.05,
    transition: { duration: 0.2, ease: easingPresets.sharp },
  },
  
  // Gentle pulse (good for icons)
  pulse: {
    scale: 1.1,
    transition: { duration: 0.3, ease: easingPresets.bounce },
  },
};

/**
 * Stagger animation configuration
 * Use with Framer Motion's staggerChildren
 */
export const staggerConfig = {
  // Quick stagger for small lists
  fast: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
  
  // Medium stagger for most cases
  medium: {
    staggerChildren: 0.12,
    delayChildren: 0.2,
  },
  
  // Slow, dramatic stagger
  slow: {
    staggerChildren: 0.2,
    delayChildren: 0.3,
  },
};

/**
 * Performance monitoring utility (development only)
 * Logs animation performance for optimization
 */
export function logAnimationPerformance(name: string, duration: number): void {
  // Only log in development mode (check for localhost or dev environment)
  if (typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    const performanceData = {
      name,
      duration,
      platform: isWindows() ? 'Windows' : isMobile() ? 'Mobile' : 'Desktop',
      reducedMotion: prefersReducedMotion(),
    };
    console.log('🎬 Animation Performance:', performanceData);
  }
}
