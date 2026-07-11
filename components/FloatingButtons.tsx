import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { business } from "@/lib/constants";

export function FloatingButtons() {
  const whatsappHref = `https://wa.me/${business.whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <a
        href={business.phoneHref}
        aria-label={`Call ${business.name}`}
        className="flex size-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-700"
      >
        <Phone className="size-6" />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message ${business.name} on WhatsApp`}
        className="flex size-14 items-center justify-center rounded-full bg-success-500 text-white shadow-lg transition-transform hover:scale-105 hover:bg-success-600"
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
