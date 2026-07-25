# FounderBio (About-1) Specification

## Overview
- **Target file:** `src/components/sections/FounderBio.tsx`
- **Screenshot:** recon screenshot at scrollY 5866 (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static

## DOM Structure
```
<section id="about-1"> (padding: 0 120px)
  <eyebrow> "Our Projects" (Instrument Serif italic — same shared style)
  <h2> "Pushing boundaries since 2011" — "Pushing boundaries" black, "since 2011" gray (lower contrast, matches the two-tone heading pattern seen in hero/intro)
  <div class="grid two-col">
    <div class="left">
      <img> founder photo, rounded corners
      <div class="socials"> Instagram / LinkedIn / X icon row (small, outline circles)
      <p> "Joris van Dijk" (bold) / "Hanzo Studio, Founder" (gray, smaller) — caption below photo
    <div class="right">
      <p> bio paragraph
      <table/list> career timeline (4 rows)
```

## Computed Styles

### Photo
- width: 708px, height: 541px, border-radius: 24px, `object-fit: cover`

### Heading
- font-size: 48px, Inter Display, 400 weight (same as Process/Work headings)

### Timeline rows
- font-size: 12px per label (role/company/years columns) — likely 3-column row layout with a thin top border divider between rows, generous vertical padding (~16-20px per row based on screenshot spacing)
- 4 rows, each: **Role** (left, black) / **Company** (middle, gray) / **Period** (right, gray, arrow-separated e.g. "2011 → Now")

## Content (verbatim)
- Eyebrow: "Our Projects"
- Heading: "Pushing boundaries since 2011"
- Bio: "Joris van Dijk is a Dutch designer known for his minimalist, expressive digital work. He helps startups and studios create clean interfaces and strong branding. Based in Utrecht, he blends function with emotion — and often spends his free time cycling or exploring generative art."
- Photo caption: "Joris van Dijk" / "Hanzo Studio, Founder"
- Timeline:
  1. Freelance Practice — Hanzo Co. — 2011 → Now
  2. Design Lead — Google — 2024 → Now
  3. Senior Designer — PayPal — 2019 → 2024
  4. Product Designer — Meta — 2016 → 2019

## Assets
- `/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png` (founder photo — also reused in FAQ contact card)
- Icons: lucide-based social icons or the same `InstagramIcon`/`LinkedinIcon`/`X` used in Nav, reused here at small size (~16px) in outline circle buttons (~32px)

## Responsive Behavior
- **Desktop (≥1440px):** 2-column (photo left ~708px / content right) as described
- **Tablet/Mobile:** stack to single column, photo full-width above bio/timeline. Not visually captured — implement with `grid-cols-1 md:grid-cols-2` and verify in `npm run dev`.
