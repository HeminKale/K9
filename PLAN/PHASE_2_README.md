# Phase 2: Core Layout & Infrastructure — Status Report

**Status:** Complete

## Goal (per BUILD_PLAN.md)

Navbar, footer, floating buttons, page structure ready. Navigation works.

## What was built

- **`lib/siteConfig.ts`** — site title, description, keywords, canonical URL, OG image.
- **`lib/navLinks.ts`** — nav link structure (`navLinks`, `footerLinks`).
- **`lib/constants.ts`** — business info (name, phone, email, address, hours, social),
  services (10), why-choose-us benefits (8), process steps (6), before/after examples,
  testimonials, FAQs (8), pricing plans (3), blog posts (4). All placeholder content —
  edit freely without touching component code.
- **`components/Navbar.tsx`** — sticky header, scroll-aware background/blur, desktop nav
  links, dark-mode toggle, CTA button, animated mobile menu (framer-motion).
- **`components/Footer.tsx`** — logo, tagline, social links, quick links, contact info,
  copyright.
- **`components/FloatingButtons.tsx`** — persistent Call + WhatsApp buttons
  (bottom-right).
- **`components/BackToTop.tsx`** — scroll-triggered back-to-top button (bottom-left).
- **`components/icons/SocialIcons.tsx`** — inline SVGs for Instagram/Facebook/YouTube/
  WhatsApp, since `lucide-react` no longer ships brand/social icons.
- **`app/layout.tsx`** — wired up `siteConfig`-driven metadata, JSON-LD `LocalBusiness`
  structured data, and mounted `FloatingButtons`/`BackToTop` globally.
- **`app/page.tsx`** — replaced the default Next.js scaffold with `Navbar`, `Footer`,
  and placeholder `<section>`s (correct `id`s for every section in the plan: home,
  about, why-choose-us, services, process, before-after, testimonials, gallery, faq,
  pricing, blog, final-cta, contact) ready for Phases 3–7 to fill in.

## Bugs found and fixed during the build (via actual browser verification, not just code review)

1. **CTA button text invisible/wrong color.** `<Button render={<Link .../>}>` with a
   `text-white` override wasn't winning — computed style showed the button text was
   inheriting the global `a { color: var(--primary) }` rule instead. Root cause: that
   base rule wasn't inside a Tailwind `@layer`, so per CSS cascade-layer rules it beat
   *any* layered utility class regardless of specificity or source order. Fixed by
   wrapping all custom base styles in `@layer base` (see Phase 1 README). This was a
   site-wide bug, not just the one button — confirmed fixed for the "Contact" nav link
   too.
2. **Accessibility: CTA button contrast.** White text on the orange CTA background
   (`#E97A33`) measured ~2.9:1 contrast — fails WCAG AA (4.5:1 for normal text). Fixed by
   switching to dark text (`text-text-900`), which measures ~6.5:1.
3. **Base UI console warning.** `Button` rendering as a `<Link>` (an `<a>`, not a native
   `<button>`) needs `nativeButton={false}`, otherwise Base UI logs an accessibility
   warning about semantics. Fixed on both CTA button instances.
4. **`lucide-react` has no brand/social icons** (`Facebook`, `Instagram`, `Youtube` don't
   exist in the installed version) — build failed until replaced with inline SVGs in
   `components/icons/SocialIcons.tsx`.
5. **ESLint `react-hooks/set-state-in-effect`** flagged the standard "mounted" guard
   pattern (`useEffect(() => setMounted(true), [])`) used to avoid hydration mismatches
   for the dark-mode toggle icon. Replaced with a `useSyncExternalStore`-based
   `useHasMounted()` hook (`lib/hooks/useHasMounted.ts`) that never calls `setState`
   inside an effect.
6. The shadcn-generated `components/ui/carousel.tsx` trips the same lint rule
   internally (a legitimate external-subscription pattern that the rule doesn't
   recognize). Since it's vendor/generated code, `components/ui/**` was added to the
   ESLint ignore list rather than hand-editing generated files.

## Verification performed

- `npm run build` — clean (Turbopack, TypeScript, static generation all pass).
- `npm run lint` — zero errors.
- Launched the dev server and drove it with a headless browser (Playwright):
  - Desktop (1440×900), light and dark mode — screenshotted.
  - Mobile (390×844), including opening the mobile menu — screenshotted.
  - Footer scrolled into view — screenshotted.
  - Checked `console --errors` after each interaction — zero console errors/warnings
    after fixes.
  - Checked computed styles directly (not just visually) to catch the cascade-layer
    contrast bug above, which wasn't obvious from the screenshot alone.

## Deployability

- Added `"engines": {"node": ">=20.9.0"}` to `package.json` (Next 16's minimum).
- `.gitignore` already correctly excludes `node_modules`, `.next`, `.env*`, `.vercel`.
- No environment variables required yet — Resend isn't wired up until Phase 7.
- Project is Vercel-ready for a first deploy as-is (see main README/chat for setup
  steps via Vercel's GitHub integration).

## Still placeholder — update before going live

- `siteConfig.url` in `lib/siteConfig.ts` (currently `https://www.example.com`).
- `business` object in `lib/constants.ts` — name, phone, email, address, hours, social
  links, all service/testimonial/FAQ/blog copy.
- `[Name]` references in metadata (`app/layout.tsx` pulls from `siteConfig`/`business`,
  so updating those two files updates everything).

## Next

Phase 3 — Hero & About sections.
