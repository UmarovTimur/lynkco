# Process Specification

## Overview
- **Target file:** `src/components/sections/Process.tsx`
- **Screenshot:** recon screenshots at scrollY 2759/3400 (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static — confirmed NOT scroll-driven (identical card layout at two different scroll positions within the section)

## DOM Structure
```
<section id="process"> (padding: 0 120px)
  <eyebrow> "Our Process, Explained" (Instrument Serif italic)
  <h2> "Here's how it works"
  <div class="cards-stack"> (relative, ~600px tall) — 3 white cards, statically rotated/offset, overlapping, with 2 red hand-drawn squiggle-arrow connector images between them
  <div class="testimonials"> 2-column row below the cards
```

## Computed Styles

### Eyebrow + Heading (shared pattern — reused across most sections, e.g. also seen in `intro`, `work`, `pricing`, `faq`)
- Eyebrow: Instrument Serif italic, 400, font-size 24px, line-height 28.8px, color `rgba(0,0,0,0.5)`, flanked by thin horizontal rules
- Heading: Inter Display, 400, font-size 48px, color black, centered

### Cards (×3: "Subscribe" / "Request" / "Get Your Designs")
- width: 502px, height: 493px
- background: white, border-radius: 16px, padding: 32px
- Each card statically rotated a few degrees and vertically/horizontally offset to create a "fanned stack" look (see screenshot for exact per-card rotation/offset — approx: card 1 rotated ~-4°, card 2 ~0° slightly forward, card 3 ~+3°, with card 2 positioned highest z-index/most prominent)
- Content inside each card: large number (72px, Inter Display, black, top-left) + title (bold, ~24px) + description (gray, ~16px) at bottom
- Numbers: "1", "2", "3"
- Titles: "Subscribe", "Request", "Get Your Designs"
- Description (same text repeated for all 3 — verbatim from source): "Choose a plan and request as many designs as you need."

### Connector images (red hand-drawn squiggle/arrow lines between cards)
- These are **image assets**, not SVG paths or CSS: `/images/GQYbkjoIOqJZo9gC9bpE4YLn18.png` and `/images/TjQr3Mj8oNK6Ndfogb5IMNxXGg.png`
- Positioned absolutely, connecting card 1→2 and card 2→3 respectively (per screenshot: one arcs from top of card 1 down to card 2's number area, the other loops between card 2 and card 3)
- Render as absolutely-positioned `<img>` elements layered above the cards; approximate placement from screenshot since exact px coordinates weren't captured — prioritize matching the screenshot silhouette over exact-to-the-pixel placement.

### Testimonials row (below the card stack)
- 2-column layout, divided by a thin vertical rule
- Each testimonial: quote text (~20px, black, ~3 lines), a small pause/play icon button (decorative, top-right of quote, ~28px circle), then avatar (32px circle) + name (bold) + role (gray, smaller) below
- Testimonial 1: "Working with Joris was a game-changer. He instantly understood our vision and translated it into a sleek, intuitive product. The process felt effortless, and the results exceeded our expectations." — Sophie Lemaire, Product Lead at Loomi
- Testimonial 2: "Joris brings clarity to chaos. His design work is not only beautiful but deeply strategic. He helped us rebrand from the ground up, and our audience response has been incredible." — Milan Bakker, Founder of Drifted Studio
- Avatar images: exact source unconfirmed — reuse one of the hero avatar images (`/images/75ILrhKQhUkwU1dH15BUDezAQ.png`, `/images/EgbF2rgcHm4Q19cR6VXfj7f5awk.png`) as placeholders per name; verify against live site during QA.

## Assets
- `/images/GQYbkjoIOqJZo9gC9bpE4YLn18.png` (squiggle connector 1)
- `/images/TjQr3Mj8oNK6Ndfogb5IMNxXGg.png` (squiggle connector 2)
- Reused avatar images (see above)
- Icon: lucide `Pause` for the testimonial widget button (static, non-functional)

## Text Content (verbatim)
See DOM Structure section above — all copy is verbatim from the live site.

## Responsive Behavior
- **Desktop (≥1440px):** fanned 3-card stack, 2-col testimonials as described
- **Tablet/Mobile:** cards likely stack vertically in numeric order without rotation (typical Framer mobile fallback), testimonials stack to 1 column. Not visually captured — implement conservatively (`flex-col` stack, remove rotation transforms below `md:` breakpoint) and verify in `npm run dev`.
