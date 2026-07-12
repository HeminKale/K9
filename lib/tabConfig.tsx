import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HomeHighlights } from "@/components/sections/HomeHighlights";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { SuccessGallery } from "@/components/sections/SuccessGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrainingProcess } from "@/components/sections/TrainingProcess";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

// SuccessGallery is shown on both the Home and Results tabs. Each instance
// needs its own DOM id (duplicate `id` attributes are invalid HTML), so the
// Home copy gets a distinct section id via this wrapper — content/layout are
// identical, only the id differs.
function SuccessGalleryHome() {
  return <SuccessGallery sectionId="gallery-home" />;
}

// Every section component, keyed by its section id. Content/props are
// untouched — this is only a lookup so tabGroups below can reference
// sections by id instead of importing components directly.
export const sectionComponents = {
  hero: Hero,
  "home-highlights": HomeHighlights,
  about: About,
  "why-choose-us": WhyChooseUs,
  services: Services,
  process: TrainingProcess,
  "before-after": BeforeAfter,
  testimonials: Testimonials,
  gallery: SuccessGallery,
  "gallery-home": SuccessGalleryHome,
  faq: FAQ,
  pricing: Pricing,
  blog: Blog,
  "final-cta": FinalCTA,
  contact: Contact,
} as const;

export type SectionId = keyof typeof sectionComponents;

export type TabGroup = {
  id: string;
  label: string;
  sections: SectionId[];
};

// Draft grouping for the tab-based layout. Content is unchanged — this array
// only controls which sections are shown together under which tab. Re-order,
// rename, or reshuffle `sections` here to change the grouping; no other file
// needs to change.
export const tabGroups: TabGroup[] = [
  { id: "home", label: "Home", sections: ["hero", "home-highlights", "gallery-home"] },
  { id: "about", label: "About Us", sections: ["about", "why-choose-us"] },
  { id: "services", label: "Services", sections: ["services", "process"] },
  {
    id: "results",
    label: "Results",
    sections: ["before-after", "testimonials", "gallery"],
  },
  { id: "pricing", label: "Pricing & FAQ", sections: ["pricing", "faq", "blog"] },
  { id: "contact", label: "Contact", sections: ["final-cta", "contact"] },
];
