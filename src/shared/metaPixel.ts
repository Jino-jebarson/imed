declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = "2156821508207543";

export function isInternalPortal(): boolean {
  if (typeof window === "undefined") return false;
  const hash = (window.location.hash || "").toLowerCase();
  const path = (window.location.pathname || "").toLowerCase();
  return (
    hash.startsWith("#admin") ||
    hash.startsWith("#student") ||
    path.startsWith("/admin") ||
    path.startsWith("/student")
  );
}

// Auto-intercept window.fbq to guarantee zero events fire when inside admin or student portals.
// We intentionally do NOT wrap window.fbq here — doing so saves the initial pixel stub
// as realFbq, and if fbevents.js later replaces window.fbq with its own implementation,
// our wrapper would forward calls to the stale stub, silently losing events like Lead.
// Instead we rely on two lighter-weight guards:
//   1. isInternalPortal() check in every explicit track call below.
//   2. autoConfig:false in index.html so the pixel library's own auto-tracking is
//      disabled globally (no SubscribedButtonClick spam on admin/student during SPA nav).

export function trackPixelEvent(eventName: string, params?: Record<string, unknown>) {
  if (isInternalPortal()) return;
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

export function trackPixelCustomEvent(eventName: string, params?: Record<string, unknown>) {
  if (isInternalPortal()) return;
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("trackCustom", eventName, params);
    } else {
      window.fbq("trackCustom", eventName);
    }
  }
}

export function trackPixelPageView() {
  trackPixelEvent("PageView");
}

export function trackPixelLead(details?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}) {
  trackPixelEvent("Lead", details);
}

export function trackPixelContact(details?: {
  channel?: string;
  [key: string]: unknown;
}) {
  trackPixelEvent("Contact", details);
}
