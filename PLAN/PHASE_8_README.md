# Phase 8: SEO & Polish — Status Report

**Status:** Complete (pending your GA4/Clarity IDs and a real domain — see
`PLAN/PENDING_STEPS.md`)

## Goal (per BUILD_PLAN.md)

Search-engine ready, high Lighthouse score: sitemap, robots.txt, JSON-LD
structured data, image optimization, analytics, accessibility pass,
performance tuning.

## What was built

### Sitemap & robots

- **`app/sitemap.ts`** — a single entry for the home page
  (`siteConfig.url`), since that's the only real route in the app (`app/`
  only has `page.tsx`, `layout.tsx`, and `api/contact/route.ts` — no blog
  index or standalone contact page exists yet, so nothing invented here).
- **`app/robots.ts`** — allows all crawlers on `/`, points `sitemap` at
  `${siteConfig.url}/sitemap.xml`.
- Both read `siteConfig.url`, so they'll automatically point at the right
  place once that placeholder is updated (see Pending Steps).

### JSON-LD structured data

- **LocalBusiness** (`app/layout.tsx`) — this already existed from an
  earlier phase; left as-is. Sourced entirely from `business` in
  `lib/constants.ts` (name, phone, email, address, hours, social links) —
  no hardcoded values.
- **Service** (`app/layout.tsx`, new) — one Service entry per item in
  `services` (lib/constants.ts), each with `serviceType`, `description`,
  a `provider` referencing `business.name`, and `areaServed` from
  `business.address.city`. Rendered as a single `<script>` tag containing
  the array.
- **FAQPage** (`components/sections/FAQ.tsx`, new) — built from `faqs` in
  `lib/constants.ts`, one `Question`/`acceptedAnswer` pair per FAQ.
- Verified in the browser: fetched the rendered HTML and parsed all three
  `<script type="application/ld+json">` blocks — 1 LocalBusiness, 10
  Service entries, 1 FAQPage with all 8 questions, all valid JSON.

### Images audit

Grepped the whole `app/`/`components/` tree for `<img` and `next/image` —
**zero matches**. Every "image" on the site (About's trainer photo,
Services' thumbnails, SuccessGallery's grid, Blog's post covers) is a
gradient-block + icon placeholder with no real file behind it, exactly as
flagged going into this phase. No `next/image` conversions were needed or
made.

What's already in place for when real photos land:
- About's placeholder has a `sr-only` "Photo of {trainerName}" fallback
  text — ready to become an `<Image alt={...}>` directly.
- Services/SuccessGallery/Blog decorative icons are `aria-hidden`, with
  the real content (title, caption, excerpt) as visible sibling text —
  so swapping the gradient div for a `next/image` just needs an `alt`
  matching that adjacent text, no structural change.
- **Flagged, not fixed:** `siteConfig.ogImage` (`lib/siteConfig.ts`)
  points at `/og-image.jpg`, which doesn't exist in `public/`. Social
  share previews will show a broken image until a real one is added —
  noted in `PLAN/PENDING_STEPS.md`.

### Analytics (GA4 + Microsoft Clarity)

- Installed **`@next/third-parties`** (matches the installed `next`
  version, `^16.2.10`) — the official Next.js package for GA4, rather
  than hand-rolling the gtag.js snippet. It handles script loading
  strategy and exposes `sendGAEvent` for custom events.
- **`components/Analytics.tsx`** — renders `<GoogleAnalytics gaId={...}
  />` only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set, and a Clarity
  bootstrap `<Script>` only if `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set.
  With neither set (current state), it renders nothing. Mounted once in
  `app/layout.tsx`.
- **`lib/analytics.ts`** — `trackEvent(name, params)` wraps
  `sendGAEvent`, no-op if the GA env var isn't set (checked directly,
  rather than relying on `sendGAEvent`'s own `console.warn` fallback, so
  there's zero console noise when analytics isn't configured).
- **Pageviews**: handled automatically by GA4 Enhanced Measurement once
  the Measurement ID is set — no manual pageview code needed for a
  single-route site (see `@next/third-parties` docs: GA4 tracks pageviews
  on browser history changes out of the box).
- **CTA click tracking** — wired `trackEvent("cta_click", { cta_label,
  cta_location, ... })` on every real conversion CTA: Navbar's "Book
  Consultation" (desktop + mobile), Hero's "Book Consultation"/"Call Now",
  FinalCTA's "Book Consultation"/"Call Today", each Pricing card's
  "Request Pricing" (tagged with `plan_name`), the floating Call/WhatsApp
  buttons, and Services' "Learn More" links (tagged with
  `service_title`).
- **Contact form submissions** — `components/sections/Contact.tsx` now
  fires `trackEvent("contact_form_submit", { status: "success" })` on a
  successful send, and `{ status: "error", reason: "api_error" |
  "network_error" }` on failure, alongside the existing UI success/error
  state.

### Accessibility pass

Mostly a verification pass — the codebase from earlier phases was already
solid:
- **Landmarks**: `<header><nav>` (Navbar), `<main>` (page.tsx), `<footer>`
  — all present.
- **Accessible names**: every icon-only control already had one (dark
  mode toggle, mobile menu button, back-to-top, floating Call/WhatsApp,
  carousel prev/next, testimonial dots, dialog close). Spot-checked with
  Lighthouse's accessibility category too (see below).
- **Keyboard navigation**, verified with Playwright against the dev
  server (desktop viewport):
  - Tab order through the navbar is logical: logo → nav links → dark
    mode toggle → navbar CTA → hero CTAs.
  - Dark mode toggle activates via keyboard (`Enter`), flips `<html>`'s
    class to `dark` and back.
  - FAQ accordion: focusing a trigger and pressing `Enter` flips
    `aria-expanded` from `false` to `true`.
  - Contact form: all fields fillable via keyboard; the Base UI `Select`
    (preferred time) opens with `Enter`, `ArrowDown` moves selection,
    `Enter` confirms — verified it lands on "Afternoon".
  - Zero console errors or page errors during any of this.
  - Mobile hamburger menu was verified by DOM/ARIA inspection (correct
    `aria-label`, `aria-expanded`, visibility, position) rather than a
    full Playwright keyboard trace — a harness-level flake (Playwright's
    `getByRole` locator repeatedly stalling on that one button, even
    though direct DOM/CSS-selector reads of the same element succeeded
    instantly) made the scripted end-to-end version unreliable. Not a
    site defect: confirmed independently via `page.evaluate` and a CSS
    selector that the button's accessible name, `aria-expanded` state,
    and visibility are all correct.
- **Color contrast** — Lighthouse's mobile accessibility audit caught one
  real issue: `--color-text-500` (`#737369`) on `--color-secondary-100`
  (`#faf7f2`) — used by the footer's tagline, quick links, address, and
  copyright line — measured 4.48:1, just under WCAG AA's 4.5:1 minimum
  for normal text. Fixed by darkening it slightly to `#707066` (also
  updated the matching `--muted-foreground` token) in `app/globals.css` —
  a ~4.7:1 ratio against that background now, with no visible color
  difference. Re-ran the audit: accessibility went from 96 → **100**.

### Performance (Lighthouse)

Ran `npx lighthouse` (desktop + mobile presets) against both the dev
server and a production build (`next build && next start`); only the
production numbers are meaningful (dev mode is unminified and single-
threaded, so its performance score is not representative — 66 in dev vs.
87 in production for the same mobile run).

**Production build, desktop:**

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 100 | 100 | 100 | 100 |

**Production build, mobile:**

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 87 | 100 | 100 | 100 |

Fixes applied:
- **Color contrast** (see above) — accessibility 96 → 100 on both.
- **Hero LCP delay** — Lighthouse's LCP breakdown flagged the hero
  headline (the page's LCP element) with a 1060ms "element render delay."
  Cause: the headline animates in via Framer Motion starting from
  `opacity: 0`, so the browser doesn't count it as painted until the
  fade/stagger animation nearly finishes. Fixed in
  `components/sections/Hero.tsx` by changing the hero's `fadeUp` variant
  to start at `opacity: 1` (keeping the `y: 24 → 0` slide-up motion, just
  not the fade) — this is local to `Hero.tsx`'s own variant and doesn't
  touch any other section. Element render delay dropped from 1060ms to
  172ms; LCP itself improved from 4.1s to 3.8s.

**Blocked / not chased further:** mobile performance sits at 87, just
under the 90 target. After the LCP fix, the remaining gap is Lighthouse's
simulated mobile CPU/network throttling amplifying JS parse/execute cost
from the interactivity stack (Framer Motion, Embla Carousel, Base UI,
react-hook-form + zod) — `bootup-time` ~0.9s and
`mainthread-work-breakdown` ~2.2s under 4x CPU throttling, plus an
estimated 145 KiB of unused JS. Closing this gap further would mean
deferring/lazy-loading these libraries or swapping some Framer Motion
usage for CSS-only animation — a real architectural change, not a
one-line fix, so per the phase instructions ("don't chase diminishing
returns... just note it as blocked") this is left as a known, non-content
follow-up rather than done here.

## Setting up GA4 and Clarity (do this once you have both)

See `PLAN/PENDING_STEPS.md` for the full walkthrough — short version:

```
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
```

Both are `NEXT_PUBLIC_` (client-exposed) because gtag.js and the Clarity
snippet both run in the browser — this is normal for these tools, not a
secret leak. Restart `npm run dev` after adding them. With both unset (the
current state), `components/Analytics.tsx` renders nothing and
`trackEvent` no-ops silently — confirmed via the rendered HTML (no
`googletagmanager.com` or `clarity.ms` script tags present) and no
console errors.

## Verification performed

- `npx tsc --noEmit` — clean.
- `npx eslint app components lib` — zero errors.
- `npm run build` — compiles cleanly, all 5 routes (`/`, `/_not-found`,
  `/api/contact`, `/robots.txt`, `/sitemap.xml`) generate correctly.
- Fetched `/sitemap.xml` and `/robots.txt` directly and confirmed correct
  XML/text output.
- Parsed all JSON-LD `<script>` blocks out of the rendered home page HTML
  and validated them (see JSON-LD section above).
- Confirmed analytics scripts are entirely absent from the HTML with no
  env vars set.
- Playwright-driven keyboard navigation pass (desktop): navbar, dark mode
  toggle, FAQ accordion, contact form + Base UI Select — all pass, zero
  console/page errors (see Accessibility section for the one item
  verified by DOM inspection instead of a full scripted trace).
- Lighthouse (desktop + mobile) against both `next dev` and a production
  `next build && next start`, before and after each fix, per the
  Performance section above.

## Known non-blocking items / still placeholder

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_CLARITY_PROJECT_ID` not
  set yet — analytics collect nothing until you create those projects and
  drop the IDs into `.env.local` (see `PLAN/PENDING_STEPS.md`).
- `siteConfig.url` is still `https://www.example.com` — the sitemap,
  robots.txt, and all JSON-LD currently point there. Update it once a
  real domain is live.
- `siteConfig.ogImage` points at a `/og-image.jpg` that doesn't exist in
  `public/` — social link previews will show a broken image until a real
  1200×630 file is added.
- Real photos (trainer, gallery, before/after, testimonials) are still
  gradient-block placeholders; the alt-text/sizing plumbing is ready for
  `next/image` once files exist (see Images Audit section).
- Mobile Lighthouse performance is 87/100 — see the Performance section
  for why, and what a further fix would require.
- Services' "Learn More" links still point at `#` (no service detail
  pages exist) — pre-existing from an earlier phase, out of scope here;
  now at least instrumented with a `cta_click` event so you can see
  demand for each service before building detail pages.

## Next

All 8 planned phases are now complete. Remaining work is entirely on your
side per `PLAN/PENDING_STEPS.md`: GA4/Clarity project creation, a real
domain, real photos, and the placeholder business info in
`lib/constants.ts` / `lib/siteConfig.ts`.
