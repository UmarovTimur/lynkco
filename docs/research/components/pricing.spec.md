# Pricing Specification

## Overview
- **Target file:** `src/components/sections/Pricing.tsx` (client component — needs `useState` for Monthly/Custom toggle)
- **Screenshot:** recon screenshots at scrollY 6901 and after toggle click (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** click-driven toggle, content swap — see full state detail in `docs/research/hanzo.framer.website/BEHAVIORS.md` § Pricing

## DOM Structure
```
<section id="pricing"> (padding: 0 120px)
  <eyebrow> "Pricing" (Instrument Serif italic, shared style)
  <h2> "Fixed Price, Zero Limits" (48px Inter Display, shared heading style)
  <div class="card"> (large rounded card, light gray/white bg, ~padding 64px)
    <div class="left">
      <div class="toggle-row"> "Monthly" label / switch / "Custom" label
      <div class="price"> big number + suffix
      <p class="availability"> "● Booking Open — only 2 Spots Left"
      <a class="cta"> black pill button
    <div class="right">
      <div class="included-card"> white rounded panel, "What's included" heading + 6-item checklist
      <blockquote class="testimonial"> quote text (changes per toggle state)
  <div class="badge-row"> static row of 9 small pill badges below the card
```

## Computed Styles

### Toggle switch
- track: 44×24px, border-radius: 242px (full pill)
- active/"on" (Custom side) fill color: `rgb(255, 94, 0)` — this matches the site's brand accent orange (`--accent-orange` in globals.css)
- inactive label color: `rgba(0, 0, 0, 0.25)` (the non-selected side, e.g. "Monthly" is dimmed when Custom is active)
- white circular thumb, ~18-20px, slides left↔right on toggle with a smooth transition (~150-200ms ease)

### "What's included" heading
- font-size: 24px, font-weight: 500, black

### Price display
- Large number, bold, black — approx 64-72px based on screenshot proportions (not pixel-confirmed; verify against live site). "from" prefix and "/mo" suffix render smaller and gray (`rgba(0,0,0,0.4)`-ish).

### Card
- Large rounded container (~32-40px radius per screenshot), soft off-white/light-gray background with a subtle grain/noise texture overlay (`/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png` used as a background texture — apply as a low-opacity background-image layer)
- Inner "included" panel: white background, rounded (~24px), padding ~40px

## State Content (see BEHAVIORS.md for full trigger/transition detail)

### Monthly (default)
- Price: "$7,500" + "/mo"
- Checklist: Unlimited design requests · Fast turnaround · Fixed monthly rate · Async communication · Flexible scope · Pause anytime
- Availability line: "● Booking Open — only 2 Spots Left"
- CTA: "Book Free Discovery Call"
- Testimonial: "Astrid's minimalist design approach transformed our brand. The simplicity and clarity she brought to our identity made us stand out in a crowded market. Our customers immediately noticed the difference." — Helena Moreau, Creative Director at Studio Novo

### Custom
- Price: "from" + "$11,500" (no `/mo` suffix)
- Checklist: Tailored scope & deliverables · One-off fee or milestone billing · End-to-end collaboration · High-impact execution · Workshops & reviews · Full documentation & assets
- Testimonial: "Effortless process. Exceptional results. Working with Joris felt like having an in-house designer on speed dial." (no attribution captured — omit or reuse Helena Moreau if a name is structurally required)

Each checklist item has a small circular `+` icon (outline, ~20px) to the left of the label text (gray, ~16px).

### Badge row (below the card)
- Static (NOT an auto-scrolling marquee — confirmed via position sampling, see BEHAVIORS.md)
- 9 pill items in a single flex row, each with a small icon + label, separated by thin vertical dividers: Senior-level quality · Systems thinking · Developer-friendly · Clear process · On-brand, every time · Reliable partner · Fast execution · Thoughtful feedback · Smooth handoff
- Row is wider than viewport and clipped by `overflow-hidden` on its parent — fine to let it overflow/clip naturally, no JS needed

## Assets
- `/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png` (card background texture)

## Responsive Behavior
- **Desktop (≥1440px):** 2-column card (price/CTA left, included+testimonial right) as described
- **Tablet/Mobile:** stack to single column. Not visually captured — verify in `npm run dev`.
