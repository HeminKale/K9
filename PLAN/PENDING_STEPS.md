# Pending Steps (Your Side)

Things that require action from you before the site is fully live. Updated
as new phases introduce new dependencies.

## Phase 7 — Contact Form & Email (blocking the live send test)

- [ ] **Create a Resend account** at resend.com, using whichever email you
      want tied to the account (e.g. `hero@gmail.com`).
- [ ] **Generate an API key** from the Resend dashboard (starts with `re_`).
- [ ] **Create `.env.local`** in the project root (gitignored, never
      commit it) with:
  ```
  RESEND_API_KEY=re_your_key_here
  CONTACT_TO_EMAIL=hero@gmail.com
  ```
  - `CONTACT_TO_EMAIL` must match the email your Resend account is
    registered under — that's what makes sandbox-mode delivery work
    with zero domain setup. This is a stand-in for `business.email` in
    [lib/constants.ts](../lib/constants.ts), which is still the
    placeholder `hello@example.com`.
- [ ] **Restart `npm run dev`** after adding/changing `.env.local` (Next
      only reads env files at process start).
- [ ] **Submit the contact form once** and confirm the email arrives.
      Report back if it doesn't, with whatever error shows in the browser
      or the `npm run dev` terminal.

Optional, not blocking:
- [ ] Buy/point a real domain and verify it in Resend, then set
      `RESEND_FROM_EMAIL` to an address on it (e.g.
      `contact@yourdogtraining.com`) so outgoing mail no longer uses the
      shared sandbox sender.
- [ ] Decide on a permanent business inbox and update `business.email` in
      `lib/constants.ts` (separate from whatever you use for
      `CONTACT_TO_EMAIL` today).

## Phase 8 — SEO & Polish (blocking analytics data collection)

- [ ] **Google Analytics 4** — create a GA4 property at
      analytics.google.com, add a "Web" data stream, and copy its
      Measurement ID (format `G-XXXXXXXXXX`). Add to `.env.local`:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
  - Must be prefixed `NEXT_PUBLIC_` (exposes it to the browser bundle —
    required, since gtag.js runs client-side; this is not a secret).
  - Powers `components/Analytics.tsx`, which renders `<GoogleAnalytics
    gaId={...} />` from `@next/third-parties/google` in
    [app/layout.tsx](../app/layout.tsx). Pageviews are tracked
    automatically by GA4's Enhanced Measurement (verify it's on in the
    GA4 Admin panel). CTA button clicks (Book Consultation, Call, Request
    Pricing, WhatsApp, Learn More, etc.) and contact form submissions
    (`contact_form_submit` with `status: "success"|"error"`) are sent as
    GA4 events via `lib/analytics.ts`'s `trackEvent`.
- [ ] **Microsoft Clarity** — create a project at clarity.microsoft.com and
      copy its Project ID. Add to `.env.local`:
  ```
  NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
  ```
  - Also `NEXT_PUBLIC_` since the Clarity tracking snippet runs
    client-side too.
- [ ] **Restart `npm run dev`** after adding either var (Next.js only reads
      `.env.local` at process start).
- [ ] With both vars unset (current state), the site is unaffected — no
      script tags render, `trackEvent` no-ops. Once set, load the site and
      confirm hits appear in the GA4 Realtime report and the Clarity
      dashboard (Clarity data can take a few minutes to first appear).
- [ ] **Real domain/URL** — confirm the production URL so `siteConfig.url`
      in [lib/siteConfig.ts](../lib/siteConfig.ts) (currently
      `https://www.example.com`), [app/sitemap.ts](../app/sitemap.ts),
      [app/robots.ts](../app/robots.ts), and the LocalBusiness/Service
      JSON-LD in [app/layout.tsx](../app/layout.tsx) all point to the
      right place.
- [ ] **Real photos** (trainer photo, gallery images, before/after,
      testimonial avatars) — the site currently uses placeholder gradient
      blocks with icons everywhere an image would go. The alt-text/sizing
      plumbing is ready (see `PLAN/PHASE_8_README.md`), but real files are
      needed before `next/image` does anything visible.
- [ ] **OG image** — `siteConfig.ogImage` in
      [lib/siteConfig.ts](../lib/siteConfig.ts) points at `/og-image.jpg`,
      which doesn't exist in `public/`. Social-media link previews
      (Facebook/Twitter/WhatsApp) will show a broken image until a real
      1200×630 image is added there.

## Content placeholders still in `lib/constants.ts` / `lib/siteConfig.ts`

Not blocking any phase, but worth fixing before launch:
- `business.name`, `business.trainerName`, `business.phone`,
  `business.whatsappNumber`, `business.email`, `business.address`,
  `business.social.*` — all placeholder values (`[Name]`, `555-123-4567`,
  `123 Main Street`, etc.).
- `siteConfig.url` and `siteConfig.ogImage` — placeholder domain and a
  non-existent `/og-image.jpg`.
