# CtaFooter Specification

## Overview
- **Target file:** `src/components/sections/CtaFooter.tsx`
- **Screenshot:** recon screenshot at scrollY ~9661 (bottom of page) (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static
- **Note on selector:** the `#cta` element in the live DOM is an empty 0-height scroll-anchor marker (used only as a nav-link jump target). The actual visible footer content lives in the following sibling element with `background-color: rgb(0, 0, 0)` (pure black), full viewport height (~871px at 1440 desktop). Build this as the section immediately following the FAQ section; give it `id="cta"` yourself on the real content wrapper so the nav's `#cta` link still works.

## DOM Structure
```
<section class="dark-footer" id="cta"> (bg: black, full width, min-h ~871px, relative — faint light-beam decoration visible at reduced opacity)
  <span class="eyebrow-badge"> "2 spots available" (small pill, same style family as hero's "Booking Open" badge but dark-mode colors — light/translucent text on dark bg)
  <h2> "Let's Connect" (heading, likely same 48px Inter Display style as other section headings, white)
  <p> "Feel free to contact me if having any questions. I'm available for new projects or just for chatting." (gray/muted white, ~16px, 2 lines, centered)
  <a class="cta"> "Book a free intro call →" — outlined pill button (black bg blending with section + visible ~1px light/white-ish border ring, ~30% opacity, to stand out against the black background), radius 154px, padding 12px 24px/20px (same padding pattern as hero CTA)
  <div class="footer-row"> (bottom, flex justify-between)
    <span> "© Hanzo Studio, 2025" (white, 16px, bottom-left)
    <div class="socials"> email / X / LinkedIn / Instagram circular outline icon buttons (bottom-right, same icon set as Nav dropdown)
```

## Computed Styles

### Section
- background: `rgb(0, 0, 0)` (pure black)
- Faint diagonal light-beam decoration still visible (same fixed background layer used site-wide, at reduced opacity/blend-mode against the dark background — approximate with a low-opacity white gradient overlay)

### CTA button
- width: ~216px, height: 51px, border-radius: 154px, padding: 12px 24px 12px 20px (matches hero CTA pattern)
- background: black (same as section — add a visible border, e.g. `border border-white/20`, to differentiate from the section background per screenshot)
- text: white/light gray, with trailing arrow icon (lucide `ArrowRight`)

### Copyright
- font-size: 16px, color: white, positioned bottom-left with top border/divider above the footer row (per screenshot, a thin horizontal rule separates the CTA content from the copyright row)

## Text Content (verbatim)
- Badge: "2 spots available"
- Heading: "Let's Connect"
- Body: "Feel free to contact me if having any questions. I'm available for new projects or just for chatting."
- CTA: "Book a free intro call"
- Copyright: "© Hanzo Studio, 2025"

## Assets
- Reuse the same fixed light-beam background decoration asset used elsewhere on the page (see globals — if not yet built as a shared component, approximate with a CSS radial/linear gradient at low opacity)
- Social icons: reuse `InstagramIcon`, `LinkedinIcon` from `src/components/icons.tsx`, lucide `X` and `Mail` for the remaining two

## Responsive Behavior
- **Desktop (≥1440px):** centered content, footer row full-width flex justify-between, as described
- **Tablet/Mobile:** footer row likely stacks (copyright above/below social icons, centered). Not visually captured — verify in `npm run dev`.
