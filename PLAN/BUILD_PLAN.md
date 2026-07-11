# Dog Training Website — Complete Build Plan

**Project:** Premium Dog Trainer Website ([Name])  
**Status:** Ready to build  
**Architecture:** Next.js 15 + React 19 + TypeScript + Tailwind + shadcn/ui (no database)  
**Approach:** Phased build with testing at each phase end

---

## Overview: What Gets Built

### Pages
- **Home page** (all sections below, full funnel)
- **Individual service detail pages** (optional, can be added later)
- **Blog listing + individual blog posts** (static, no CMS)
- **Contact page** (form + map + info)

### Sections (on Home)
1. **Hero** — full-screen, dog + park background, headline, CTA buttons, trust badges
2. **About** — trainer bio, experience, photo, mission/values
3. **Why Choose Us** — 8 benefit cards with icons
4. **Services** — 10 service cards with images, descriptions, "Learn More" buttons
5. **Training Process** — 6-step timeline (visual flow)
6. **Before & After** — behavior transformation cards (pulling → calm, etc.)
7. **Testimonials** — carousel with photos, ★★★★★ ratings, quotes
8. **Success Gallery** — grid of training photos/videos, hover animations
9. **FAQ** — accordion, 8-10 common questions
10. **Pricing Preview** — 3 elegant pricing cards (no exact prices, "Request Pricing" CTA)
11. **Blog** — latest 3-4 articles, links to full blog
12. **Final CTA** — "Let's Build a Better Relationship" section with 2 CTAs
13. **Footer** — logo, quick links, social, copyright

### Components
- **Navbar** — sticky, logo, nav links, CTA button (on desktop); mobile menu
- **Floating WhatsApp button** — persistent, bottom-right
- **Floating Call button** — persistent, bottom-right (above WhatsApp)
- **Back to top button** — appears on scroll
- **Contact Form** — name, phone, email, dog breed, age, problem, preferred time; form validation
- **Image Gallery** — responsive grid with hover animations
- **Testimonial Carousel** — embla-carousel, smooth transitions
- **FAQ Accordion** — shadcn/ui Accordion, smooth open/close
- **Timeline** — visual 6-step process flow
- **Before/After slider** (optional, or just side-by-side cards)

### API Routes
- **`/api/contact`** — POST endpoint that validates form + sends email via Resend to owner's inbox

### SEO & Meta
- **Page metadata** (title, description, OG tags for all pages)
- **JSON-LD structured data** — LocalBusiness + Service schemas
- **Sitemap.ts** — auto-generated
- **robots.txt** — allow all
- **Schema.org markup** — ratings, service hours, address

### Analytics & Tracking
- **Google Analytics 4** — tracking events (CTA clicks, form submits, etc.)
- **Microsoft Clarity** — heatmaps + session recordings

### Visual/UX
- **Framer Motion animations** — fade-in, fade-up, parallax on hero, hover lift on cards
- **Dark mode** — next-themes toggle in navbar
- **Responsive design** — mobile-first, tested on all breakpoints
- **Lighthouse score** — target 90+ across all pages
- **Core Web Vitals** — LCP, FID, CLS all green

---

## Build Phases

### Phase 1: Setup & Config (1-2 hrs)
**Goal:** Foundation ready, project configured, theme applied

**Tasks:**
- [ ] Install dependencies:
  - `shadcn-ui/ui` (init + components: button, card, input, form, accordion, carousel, dialog)
  - `framer-motion`
  - `next-themes` (dark mode provider)
  - `react-hook-form`
  - `zod` (form validation schema)
  - `embla-carousel-react` (testimonial carousel)
  - `resend` (email API)
  - `lucide-react` (icons)
  - `next-cloudinary` (image optimization, if using Cloudinary)
  - `react-hook-form`
  - `@hookform/resolvers`

- [ ] Configure Tailwind:
  - Add custom color palette (forest green, sand, mustard, orange, charcoal, cream)
  - Add custom font sizes (large, readable)
  - Extend spacing, shadows, rounded corners
  - Dark mode config

- [ ] Setup global styles:
  - `globals.css` (base styles, animations, utility classes)
  - Remove Next.js default styles

- [ ] Setup providers:
  - Root layout with ThemeProvider (next-themes)
  - GA4 + Clarity script tags in head

**Output:** Project compiles, `npm run dev` works, Tailwind theme applied, no visual site yet

---

### Phase 2: Core Layout & Infrastructure (2-3 hrs)
**Goal:** Navigation, footer, floating buttons, page structure ready

**Tasks:**
- [ ] Build `app/layout.tsx`:
  - Metadata (title, description, OG tags)
  - ThemeProvider wrapper
  - GA4 + Clarity script
  - JSON-LD LocalBusiness schema in head

- [ ] Build `app/page.tsx`:
  - Placeholder sections (divs with IDs for each section)
  - Navbar + footer + floating buttons integrated

- [ ] Build components:
  - `components/Navbar.tsx` — logo, nav links, dark mode toggle, CTA, mobile menu
  - `components/Footer.tsx` — logo, quick links, social icons, copyright
  - `components/FloatingButtons.tsx` — WhatsApp + Call buttons (fixed position)
  - `components/BackToTop.tsx` — scroll-triggered button

- [ ] Setup site data/config:
  - `lib/constants.ts` — business name, phone, email, location, hours, services list, testimonials, FAQs
  - `lib/siteConfig.ts` — site title, description, keywords, URLs
  - `lib/navLinks.ts` — navigation structure

**Output:** Navbar, footer, floating buttons visible; page structure in place; navigation works

---

### Phase 3: Hero & About Sections (2-3 hrs)
**Goal:** Establish the premium look & feel

**Tasks:**
- [ ] Build `components/sections/Hero.tsx`:
  - Full-screen hero with background image (placeholder dog/park image for now)
  - Headline, subheading, 2 CTA buttons
  - 4 trust badges below (✔ Certified, ✔ Positive Reinforcement, etc.)
  - Parallax effect on background
  - Fade-in animations on text

- [ ] Build `components/sections/About.tsx`:
  - Trainer photo (placeholder)
  - Bio text, experience, mission/values
  - Two-column layout (photo left, text right; responsive)
  - Fade-up animation on scroll

**Output:** Home page has premium hero + about section visible; all animations working

---

### Phase 4: Services & Process (2-3 hrs)
**Goal:** Show what's offered and how it works

**Tasks:**
- [ ] Build `components/sections/WhyChooseUs.tsx`:
  - 8 benefit cards in a grid (2x4 or 3x3)
  - Icon + title + description per card
  - Hover lift animation
  - Responsive (stack on mobile)

- [ ] Build `components/sections/Services.tsx`:
  - 10 service cards (grid layout)
  - Image placeholder, title, description, "Learn More" button per card
  - Hover scale + shadow animation
  - Link to service detail page (optional for now, can be static #)

- [ ] Build `components/sections/TrainingProcess.tsx`:
  - 6-step timeline (vertical on mobile, horizontal on desktop)
  - Step number, title, description
  - Visual connector lines between steps
  - Icons per step

**Output:** Services, benefits, and process flow all visible; grid layouts responsive

---

### Phase 5: Social Proof (2-3 hrs)
**Goal:** Build trust through testimonials and results

**Tasks:**
- [ ] Build `components/sections/BeforeAfter.tsx`:
  - 4-6 before/after cards
  - Before state (problem): image, text, behavior issue
  - Arrow or divider
  - After state (solution): image, text, transformation result
  - Hover scale animation

- [ ] Build `components/sections/Testimonials.tsx`:
  - Carousel using embla-carousel
  - Each testimonial: photo, name, ★★★★★ rating, quote
  - Dot indicators + arrows for navigation
  - Auto-scroll (optional)
  - Fade-in animation

- [ ] Build `components/sections/SuccessGallery.tsx`:
  - Grid of success photos (6-12 images)
  - Responsive (3 cols desktop, 2 cols tablet, 1 col mobile)
  - Hover overlay with metadata (optional)
  - Lazy loading on images

**Output:** Testimonials carousel working, before/after cards visible, gallery responsive

---

### Phase 6: FAQ, Pricing, Blog, CTA (2-3 hrs)
**Goal:** Answer objections and encourage action

**Tasks:**
- [ ] Build `components/sections/FAQ.tsx`:
  - Accordion (shadcn/ui Accordion)
  - 8-10 Q&A pairs from config
  - Expand/collapse with smooth animation
  - Search/filter (optional)

- [ ] Build `components/sections/Pricing.tsx`:
  - 3 pricing cards (Puppy Package, Behavior Package, Complete Program)
  - Card layout with shadow, icon, title, features list
  - "Request Pricing" button (not actual prices)
  - Hover lift animation

- [ ] Build `components/sections/Blog.tsx`:
  - Latest 3-4 articles (from hardcoded data for now)
  - Card per article: image, title, excerpt, "Read More" link
  - Link to full blog page (optional, can be placeholder)

- [ ] Build `components/sections/FinalCTA.tsx`:
  - Large headline: "Let's Build a Better Relationship with Your Dog"
  - Subtext
  - 2 CTA buttons (Book Consultation, Call Today)
  - Background color or subtle pattern

**Output:** All sections visible, ready for form integration

---

### Phase 7: Contact Form & API (1-2 hrs)
**Goal:** Functional lead capture with email delivery

**Tasks:**
- [ ] Build `components/sections/Contact.tsx`:
  - Form with fields: name, phone, email, dog breed, dog age, problem description, preferred time
  - Real-time validation (zod schema)
  - Submit button with loading state
  - Success/error messages
  - Form state management (react-hook-form)

- [ ] Build `app/api/contact/route.ts`:
  - POST handler
  - Validate request body against zod schema
  - Send email via Resend to owner's inbox
  - Return success/error JSON

- [ ] Build `components/ContactSection.tsx`:
  - Phone number, email, location, hours
  - Google Maps embed (or just address + link)
  - Contact form component above

- [ ] Create `app/contact/page.tsx` (optional standalone contact page)

- [ ] Setup Resend:
  - Get API key from resend.com
  - Add to `.env.local`
  - Test email template

**Output:** Form submits, email delivers to owner inbox, success message shows

---

### Phase 8: SEO & Polish (1-2 hrs)
**Goal:** Search-engine ready, high Lighthouse score

**Tasks:**
- [ ] Create `app/sitemap.ts`:
  - Auto-generate sitemap from routes
  - Include home, contact, blog index

- [ ] Create `app/robots.txt`:
  - Allow all crawlers

- [ ] Add JSON-LD structured data:
  - LocalBusiness schema (in root layout)
  - Service schema (per service section)
  - FAQPage schema (in FAQ section)

- [ ] Optimize images:
  - Use Next.js `<Image>` component
  - Add `alt` text, sizes, quality
  - Lazy load below fold

- [ ] Setup Analytics:
  - GA4 property ID + tracking ID
  - Add gtag script + pageview tracking
  - Track CTA button clicks, form submissions

- [ ] Setup Clarity:
  - Project ID
  - Add tracking script

- [ ] Accessibility:
  - Semantic HTML (h1, h2, nav, main, section, footer)
  - ARIA labels on buttons, form fields
  - Keyboard navigation (Tab through form, buttons)
  - Color contrast check (Lighthouse)

- [ ] Performance:
  - Run Lighthouse audit
  - Target: 90+ on all metrics
  - Optimize CSS, JS, images
  - Enable ISR/caching headers

**Output:** Site SEO-ready, Lighthouse 90+, accessibility compliant

---

## Summary

| Phase | Focus | Approx Time | Deliverable |
|---|---|---|---|
| 1 | Setup & Config | 1-2h | Project configured, compiles, theme ready |
| 2 | Layout & Nav | 2-3h | Navbar, footer, page structure in place |
| 3 | Hero & About | 2-3h | Premium look established |
| 4 | Services & Process | 2-3h | What you do + how visible |
| 5 | Social Proof | 2-3h | Trust signals (testimonials, before/after, gallery) |
| 6 | FAQ/Pricing/Blog/CTA | 2-3h | Objection-handling, lead encouragement |
| 7 | Contact & Email | 1-2h | Lead capture functional |
| 8 | SEO & Polish | 1-2h | Search-ready, high performance |
| **Total** | | **14-22 hours** | **Production-ready site** |

---

## Approach: Can It Be One Shot?

**Short answer:** No, not safely. Here's why:

1. **Testing at each phase** — Building 8 phases at once means hitting a compile error on phase 7 and not knowing if it's a dependency issue from phase 1 or a form bug in phase 7. Phased approach catches issues early.

2. **Visual verification** — Each phase produces a visible, testable milestone. By phase 3 (hero + about), you can *see* if the premium look is working before investing time in the rest.

3. **Parallel feedback** — You can review/approve section designs as they appear, not wait until everything's bundled.

4. **Git commits** — Each phase gets a clean commit; if a section breaks later, it's easy to revert and diagnose.

5. **Email integration** — Phase 7 (Resend) requires an API key and test account setup. Testing it in isolation ensures it works before the full form is wired.

**Recommended pace:**
- **Phases 1-2:** Tomorrow (setup + layout) — ~3-5 hours
- **Phases 3-4:** Day 2 (hero, about, services, process) — ~5-6 hours
- **Phases 5-6:** Day 3 (social proof, FAQ, pricing, blog) — ~5-6 hours
- **Phases 7-8:** Day 4 (contact form, email, SEO, polish) — ~3-4 hours

**Or**, if you want to move faster: combine phases (e.g., 1+2 in one block, 3+4 in one block), and I'll still test/commit after each combined block.

---

## Next Steps

1. Review this plan — does the phasing make sense?
2. Confirm: start with Phase 1 (dependencies + config)?
3. I'll build each phase, test, commit, show you the result before moving to the next.

**Note:** Blog posts, service descriptions, testimonial content, FAQ answers — all come from `lib/constants.ts`, so you can edit them anytime without touching code.
