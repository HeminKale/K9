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

Real values now in (from the trainer flyer): `business.name`
("Ketan.K9DogTrainer"), `business.trainerName` ("Ketan Mahajan"),
`business.tagline`, `business.phone`/`whatsappNumber`, and
`business.address.street`/`city`/`state` (Punawale, Pune, Maharashtra).

Still placeholders — fix before launch:
- `business.address.zip` — left blank, flyer didn't show a PIN code.
- `business.email` — still `hello@example.com`.
- `business.social.*` — still generic `instagram.com/` etc. with no handle.
- `business.hours` — still generic Mon–Fri/Sat placeholder hours; flyer
  didn't specify actual hours.
- `siteConfig.url` and `siteConfig.ogImage` — placeholder domain and a
  non-existent `/og-image.jpg`.

## Logo file (from the flyer/Instagram post you shared)

You shared two images in chat (the trainer flyer and a circular
"Ketan.K9DogTrainer" logo) but I can't save a pasted chat image to disk —
I only received it as inline content, not a file path. To actually use it
on the site (navbar icon, favicon, footer, OG image):
- [ ] **Save the logo file** somewhere on disk (e.g. Desktop) and tell me
      the path, or drop it directly into `public/` in the
      `K9-Tab-Design` folder yourself (e.g. `public/logo.png`) — then tell
      me it's there and I'll wire it into the Navbar/Footer/favicon.

## Certificates carousel (Contact tab)

- [ ] A placeholder carousel now shows on the Contact tab/section (4 dashed
      placeholder cards). Send over scans/photos of Ketan's actual training
      certifications and I'll swap them into `lib/constants.ts`'s
      `certificates` array in place of the placeholders.

## Tab-Design variant (branch `Tab-Design`, for the A/B survey)

This branch is a second copy of the site with true tab navigation instead of
one long scrolling page, built for a side-by-side survey against `SEO-Design`.
Content/section internals were not touched — only how they're grouped and
displayed changed.

- [ ] **Final tab grouping** — `lib/tabConfig.ts`'s `tabGroups` array currently
      holds a draft grouping (Home / About Us / Services / Results /
      Pricing & FAQ / Contact). Send over the real content-to-tab mapping you
      want and it's a small edit to that one file — no other file needs to
      change.
- [ ] **Where to upload photos/videos** — not implemented yet on either
      branch (every section still uses gradient-placeholder blocks). Two
      options once you have real files:
  - **Simple**: drop them in `public/` (e.g. `public/images/hero.jpg`) and
    reference as `/images/hero.jpg` via `next/image`.
  - **Cloudinary** (already an installed dependency, `next-cloudinary`):
    upload to a Cloudinary account, reference via the `CldImage`/
    `CldVideoPlayer` components, and add `res.cloudinary.com` to
    `next.config.ts`'s `images.remotePatterns`.
  Either path is a separate follow-up task and can be wired into whichever
  branch wins the survey.

## Deploying to Vercel

Steps to get either branch (`SEO-Design` or `Tab-Design`) live on Vercel for
the survey (or for launch, once one is picked):

- [ ] **Create a Vercel account** at vercel.com — sign up with the same
      GitHub account that owns `HeminKale/K9` (easiest way to grant repo
      access).
- [ ] **Import the project** — Vercel dashboard → "Add New" → "Project" →
      select the `HeminKale/K9` repo → grant Vercel access if prompted.
- [ ] **Pick the branch to deploy** — during import, set the "Production
      Branch" to whichever branch you want live (e.g. `Tab-Design` or
      `SEO-Design`). Framework preset should auto-detect "Next.js" — leave
      build command (`next build`) and output settings as default.
- [ ] **Add environment variables** before the first deploy (Vercel
      dashboard → Project → Settings → Environment Variables). Same values
      as your local `.env.local`:
  ```
  RESEND_API_KEY=re_your_key_here
  CONTACT_TO_EMAIL=hero@gmail.com
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX      (optional, once GA4 is set up)
  NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id  (optional, once Clarity is set up)
  ```
  Without `RESEND_API_KEY`/`CONTACT_TO_EMAIL`, the deployed contact form
  will fail to send email (same as local).
- [ ] **Deploy** — Vercel builds and gives you a live URL like
      `k9-xxxx.vercel.app` immediately after import. Every future push to
      that branch auto-redeploys.
- [ ] **Want both branches live at once for the survey?** Vercel supports
      this two ways:
  - Simplest: import the repo **twice** as two separate Vercel projects,
    one pinned to `SEO-Design`, one to `Tab-Design` — gives you two
    permanent URLs to send people (e.g. `k9-scroll.vercel.app` and
    `k9-tabs.vercel.app`, renameable in Project Settings → Domains).
  - Alternative: any branch pushed to GitHub (not just the Production
    Branch) automatically gets its own Vercel "Preview" URL — so pushing
    both branches to one Vercel project already gives you two shareable
    preview links without a second project. Preview URLs look like
    `k9-git-tab-design-heminkale.vercel.app`.
- [ ] **Custom domain** (optional) — once you own a real domain, add it
      under Project Settings → Domains, and update `siteConfig.url` (see
      above) to match so SEO metadata/sitemap/robots.txt point to the real
      URL instead of the placeholder.
- [ ] **Restart is automatic** — unlike local dev, Vercel picks up new/changed
      environment variables on the next deploy automatically; no manual
      restart needed, but you do need to trigger a redeploy (push a commit,
      or use "Redeploy" in the dashboard) after adding/changing a variable.
