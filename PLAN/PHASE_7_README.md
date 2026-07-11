# Phase 7: Contact Form & API — Status Report

**Status:** Complete (pending your Resend API key for the live send path)

## Goal (per BUILD_PLAN.md)

Functional lead capture with email delivery. Form submits, email delivers to
owner inbox, success message shows.

## What was built

- **`lib/contactSchema.ts`** — a single `contactFormSchema` (zod) shared by
  both the client form and the API route, so validation rules can't drift
  between the two. Fields: `name`, `phone`, `email`, `dogBreed`, `dogAge`,
  `problem`, `preferredTime` (one of `preferredTimeOptions`: Morning,
  Afternoon, Evening, Weekend). Exports the inferred `ContactFormValues`
  type.
- **`components/sections/Contact.tsx`** — replaces the "Contact" placeholder
  (`id="contact"`). Two-column layout (business info card + form card,
  stacking on mobile), matching the `About`/`Pricing` fade-up pattern:
  - Left card: `business.phone`, `business.email`, `business.address` (as a
    link to Google Maps via a `google.com/maps/search` URL built from the
    address — no embed, per the plan), and `business.hours`.
  - Right card: the form, built with `react-hook-form` +
    `@hookform/resolvers/zod` against `contactFormSchema`. Text/textarea
    fields use `register(...)`; `preferredTime` uses the existing
    `components/ui/select.tsx` (Base UI, not a native `<select>`) wired
    through RHF's `Controller` since it isn't an uncontrolled-input-style
    component.
  - Inline error messages render under each field from `formState.errors`.
  - Submit button shows a spinner + "Sending..." while `isSubmitting`.
  - After submit, a status line renders below the button: green/primary
    text on success (and the form resets), destructive-colored text on
    error — including the case where the API can't send because no Resend
    key is configured yet (graceful degradation, not a crash).
- **`app/api/contact/route.ts`** — `POST` handler:
  1. Parses the JSON body (400 on malformed JSON).
  2. Re-validates against the same `contactFormSchema` server-side via
     `safeParse` (400 + `error.flatten().fieldErrors` on failure — never
     trusts the client-side validation alone).
  3. If `process.env.RESEND_API_KEY` is missing, returns `503` with a clear
     "email delivery isn't configured yet, call/email us directly" message
     instead of throwing.
  4. Otherwise sends via `resend.emails.send(...)` — `to` is
     `process.env.CONTACT_TO_EMAIL || business.email` (so you can test
     against your own inbox before `business.email` in `lib/constants.ts`
     is a real address), `from` defaults to Resend's sandbox sender
     `onboarding@resend.dev` unless `RESEND_FROM_EMAIL` is set, and
     `replyTo` is the submitter's email so you can reply directly from your
     inbox.
  5. Returns `502`/`500` with a generic user-facing error message on send
     failure (the real error is only `console.error`'d server-side), or
     `200` with `{ success: true }` on success.
- Wired `Contact` into `app/page.tsx` in place of the last remaining
  `PlaceholderSection`. Since every placeholder is now a real section, the
  now-unused `PlaceholderSection` helper was deleted from `app/page.tsx`.

## Setting up Resend (do this before testing the live send)

1. Create a free account at resend.com and grab an API key (starts with
   `re_`).
2. Create `.env.local` in the project root (already gitignored via `.env*`
   in `.gitignore` — do not commit it) with:

   ```
   RESEND_API_KEY=re_your_key_here
   ```

3. Optional overrides, only needed if you want to deviate from the
   defaults:

   ```
   # Where submissions are delivered. Defaults to business.email in
   # lib/constants.ts, which is still the placeholder "hello@example.com" —
   # set this to your real inbox for testing until you update that.
   CONTACT_TO_EMAIL=you@yourdomain.com

   # Sender identity. Defaults to Resend's shared sandbox sender, which
   # only works for testing and does NOT require domain verification.
   # Once you verify a domain in Resend, switch to an address on it, e.g.:
   RESEND_FROM_EMAIL=Website Contact Form <contact@yourdomain.com>
   ```

4. Restart `npm run dev` after adding/changing `.env.local` (Next.js only
   reads env files at process start).

**Sandbox limitation to know about:** until you verify a domain in Resend,
the sandbox sender (`onboarding@resend.dev`) can only deliver to the email
address on your Resend account itself — not arbitrary addresses. So for the
very first test, set `CONTACT_TO_EMAIL` to the same email you signed up to
Resend with. Once you verify your own domain, you can send `from` an
address on that domain `to` any inbox, including the real `business.email`.

I have not tested the actual send (no key yet) — once you drop the key in,
submit the form once and confirm the email arrives; happy to debug from
there if anything looks off.

## Verification performed

Same ad hoc Playwright setup as Phases 5–6 (still no project skill for
running/screenshotting this app):

- `npx tsc --noEmit` — clean.
- `npx eslint` on all changed/new files — zero errors.
- Desktop (1440×900) and mobile (390×844), light and dark mode — all four
  combinations screenshotted at `#contact`. Dark mode reached via
  `localStorage`'s `theme` key + reload.
- Submitted the form empty: all 7 fields showed their inline validation
  message simultaneously (e.g. "Please enter your full name.", "Please
  enter a valid phone number.", "Please select a preferred time."),
  confirming the zod schema's messages surface correctly through
  `zodResolver`.
- Filled every field with valid data (including selecting "Morning" from
  the Base UI `Select` via `Controller`) and submitted: request hit
  `POST /api/contact`, which — with no `RESEND_API_KEY` set in this
  environment — correctly returned `503` with the graceful
  "email delivery isn't configured yet" message, rendered in the form's
  status line. No exception was thrown client- or server-side.
- `console` (`error` type, excluding the expected 503 network log) and
  `pageerror` listeners checked across every navigation and interaction —
  zero unexpected errors throughout.
- Playwright was installed ad hoc via `npm install --no-save
  --no-package-lock playwright` (already present in `node_modules` from
  prior phases; confirmed via `require.resolve`); `git status --porcelain
  package.json package-lock.json` was empty throughout, confirming no
  dependency changes leaked into the repo.

## Known non-blocking items / still placeholder

- The actual email send is untested end-to-end — blocked on you creating a
  Resend account and dropping `RESEND_API_KEY` into `.env.local` (see setup
  steps above). Everything up to the point of calling Resend's API is
  verified.
- `business.email` in `lib/constants.ts` is still the placeholder
  `hello@example.com`. Update it to your real inbox once you're ready to go
  live, or keep using `CONTACT_TO_EMAIL` for testing in the meantime.
- No standalone `app/contact/page.tsx` was built — the plan marked this
  optional, and the anchor-linked `#contact` section on the home page
  (already the target of every "Book Consultation" / "Request Pricing" CTA
  across the site) covers the same need.
- Floating Call/WhatsApp buttons continue to overlap bottom-right content
  on some scroll positions across all sections — pre-existing behavior from
  earlier phases, not something introduced or fixed here.
- Recommend running `/run-skill-generator` to capture a proper project
  skill for running + screenshotting this app — this is the sixth phase in
  a row that had to rebuild the verification harness ad hoc.

## Next

Phase 8 — SEO & Polish (sitemap, robots.txt, JSON-LD structured data, image
optimization, analytics, accessibility pass, Lighthouse tuning).
