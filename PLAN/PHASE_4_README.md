# Phase 4: Services & Process — Status Report

**Status:** Complete

## Goal (per BUILD_PLAN.md)

Show what's offered and how it works. Services, benefits, and process flow all
visible; grid layouts responsive.

## What was built

- **`components/sections/WhyChooseUs.tsx`** — replaces the "Why Choose Us"
  placeholder (`id="why-choose-us"`). Renders the 8 entries from `whyChooseUs`
  in `lib/constants.ts` as cards in a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
  layout (stacks to one column on mobile, 2x4 on tablet, 4x2/"2x4" on desktop).
  Each card has an icon in a rounded tile, title, and description, with a
  `whileHover={{ y: -6 }}` spring lift plus a shadow transition. Section
  heading fades up on scroll via `whileInView`, same pattern as `About`.
- **`components/sections/Services.tsx`** — replaces the "Services" placeholder
  (`id="services"`). Renders the 10 entries from `services` as cards in a
  `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` layout. Each card has a gradient
  image-placeholder header (standing in for a real photo) with the service's
  Lucide icon centered, then title, description, and a "Learn More" button
  (`href="#"`, detail pages aren't built yet). Cards use `whileHover={{ scale:
  1.03 }}` plus a shadow transition; the icon itself also scales slightly on
  hover via a Tailwind `group-hover` transform.
- **`components/sections/TrainingProcess.tsx`** — replaces the "Training
  Process" placeholder (`id="process"`). Renders the 6 entries from
  `processSteps` as a timeline: a vertical stack connected by short vertical
  lines on mobile, and a horizontal row connected by lines between step
  circles on desktop (`md:flex-row`). Each step has a numbered circle with an
  icon (icons aren't in `processSteps`, so a local `stepIcons` array maps one
  per step by index), a "Step N" label, title, and description. Circles and
  connector lines fade/slide up on scroll with a per-step stagger delay.
- Wired all three into `app/page.tsx` in place of their placeholder sections.

## Bugs found and fixed during the build (via actual browser verification)

1. **`TrainingProcess` steps 5 and 6 rendered fully transparent on desktop.**
   First screenshot pass showed only 4 of 6 steps, with step 4 faded — looked
   like a flexbox overflow bug (items refusing to shrink below their text's
   intrinsic width, a real risk with `md:flex-1` on multi-line text items).
   Added `min-w-0`/explicit `grow`/`shrink`/`basis-0` to rule that out, but the
   screenshot was unchanged, so the layout was inspected directly via
   `getBoundingClientRect()` in the page instead of guessing further — all 6
   items and 5 connectors were in fact laid out correctly within the
   container, evenly spaced, no overflow. The real cause: `whileInView` had a
   per-step stagger (`index * 0.1`s delay + 0.6s duration), so step 6 needed
   ~1.1s after entering the viewport to reach full opacity, and the
   verification script only waited 400ms after scrolling before capturing.
   Fixed the test, not the component — increased the post-scroll settle wait
   to 1200ms, and all 6 steps now show at full opacity in both light and dark
   mode. (The `min-w-0`/explicit flex-property changes were harmless and kept,
   since they make the row's shrink behavior explicit rather than relying on
   `flex-1`'s implicit basis, but they were not the fix.)

## Verification performed

Reused the ad hoc Playwright setup from Phase 3 (no project skill for
running/screenshotting this app exists yet — same gap noted in Phases 2 and 3):

- `npx tsc --noEmit` — clean.
- `npx eslint` on all changed files — zero errors.
- Desktop (1440×900) and mobile (390×844), light and dark mode — all four
  combinations screenshotted at `#why-choose-us`, `#services`, and `#process`,
  including the fix-and-recheck cycle for the `TrainingProcess` timing issue
  above.
- Dark mode reached via `localStorage`'s `theme` key (matches next-themes'
  storage key), then a reload.
- Hover states spot-checked on desktop for the first `WhyChooseUs` card and
  first `Services` card (lift/scale + shadow transition fires, no layout
  shift).
- `console` (`error` type) and `pageerror` listeners checked on every page load
  — zero errors across all four device/theme combinations.

Recommend running `/run-skill-generator` to capture a proper project skill for
this (dev server + Playwright screenshot loop) — this is the third phase in a
row that had to rebuild the harness ad hoc.

## Known non-blocking items / still placeholder

- `Services` cards use gradient blocks with a centered icon in place of real
  service photos, consistent with the rest of the site's placeholder imagery.
- "Learn More" buttons link to `#` — service detail pages aren't built yet,
  per the plan.
- `TrainingProcess` step icons are a local mapping by array index, not part of
  `lib/constants.ts`'s `ProcessStep` type — if the step order in
  `processSteps` changes, `stepIcons` must be updated to match.
- Floating Call/WhatsApp buttons continue to overlap bottom-right content on
  some scroll positions across all sections — pre-existing Phase 2 behavior,
  not something introduced or fixed here.

## Next

Phase 5 — Before & After, Testimonials, and Success Gallery sections.
