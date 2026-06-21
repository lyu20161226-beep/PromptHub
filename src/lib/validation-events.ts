"use client";

export type ValidationEventName =
  | "workflow_view"
  | "workflow_click"
  | "workflow_copy"
  | "search"
  | "feedback"
  | "survey";

type EventProperties = Record<string, string | number | boolean | undefined>;

const SESSION_KEY = "prompthub:validation-session";
const FALLBACK_KEY = "prompthub:validation-fallback";

function getSessionId() {
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const sessionId = crypto.randomUUID().slice(0, 12);
  window.localStorage.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

function saveFallback(payload: object) {
  try {
    const existing = JSON.parse(window.localStorage.getItem(FALLBACK_KEY) ?? "[]") as object[];
    window.localStorage.setItem(FALLBACK_KEY, JSON.stringify([...existing.slice(-49), payload]));
  } catch {
    window.localStorage.setItem(FALLBACK_KEY, JSON.stringify([payload]));
  }
}

export function getPageSource() {
  if (!document.referrer) return "direct";

  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? referrer.pathname : referrer.hostname;
  } catch {
    return "unknown";
  }
}

export async function recordValidationEvent(event: ValidationEventName, properties: EventProperties = {}) {
  const payload = {
    event,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    path: window.location.pathname,
    properties
  };

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) saveFallback(payload);
  } catch {
    saveFallback(payload);
  }
}
