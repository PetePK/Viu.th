/**
 * Detect if the current device is a touch/mobile device (iPad, phone, tablet).
 * Desktop browsers get unmuted autoplay; touch devices get muted for instant play.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // iPad Safari reports as Mac, so also check for multi-touch on "Mac"
  const isIPad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;

  // Standard mobile/tablet detection
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return hasTouch || isIPad || isMobile;
}
