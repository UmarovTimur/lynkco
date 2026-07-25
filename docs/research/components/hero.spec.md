# Hero Specification

## Overview
- **Target file:** `src/components/sections/Hero.tsx`
- **Screenshot:** `docs/design-references/hanzo.framer.website/hero-desktop.png` (see saved screenshot from recon — top of page, scrollY 0)
- **Interaction model:** static after a one-time load-in animation on the heading (see Behaviors)

## DOM Structure
```
<section id="hero"> (full-width, flex column, centered, padding: 0 120px)
  <div> (max-width: 1440px, padding: 180px 0 118px, flex column, centered, gap: 48px)
    <a> eyebrow pill badge
      <span> green dot
      <span> "Booking Open — 2 Spots Left"
    <h1> heading (2 lines, 2 inline images)
      "Unlimited " [img: colorful-app-cards] " Design" (gray)
      "for " [img: dark-rounded-logo] " Solid Startups"
    <p> subtitle
    <div> (flex row, gap ~16px)
      <a> CTA button "Choose your plan →"
      <div> avatar stack + "Trusted by Leaders" label
```

## Computed Styles (exact values from getComputedStyle)

### Section container
- display: flex; flex-direction: column; justify-content: center; align-items: center
- padding: 0 120px (page margin — reduce for tablet/phone, see Responsive)
- max inner width: 1440px, inner padding: 180px 0 118px, gap: 48px

### Eyebrow badge pill
- width: auto (~253px at this content), height: 43px
- background: `rgb(255, 255, 255)` (white)
- border-radius: 382px (fully pill-rounded)
- padding: 8px 16px
- Contains: 6×6px circle dot, `background: rgb(12, 179, 0)` (green), border-radius: 196px (fully round) + text "Booking Open — 2 Spots Left", font-size 12px, color black

### Heading (h1)
- font-family: `"Inter Display"` (implemented via `Inter` variable font w/ `opsz` axis — see globals.css `--font-sans`)
- font-size: 108px
- font-weight: 400
- line-height: 124.2px (≈1.15)
- letter-spacing: -6.48px (tight tracking, ≈ -6% of font-size)
- color: black for "Unlimited", "Solid Startups"; **muted gray** (≈ `rgba(0,0,0,0.35)`, verify exact against live site) for "Design" and "for"
- Two inline images embedded mid-text, each displayed at **148×113px**, `object-fit: cover`, wrapped in a container with visible rounded corners (~16-20px radius, clipped via wrapper `overflow:hidden` + `border-radius`, not on the `<img>` itself — apply radius to a wrapping span/div)
  - Image 1 (after "Unlimited"): `/images/0Y1cjcOdQp68PBw6G3HHfHz6TYo.jpg` — colorful stacked app-card graphic (purple/yellow/green cards)
  - Image 2 (after "for"): `/images/jSslhcqo8HKNjUvPEceq7bhbY.jpg` — dark rounded rectangle with a faint logo mark

### Subtitle
- font-family: Inter Display
- font-size: 16px, font-weight: 400
- line-height: 27.2px (≈1.7)
- color: `rgba(0, 0, 0, 0.5)`
- text: "We help startups and brands create beautiful, functional products — fast and hassle-free." — centered, 2 lines, max-width ~434px

### CTA button ("Choose your plan →")
- width: 196px, height: 51px
- background: `rgb(0, 0, 0)` (black)
- border-radius: 154px (full pill)
- padding: 12px 24px 12px 20px (asymmetric — extra right-side room for arrow icon... actually computed as `12px 20px 12px 24px`, i.e. top/bottom 12px, right 20px, left 24px)
- text: white, ~14-16px, medium weight, with a small right-arrow icon (use lucide `ArrowRight`) after the label

### Trusted-by avatar stack
- 4 overlapping circular avatar images, each ~32-36px diameter, negative margin overlap (~-10px), white 2px border ring
- Source images (use first 4, order approximate — verify against live site):
  - `/images/75ILrhKQhUkwU1dH15BUDezAQ.png`
  - `/images/EgbF2rgcHm4Q19cR6VXfj7f5awk.png`
  - `/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png`
  - `/images/Y3PGv0d0lyAiS8gk3emx3d41fvU.png`
- Below/beside: "Trusted by Leaders" label, small (~12px), gray, letter-spaced uppercase-ish caption style (verify casing against screenshot — screenshot shows normal case "Trusted by Leaders")

## States & Behaviors

### Load-in animation
- **Trigger:** page mount (one-time, not scroll-triggered)
- Heading text reveals with a type-in/stagger effect over ~1-2s on cold load (observed "Unl" incrementally becoming full heading). Implement as a simple CSS fade+slight-y-translate stagger on the heading words/chars using Framer Motion or CSS animation with staggered `animation-delay`, OR treat as acceptable to render statically if animation libraries aren't part of the stack — note this as a nice-to-have, not pixel-critical.

No other interactive states on this section (badge, avatars are static; CTA has standard link/button hover only — no exact hover values captured, use a subtle opacity/scale-98 default).

## Assets
- `/images/0Y1cjcOdQp68PBw6G3HHfHz6TYo.jpg` (inline heading image 1)
- `/images/jSslhcqo8HKNjUvPEceq7bhbY.jpg` (inline heading image 2)
- `/images/75ILrhKQhUkwU1dH15BUDezAQ.png`, `/images/EgbF2rgcHm4Q19cR6VXfj7f5awk.png`, `/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png`, `/images/Y3PGv0d0lyAiS8gk3emx3d41fvU.png` (avatar stack)
- Icon: lucide `ArrowRight` for CTA button

## Text Content (verbatim)
- Badge: "Booking Open — 2 Spots Left"
- Heading: "Unlimited [img] Design for [img] Solid Startups"
- Subtitle: "We help startups and brands create beautiful, functional products — fast and hassle-free."
- CTA: "Choose your plan"
- Caption: "Trusted by Leaders"

## Responsive Behavior
- **Desktop (≥1440px):** as described above, page padding 120px each side
- **Tablet (810–1439px):** reduce page padding (try 48-64px), heading font-size scales down substantially (Framer typically halves large display type — try ~56-64px), inline images scale proportionally with text
- **Mobile (≤809px):** page padding ~16-24px, heading likely wraps to more lines and drops to ~32-40px font-size, subtitle/CTA/avatar stack stack vertically centered. Exact mobile values NOT captured (window resize non-functional in this environment) — implement using Tailwind responsive classes with these approximate targets and verify visually in `npm run dev` during QA.
- **Breakpoint:** site-wide breakpoints are 1440px (desktop) / 810px (tablet) / below 810px (phone) — see PAGE_TOPOLOGY.md
