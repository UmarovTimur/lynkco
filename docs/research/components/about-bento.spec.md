# AboutBento (Recent Work Preview) Specification

## Overview
- **Target file:** `src/components/sections/AboutBento.tsx`
- **Screenshot:** recon screenshots at scrollY 843/1500 (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** static (whole card likely links out to a portfolio page — wrap in an `<a>` if a clear single destination isn't obvious; otherwise render as a non-interactive showcase panel)

## DOM Structure
```
<section id="about"> (full width, padding: 0 120px)
  <div class="dark-card"> (max-width 1440px, bg #262626, border-radius 24px, overflow hidden, relative)
    <div class="grid"> 2-column bento grid of 6 screenshot images (3 rows)
    <div class="center-badge"> circular dark folder-icon button, absolutely centered
    <span class="label"> "See Recent Work" — bold white 16px Inter Display, centered over the grid (high z-index, likely with a subtle backdrop/overlay behind it for legibility)
```

## Computed Styles

### Card container
- width: 1440px (full inner content width), background: `rgb(38, 38, 38)`, border-radius: 24px
- Section padding: 0 120px (same page margin as nav/hero)

### Image grid
- 2 columns × 3 rows, each image tile: **648×486px**, `object-fit: cover`
- Column 1 items (top→bottom): `670uUrkwoRnzhCl9b3kEMwUmgE4.jpg`, `J4Ox47KYv4g8Lb2C0PXNkjDaA.jpg`, `wo0P2ApHuac8yCSOoIU4GYSCkOc.png`
- Column 2 items (top→bottom): `9nNEv94U4EwW3ZkcswuOBMt2jk.jpg`, `cpbJvQoTTkomFOd8RSNsHF3b8.jpg`, `TWgBR6dpy8VfcVcGIy2oyBYzyY.jpg`
- Row gap ≈ 48px between tiles (measured 534px row pitch − 486px tile height)
- **Possible enhancement (unconfirmed, low priority):** raw position sampling suggested the two columns may scroll/parallax at slightly different vertical offsets rather than being perfectly static-aligned. Build as a static 2-col grid first; only add a scroll-parallax effect if time permits and it can be verified against the live site.

### Center overlay
- "See Recent Work": white, bold (700), 16px, Inter Display, centered both axes over the grid
- Below/near it: a circular dark button (~64px, folder icon, per screenshot) — treat as decorative/non-interactive unless the live site shows it's clickable

## Assets
- `/images/670uUrkwoRnzhCl9b3kEMwUmgE4.jpg`
- `/images/J4Ox47KYv4g8Lb2C0PXNkjDaA.jpg`
- `/images/wo0P2ApHuac8yCSOoIU4GYSCkOc.png`
- `/images/9nNEv94U4EwW3ZkcswuOBMt2jk.jpg`
- `/images/cpbJvQoTTkomFOd8RSNsHF3b8.jpg`
- `/images/TWgBR6dpy8VfcVcGIy2oyBYzyY.jpg`

## Text Content (verbatim)
- "See Recent Work"

## Responsive Behavior
- **Desktop (≥1440px):** 2×3 grid as described
- **Tablet/Mobile:** stack to single column, reduce tile height proportionally, reduce section side padding to ~24-48px. Not visually captured (see global note in PAGE_TOPOLOGY.md on resize tooling limitation) — implement with Tailwind `grid-cols-1 md:grid-cols-2` and verify in `npm run dev`.
