export type PublicEventName =
  | "page_view"
  | "app_store_click"
  | "pricing_plan_click"
  | "creator_cta"
  | "creator_form_start"
  | "creator_submission";

export type EventDetails = Record<string, string | number | boolean | null>;

export function trackEvent(event: PublicEventName, details: EventDetails = {}) {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    event,
    path: window.location.pathname,
    details,
    utm: Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
        .map((key) => [key, new URLSearchParams(window.location.search).get(key)])
        .filter(([, value]) => Boolean(value)),
    ),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  });
}
