/**
 * Privacy-respecting analytics stub.
 *
 * Set VITE_ANALYTICS_ID (your Umami website ID) and optionally
 * VITE_ANALYTICS_URL (your Umami instance URL) in your .env to activate.
 *
 * Umami is cookie-free and GDPR-compliant by default.
 * The script is loaded asynchronously and does not block rendering.
 */

const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID ?? "";
const ANALYTICS_URL =
  import.meta.env.VITE_ANALYTICS_URL ?? "https://cloud.umami.is";

let loaded = false;

/** Load the Umami analytics script (idempotent). */
export function initAnalytics(): void {
  if (loaded || !ANALYTICS_ID) return;
  loaded = true;

  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-website-id", ANALYTICS_ID);
  script.src = `${ANALYTICS_URL}/script.js`;
  document.head.appendChild(script);
}

/** Track a named event (no-op when analytics is disabled). */
export function trackEvent(name: string, data?: Record<string, string>): void {
  if (!ANALYTICS_ID) return;
  try {
    // Umami exposes a global `umami` object after the script loads.
    const umami = (window as unknown as { umami?: { track: (name: string, data?: Record<string, string>) => void } }).umami;
    umami?.track(name, data);
  } catch {
    // silently ignore if Umami hasn't loaded yet
  }
}
