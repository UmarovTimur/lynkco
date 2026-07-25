# Page Topology — hanzo.framer.website

Single-page site (Framer-built portfolio template). Total scroll height ≈ 10,518px at desktop (>1439px breakpoint).

## Layers (z-index / positioning)

| Layer | Position | Notes |
|---|---|---|
| Background light-beam decoration | `fixed`, z-index 0 | Diagonal light-ray gradient image, spans full viewport, visible behind hero/light sections. Persists across whole page (light sections only — footer is dark, no beams visible there but element likely still present, hidden by dark bg). |
| Background secondary layer | `absolute`, z-index 0 | Second decorative layer, appears to be paired with the light beams for the hero/about area only (height 1742px, positioned at very top). |
| Nav | `fixed`, top: 0, full width | "Hanzo" pill logo (left) + circular hamburger button (right). Always visible, does NOT change style on scroll (verified: identical appearance at scroll 0 and scroll 8000+). |
| Page sections (in-flow) | `relative` | See section list below. |
| Framer platform chrome (`Remix for free`, `Made in Framer` badges) | `fixed`, bottom-right | NOT part of the site design — these are Framer's own platform badges injected on all Framer-hosted sites. **Exclude from clone.** |

## Sections (top → bottom, desktop px offsets)

1. **Hero** `#hero` (0–843px)
   - Eyebrow pill badge "● Booking Open — 2 Spots Left"
   - Large heading "Unlimited [image] Design for [image] Solid Startups" — two inline images embedded mid-heading (a colorful app-card graphic after "Unlimited", a dark rounded rect logo mark after "for")
   - Subtitle paragraph
   - CTA button "Choose your plan →" (black pill) + avatar stack "Trusted by Leaders"
   - Typewriter/reveal animation plays once on page load (heading text types in)

2. **About / Recent Work bento** `#about` (843–1888px)
   - Eyebrow-less intro: "See Recent Work" label
   - 2-column masonry/bento grid of ~8 app-mockup screenshot images (dark cards), varying sizes, with a centered circular "folder" icon overlay button in the middle of the grid (likely a "view all" affordance)
   - 24 `<img>` elements total in this section (some cards use multiple stacked images)

3. **Intro** `#intro` (1888–2759px)
   - Small "Hello!" script/serif label with flanking horizontal rules
   - Large centered statement: "We help startups and enterprise to establish an emotional connection between their products and happy engaged customers" (last word(s) lower contrast/gray)
   - 6 floating pill badges scattered around the text: Strategy, UI/UX, Prototyping, Animation, Research, Design systems — each with a small colored icon. These appear to float/drift (likely subtle idle animation — see BEHAVIORS.md)

4. **Process** `#process` (2759–4285px)
   - Eyebrow "Our Process, Explained" (serif italic) + heading "Here's how it works"
   - 3 stacked, rotated white cards (numbered 1/2/3: Subscribe, Request, Get Your Designs), connected by hand-drawn red squiggle/arrow SVG lines. Cards are in a fixed static rotated arrangement (NOT scroll-triggered — verified identical at two different scroll positions within the section).
   - Below the cards: 2-column testimonial row (Sophie Lemaire / Product Lead at Loomi, and Milan Bakker / Founder of Drifted Studio) each with a pause/play icon (likely audio testimonial widget, decorative)

5. **Work** `#work` (4285–5866px)
   - Eyebrow "Our Projects" + heading "Recent Case Studies"
   - 2×2 grid of project case-study cards: Strida (portfolio/sidebar tags), Bravo (UI/UX/App tags), Nitro (Design System/Web tags), Fargo (SaaS/Web tags). Each card is a large device-mockup screenshot with title + tag pills below.

6. **About-1 (Founder bio)** `#about-1` (5866–6901px)
   - Eyebrow "Our Projects" + heading "Pushing boundaries since 2011"
   - Left: founder photo (Joris van Dijk), social icons below (IG/LinkedIn/X)
   - Right: bio paragraph + career timeline table (role, company, years) — Freelance Practice/Hanzo Co./2011→Now, Design Lead/Google/2024→Now, Senior Designer/PayPal/2019→2024, Product Designer/Meta/2016→2019

7. **Pricing** `#pricing` (6901–8420px)
   - Eyebrow "Pricing" + heading "Fixed Price, Zero Limits"
   - Large card containing: Monthly/Custom toggle switch (click-driven, orange active track), big price display ($7,500/mo or from $11,500 for Custom), "Booking Open" sub-line, "Book Free Discovery Call" button
   - Right side: "What's included" checklist (6 items, changes per toggle state) + rotating/changing testimonial quote (changes per toggle state)
   - Below: horizontal marquee/scroll strip of small pill badges (Senior-level quality, Systems thinking, Developer-friendly, Clear process, On-brand every time, Reliable partner, Fast execution, Thoughtful feedback, Smooth handoff) — likely auto-scrolling marquee

8. **FAQ** `#faq` (8420–9646px)
   - Eyebrow "FAQ" + heading "Your Questions, Answered"
   - Left: contact card (avatar, "Have more questions? Book a free discovery call", CTA button, email link)
   - Right: accordion list of 7 Q&A pairs, click-to-expand (+ rotates to × icon), one item can be open — confirmed default state has none expanded until clicked

9. **CTA / Footer** `#cta` (9646–10518px)
   - Dark (near-black) background, light-beam decoration still visible faintly
   - "Feel free to contact me if having any questions. I'm available for new projects or just for chatting."
   - "Book a free intro call" outlined pill button
   - Copyright "© Hanzo Studio, 2025" (bottom-left) + social icons row (email/X/LinkedIn/Instagram, circular outline buttons, bottom-right)

## Responsive Breakpoints (extracted from stylesheet media queries — see note below)

Framer standard 3-tier breakpoints confirmed present in the site's CSS:
- **Desktop:** ≥ 1440px (base/default styles, unprefixed)
- **Tablet:** 810px – 1439.98px (`(min-width: 810px) and (max-width: 1439.98px)`)
- **Phone:** ≤ 809.98px (`(max-width: 809.98px)`)

> **Tooling note:** Browser window resize is non-functional in this environment (fixed at 1920×871, window manager does not honor resize requests). Mobile/tablet visuals were NOT captured via screenshot. Instead, mobile/tablet CSS overrides must be extracted per-component directly from the stylesheet's scoped media-query rules (selector + declarations) during each component's spec-writing step, and verified visually later via `npm run dev` in a real resizable browser during Phase 5 QA.

## Global Behaviors
See `BEHAVIORS.md` for full detail. Summary:
- Nav: fixed, static appearance (no scroll-triggered style change)
- Hamburger → click-driven dropdown panel (nav links + social icons)
- Hero heading: one-time load-in animation (typewriter/reveal)
- Intro badges: idle floating animation (subtle drift)
- Process cards: static rotated layout, no scroll-trigger
- Pricing toggle: click-driven, swaps price/checklist/testimonial content with transition
- FAQ: click-to-expand accordion, icon rotation
- Pricing marquee: auto-scrolling badge strip (time-driven, likely CSS `animation` with infinite loop)
