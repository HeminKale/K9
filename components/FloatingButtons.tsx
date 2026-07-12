"use client";

import { Phone } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { business } from "@/lib/constants";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href={business.phoneHref}
        aria-label={`Call ${business.name}`}
        onClick={() =>
          trackEvent("cta_click", {
            cta_label: "Call",
            cta_location: "floating_button",
          })
        }
        className="flex size-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-700"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
