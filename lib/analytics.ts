"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParams = Record<string, string | number | boolean>;

/**
 * No-ops when NEXT_PUBLIC_GA_MEASUREMENT_ID isn't set, so CTA/form handlers
 * can call this unconditionally without checking whether GA4 is configured.
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  sendGAEvent("event", eventName, params);
}
