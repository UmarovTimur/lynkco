# Work (Recent Case Studies) Specification

## Overview
- **Target file:** `src/components/sections/Work.tsx`
- **Screenshot:** recon screenshots at scrollY 4285/5100 (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static grid (no confirmed hover behavior this pass — apply a subtle standard hover, e.g. `hover:opacity-95` or slight image scale, as best-effort polish)

## DOM Structure
```
<section id="work"> (padding: 0 120px)
  <eyebrow> "Our Projects" (Instrument Serif italic, same style as process/faq/pricing eyebrows)
  <h2> "Recent Case Studies" (Inter Display, 48px, black — same heading style as Process's "Here's how it works")
  <div class="grid"> 2×2 grid, gap ~24-32px
    4× case study cards: Strida, Bravo, Nitro, Fargo
```

## Computed Styles

### Grid
- 2 columns × 2 rows, gap ≈ 24-32px (exact value not pinned — use `gap-8` as a reasonable Tailwind default, verify against screenshot)
- Each card image area: light gray background (`#f0f0f0`-ish, matches page canvas gray), rounded corners (~16-24px), full-bleed device-mockup screenshot inside, `object-fit: cover` or `contain` depending on image (verify per screenshot — mockups appear to bleed off the card edges in a "cropped device" style)

### Card caption row (below each image)
- Title: 20px, regular (400) weight, black — e.g. "Strida"
- Tag pills (1-2 per card): small text ~12px, black, likely in a light rounded pill badge (bg ≈ light gray, padding ≈ 4px 10px, border-radius full) — positioned right-aligned opposite the title

## Card Content (verbatim)
| Card | Image | Tags |
|---|---|---|
| Strida | `/images/aLickQcDkn7JlTftxkq33tHE.jpg` | portfolio, sidebar |
| Bravo | `/images/ISAjHKBwJV6BJzD55lhE8XAFBM.jpg` | UI/UX, App |
| Nitro | `/images/nT9mTBoP2h9YdschdGP72ovRHk.jpg` | Design System, Web |
| Fargo | `/images/vzQsCEYy7zN2RmDQcgrizz0O0MI.jpg` | SaaS, Web |

Grid order (top-left → bottom-right): Strida, Bravo, Nitro, Fargo (matches source DOM/visual order).

## Assets
- `/images/aLickQcDkn7JlTftxkq33tHE.jpg`
- `/images/ISAjHKBwJV6BJzD55lhE8XAFBM.jpg`
- `/images/nT9mTBoP2h9YdschdGP72ovRHk.jpg`
- `/images/vzQsCEYy7zN2RmDQcgrizz0O0MI.jpg`

## Text Content (verbatim)
- Eyebrow: "Our Projects"
- Heading: "Recent Case Studies"
- Card titles/tags: see table above

## Responsive Behavior
- **Desktop (≥1440px):** 2×2 grid as described
- **Tablet/Mobile:** collapse to 1 column, full-width cards stacked. Not visually captured — implement with `grid-cols-1 md:grid-cols-2` and verify in `npm run dev`.
