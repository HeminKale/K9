# Phase 1: Setup & Config — Status Report

**Status:** Complete (with fixes)

## Goal (per BUILD_PLAN.md)

Foundation ready, project configured, theme applied. Project compiles, `npm run dev`
works, Tailwind theme applied, no visual site yet.

## What was originally done

- Dependencies installed: shadcn packages, framer-motion, next-themes, react-hook-form,
  zod, embla-carousel-react, resend, lucide-react, next-cloudinary, @hookform/resolvers.
- `app/globals.css` created with base styles, resets, animation keyframes, and a
  `tailwind.config.ts` defining the brand color palette (forest green / sand / mustard /
  orange / charcoal / cream), custom shadows, radii, and animations.
- `app/layout.tsx` set up with metadata, fonts (Poppins for headings, Inter for body),
  and a `next-themes` `ThemeProvider`.

## Issues found during the Phase 2 audit

1. **The custom Tailwind theme was dead code.** The project uses Tailwind v4
   (`@import "tailwindcss"` in `globals.css`), which does not auto-load a JS/TS config
   file. `tailwind.config.ts` was never referenced (no `@config` directive), so none of
   the brand colors were actually being generated — confirmed by grepping the built CSS
   output for zero occurrences of `primary-600` or any other custom color. Every
   component built on top of it would have rendered unstyled.
2. **shadcn/ui was never initialized.** The plan called for `shadcn init` plus
   installing button/card/input/form/accordion/carousel/dialog, but there was no
   `components.json` and no `components/` or `lib/` directory.

## Fixes applied

- Migrated the entire brand palette, fonts, spacing, radii, shadows, and animations
  into a native Tailwind v4 `@theme` block in `app/globals.css`.
- Added `@custom-variant dark (&:where(.dark, .dark *));` so `dark:` utilities respond
  to the `.dark` class that `next-themes` toggles (previously dark mode only reacted to
  `prefers-color-scheme`, meaning a theme-toggle button would have done nothing).
- Fixed an undefined `--gutter` CSS variable that was silently breaking
  `.section-padding` (any `var()` referencing an undefined custom property invalidates
  the whole declaration).
- Deleted the now-unused `tailwind.config.ts`.
- Initialized shadcn/ui (`npx shadcn@latest init`) and installed: button, card, input,
  accordion, carousel, dialog, label, textarea, select. (`form` has no standalone file
  in this shadcn version — it's composed from input/label/textarea/select directly,
  which is fine for Phase 7.)
- Reconciled the shadcn init output, which had overwritten the brand `:root`/`.dark`
  variables with shadcn's generic grayscale defaults and clobbered the heading/sans
  font tokens with an unwanted Geist font import — restored brand colors for shadcn's
  semantic tokens (`--primary`, `--card`, `--muted`, `--border`, `--ring`, etc.) so
  shadcn components (Button, Card, ...) render on-brand instead of black-and-white.
- Wrapped the custom base-style rules (`*`, `body`, `a`, `button`, `input`, headings)
  in `@layer base` — without this, unlayered CSS was silently beating Tailwind's
  layered utility classes regardless of specificity or source order (see Phase 2
  README for the concrete bug this caused).
- Removed the deprecated `shadcn-ui` npm package (superseded by `shadcn`).

## Verification

- `npm run build` — compiles clean, TypeScript passes, static generation succeeds.
- `npm run lint` — no errors.
- Confirmed via a temporary test component that custom theme classes
  (`bg-primary-600`, `text-cta-500`, etc.) compile to real CSS with the correct values.

## Known non-blocking item

- `npm audit` reports a moderate PostCSS advisory nested inside Next.js's own bundled
  dependency tree (`next -> postcss`), with no fix currently available upstream. Not
  actionable from this project; not a deploy blocker.
