# Intro Specification

## Overview
- **Target file:** `src/components/sections/Intro.tsx`
- **Screenshot:** recon screenshot at scrollY ~1500-1888 (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static (badges have a fixed tilt, no idle animation — confirmed via 2s before/after transform sampling)

## DOM Structure
```
<section id="intro"> (padding: 0 120px, centered content)
  <div class="eyebrow"> — line — "Hello!" (italic serif) — line —
  <p class="statement"> big centered statement, last word(s) lower-contrast
  6× floating skill badge pills, absolutely/relatively scattered around the statement text, each with a small colored icon + label, each tilted at a fixed small rotation angle
```

## Computed Styles

### Eyebrow "Hello!"
- font-family: Instrument Serif, italic, 400 weight
- font-size: 24px, line-height: 28.8px
- color: `rgba(0, 0, 0, 0.5)`
- Flanked by horizontal rule lines (thin, gray, ~140px wide each — per screenshot)

### Statement paragraph
- font-family: Inter Display, 400 weight
- font-size: 44px, line-height: 61.6px (≈1.4), letter-spacing: -1.76px
- color: black; last word ("customers") is lower-contrast gray (≈ `rgba(0,0,0,0.3)`, verify exact against live site)
- max-width: ~700px, centered, text-align: center
- text: "We help startups and enterprise to establish an emotional connection between their products and happy engaged customers"

### Skill badge pills (6 total)
- background: white, border-radius: 147px (full pill)
- padding: `4px 20px 4px 4px` (tight left padding for the icon, roomy right for text)
- height: ~48-52px, width: auto (content-based, ranges 108-176px across the 6 badges)
- font-size: 16px, Inter Display, black
- Each pill contains a small circular colored icon chip (~40px, left side) + label text
- **Rotation:** each pill's outer wrapper has a fixed static rotation transform, alternating small angles (~ ±4° to ±5°, e.g. `matrix(0.9976, 0.0698, -0.0698, 0.9976, 0, 0)` ≈ `rotate(4deg)`) — confirmed static, NOT animated (verified no idle drift over 2s sampling)
- Labels (verbatim): Strategy, UI/UX, Prototyping, Animation, Research, Design systems
- Positioning: scattered around the statement text — 3 badges upper-left/right, 3 lower-left/right roughly (see screenshot for exact placement per badge; use `absolute` positioning within a `relative` wrapper matching the screenshot layout)
- Icon source: exact icons not extracted (client-hydrated content not present in static HTML). Use reasonable Lucide equivalents as a best-effort substitute: Strategy→`Target`, UI/UX→`Layout` or `PenTool`, Prototyping→`Layers`, Animation→`Sparkles` or a motion icon, Research→`Search`, Design systems→`Grid2x2` — verify/swap against live site screenshot colors during QA (each icon chip appeared to have a distinct background color: orange, dark, teal/green, pink, blue, yellow per the earlier full-page color sample).

## Assets
- No downloadable images for this section (icons are small colored chips, build with Lucide + solid background colors matching screenshot per-badge)

## Text Content (verbatim)
- "Hello!"
- "We help startups and enterprise to establish an emotional connection between their products and happy engaged customers"
- Badges: Strategy, UI/UX, Prototyping, Animation, Research, Design systems

## Responsive Behavior
- **Desktop (≥1440px):** as described, badges scattered absolutely around centered statement
- **Tablet/Mobile:** statement font-size should scale down substantially (~28-32px on mobile), badges likely collapse into a static flex-wrap row below/above the statement rather than absolute scatter (typical Framer mobile fallback pattern) — not visually captured, implement conservatively and verify in `npm run dev`.
