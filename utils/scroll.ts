/**
 * Smooth scroll utility that prevents flickering on Windows
 * 
 * This utility provides a JavaScript-based smooth scrolling implementation
 * that works consistently across all browsers and platforms, avoiding the
 * conflicts between CSS smooth-scroll and JavaScript scrollTo that cause
 * flickering on Windows browsers.
 */

/**
 * Easing function for smooth deceleration
 * Uses cubic easing for natural-feeling motion
 */
function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

/**
 * Smooth scroll to an element by ID with offset
 * 
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from top in pixels (default: 80 for header)
 * @param duration - Duration of scroll animation in ms (default: 800)
 * 
 * @example
 * smoothScrollTo("presentation"); // Scroll to #presentation with 80px offset
 * smoothScrollTo("contact", 100, 1000); // Custom offset and duration
 */
export function smoothScrollTo(
  elementId: string, 
  offset: number = 80,
  duration: number = 800
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  // Add class to disable CSS smooth scroll temporarily
  // This prevents double-smoothing that causes flickering
  document.documentElement.classList.add('js-scrolling');

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Apply easing for smooth motion
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      // Re-enable CSS smooth scroll after animation completes
      document.documentElement.classList.remove('js-scrolling');
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Scroll to top of page smoothly
 * 
 * @param duration - Duration of scroll animation in ms (default: 800)
 * 
 * @example
 * scrollToTop(); // Smooth scroll to top
 * scrollToTop(500); // Faster scroll to top
 */
export function scrollToTop(duration: number = 800): void {
  document.documentElement.classList.add('js-scrolling');

  const startPosition = window.pageYOffset;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition * (1 - easedProgress));

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      document.documentElement.classList.remove('js-scrolling');
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Check if element is in viewport
 * Useful for triggering animations or lazy loading
 * 
 * @param elementId - The ID of the element to check
 * @param offset - Extra offset for checking (default: 0)
 * @returns boolean indicating if element is in viewport
 */
export function isElementInViewport(elementId: string, offset: number = 0): boolean {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top >= -offset &&
    rect.bottom <= windowHeight + offset
  );
}
