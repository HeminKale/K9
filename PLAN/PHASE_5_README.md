# Phase 5: Social Proof — Status Report

**Status:** Complete

## Goal (per BUILD_PLAN.md)

Build trust through testimonials and results. Testimonials carousel working,
before/after cards visible, gallery responsive.

## What was built

- **`components/sections/BeforeAfter.tsx`** — replaces the "Before & After"
  placeholder (`id="before-after"`). Renders the 6 entries from
  `beforeAfterExamples` in `lib/constants.ts` as cards in a
  `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` layout. Each card has a
  "Before" panel and an "After" panel divided by an arrow icon that's
  horizontal on desktop and rotated 90° on mobile (`rotate-90 sm:rotate-0`),
  so the card stacks vertically (before → after) on narrow screens instead
  of squeezing two columns. Cards use `whileHover={{ scale: 1.03 }}` plus a
  shadow transition, matching the `Services` card pattern.
- **`components/sections/Testimonials.tsx`** — replaces the "Testimonials"
  placeholder (`id="testimonials"`). Built on the existing shadcn
  `components/ui/carousel.tsx` wrapper (which itself wraps
  `embla-carousel-react`, already installed) rather than calling
  `useEmblaCarousel` directly, to reuse the project's existing carousel
  primitives. Each slide shows an avatar placeholder, a ★-row sized to the
  testimonial's `rating`, a quote icon, the quote, and the reviewer's name +
  dog. Prev/next arrow buttons (`CarouselPrevious`/`CarouselNext`, hidden
  below `sm` to avoid overflowing narrow viewports) sit outside the card;
  dot indicators below are driven by the carousel's `api` via `setApi` +
  an `on("select", ...)` subscription, clicking a dot calls
  `api.scrollTo(index)`. Section fades in on scroll like other sections.
- **`components/sections/SuccessGallery.tsx`** — replaces the "Success
  Gallery" placeholder (`id="gallery"`). `lib/constants.ts` had no gallery
  data, so a new `GalleryItem` type + `galleryItems` array (9 entries, each
  `{ id, caption, category }`) was added there. Renders a
  `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` grid of square gradient
  placeholder tiles (same visual treatment as `Services`/`Blog`
  placeholders) with a camera icon; on hover, a gradient overlay fades in
  from the bottom showing the item's category and caption
  (`opacity-0 group-hover:opacity-100`).
- Wired all three into `app/page.tsx` in place of their placeholder
  sections.

## Verification performed

No project skill for running/screenshotting this app existed yet (same gap
noted in Phases 2–4), so a Playwright script was set up ad hoc:

- `npx tsc --noEmit` — clean.
- `npx eslint` on all changed files — caught and fixed one issue:
  `Testimonials.tsx` originally called `setSelected(...)` synchronously
  inside a `useEffect` body to seed the initial dot state, which trips the
  `react-hooks/set-state-in-effect` rule. Fixed by relying on the
  carousel's default start index (0, matches `useState(0)`'s initial value)
  and only calling `setSelected` from inside the `api.on("select", ...)`
  subscription callback, not synchronously in the effect body.
- Playwright (installed ad hoc via `npm install --no-save --no-package-lock
  playwright`, so `package.json`/lockfile are untouched — confirmed via
  `git diff --stat`) drove a headless Chromium against `npm run dev`:
  - Desktop (1440×900) and mobile (390×844), light and dark mode — all four
    combinations screenshotted at `#before-after`, `#testimonials`, and
    `#gallery`. Dark mode reached via `localStorage`'s `theme` key + reload.
  - Interaction pass: clicked the testimonial carousel's next arrow (slide
    advanced), clicked the 4th dot indicator (jumped directly to that
    slide), and hovered the first gallery tile (overlay caption/category
    faded in as expected).
  - `console` (`error` type) and `pageerror` listeners checked across every
    navigation and interaction — zero errors throughout.

## Known non-blocking items / still placeholder

- `SuccessGallery` tiles use gradient blocks with a camera icon in place of
  real training photos/videos, consistent with the rest of the site's
  placeholder imagery.
- `galleryItems` categories/captions are illustrative placeholder copy, not
  tied to real client photos.
- Floating Call/WhatsApp buttons continue to overlap bottom-right content on
  some scroll positions across all sections — pre-existing behavior from
  earlier phases, not something introduced or fixed here.
- Recommend running `/run-skill-generator` to capture a proper project
  skill for running + screenshotting this app — this is the fourth phase in
  a row that had to rebuild the verification harness ad hoc.

## Next

Phase 6 — FAQ, Pricing, Blog, and Final CTA sections.
