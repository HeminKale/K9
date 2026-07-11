# Phase 6: FAQ, Pricing, Blog, CTA — Status Report

**Status:** Complete

## Goal (per BUILD_PLAN.md)

Answer objections and encourage action. All sections visible, ready for
form integration.

## What was built

- **`components/sections/FAQ.tsx`** — replaces the "FAQ" placeholder
  (`id="faq"`). Renders the 8 entries from `faqs` in `lib/constants.ts`
  inside the existing `components/ui/accordion.tsx` (shadcn/Base UI)
  primitives, one `AccordionItem` per question with a unique `value`. Base
  UI's `Accordion` root defaults to single-open (`multiple` defaults to
  `false`), so opening one question closes any other — smooth expand/collapse
  is handled by the accordion's built-in open/closed animation, no custom
  transition code needed.
- **`components/sections/Pricing.tsx`** — replaces the "Pricing" placeholder
  (`id="pricing"`). Renders the 3 entries from `pricingPlans` using the
  `Card`/`CardHeader`/`CardContent` primitives in `components/ui/card.tsx`.
  Each card shows name, description, a feature list with `Check` icons, and
  a "Request Pricing" button (`Button` rendered as `<a href="#contact">`,
  no real prices per the plan). The `featured: true` plan (Behavior
  Package) is visually highlighted: a "Most Popular" badge, a
  `border-cta-400`/tinted background treatment, and `lg:scale-105` so it
  sits slightly larger than its neighbors on desktop. All three cards use
  `whileHover={{ y: -6 }}` for a lift animation.
- **`components/sections/Blog.tsx`** — replaces the "Blog" placeholder
  (`id="blog"`). Renders the 4 entries from `blogPosts` as cards (image
  placeholder, title, excerpt, formatted date via
  `Date.toLocaleDateString`, "Read More" link to `#` since blog pages
  aren't built yet) in a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` layout.
- **`components/sections/FinalCTA.tsx`** — replaces the "Let's Build a
  Better Relationship" placeholder (`id="final-cta"`). A solid
  `bg-primary-600`/`dark:bg-primary-900` background (distinct from the
  surrounding `background`/`secondary-100` sections) with a subtle radial
  gradient + a large faint rotated paw-print icon in the corner, marking it
  as the pre-footer close. Headline + subtext, and 2 CTA buttons: "Book
  Consultation" (→ `#contact`) and "Call Today" (→ `business.phoneHref`),
  matching the `Hero` section's button treatment.
- Wired all four into `app/page.tsx` in place of their placeholder
  sections. The only remaining `PlaceholderSection` in `app/page.tsx` is
  now `#contact`, which is Phase 7 (Contact Form & API).

## Verification performed

Same ad hoc Playwright setup as Phase 5 (still no project skill for
running/screenshotting this app — see the recommendation below):

- `npx tsc --noEmit` — clean.
- `npx eslint` on all changed files — zero errors.
- Desktop (1440×900) and mobile (390×844), light and dark mode — all four
  combinations screenshotted at `#faq`, `#pricing`, `#blog`, and
  `#final-cta`. Dark mode reached via `localStorage`'s `theme` key + reload.
- Interaction pass: opened the first FAQ accordion item (expanded with
  animation), then opened the third item (first auto-closed, confirming
  single-open behavior works as expected).
- `console` (`error` type) and `pageerror` listeners checked across every
  navigation and interaction — zero errors throughout.
- Playwright was installed ad hoc via `npm install --no-save
  --no-package-lock playwright` (uninstalled from `node_modules` after
  verification); `git diff --stat package.json package-lock.json` was
  empty throughout, confirming no dependency changes leaked into the repo.

## Known non-blocking items / still placeholder

- `Blog` cards use gradient blocks with a newspaper icon in place of real
  article images, consistent with the rest of the site's placeholder
  imagery.
- "Read More" links go to `#` — individual blog post pages aren't built
  yet, per the plan.
- "Request Pricing" and "Book Consultation" buttons link to `#contact`,
  which is still a placeholder section — Phase 7 builds the actual contact
  form.
- Floating Call/WhatsApp buttons continue to overlap bottom-right content
  on some scroll positions across all sections — pre-existing behavior from
  earlier phases, not something introduced or fixed here.
- Recommend running `/run-skill-generator` to capture a proper project
  skill for running + screenshotting this app — this is the fifth phase in
  a row that had to rebuild the verification harness ad hoc.

## Next

Phase 7 — Contact Form & API (the last remaining placeholder section,
`#contact`, plus the `/api/contact` route and Resend email delivery).
