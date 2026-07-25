# FAQ Specification

## Overview
- **Target file:** `src/components/sections/Faq.tsx` (client component — `useState` for which item is expanded)
- **Screenshot:** recon screenshots at scrollY 8420 (collapsed) and after clicking item 1 (expanded) (`docs/design-references/hanzo.framer.website/`)
- **Interaction model:** click-driven accordion — see BEHAVIORS.md § FAQ

## DOM Structure
```
<section id="faq"> (padding: 0 120px)
  <eyebrow> "FAQ" (Instrument Serif italic, shared style)
  <h2> "Your Questions, Answered" (48px Inter Display, shared heading style)
  <div class="grid two-col">
    <div class="contact-card"> light gray rounded card, avatar + text + CTA + email link
    <div class="accordion"> 7 Q&A rows, ~720px wide, divided by thin horizontal rules
```

## Computed Styles

### Contact card (left column)
- Light gray/off-white rounded panel (~24px radius per screenshot), padding ~40px
- Contains: circular avatar (~48px, reuses founder photo `/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png`), heading text "Have more questions?" (bold, ~18-20px) + "Book a free discovery call" (regular, same size), black pill CTA button "Book a Discovery Call →" (same style as hero CTA — black bg, white text, full-radius pill, arrow icon), then smaller gray text "Or, email me at" + orange link "joris@hanzo.com"

### Accordion rows (right column, ~720px wide)
- Question text: font-size 24px, weight 400, black
- Row has a bottom border divider (thin, light gray, ~1px) both above the first item and below each item
- Icon: `+` (collapsed) / `×` (expanded) — orange/red color (`--accent-orange`), positioned right-aligned, ~20px, rotates 45° on expand (turning + into ×) — use lucide `Plus` rotated via CSS `rotate-45` class when open
- **Collapsed state:** only question + icon visible, generous vertical padding (~28-32px)
- **Expanded state:** answer paragraph appears below the question (gray text, ~16px, max-width ~85% of row), extra bottom padding added; animate height/opacity transition (~200-250ms ease) when toggling
- Only one item needs to support being open at a time is NOT confirmed either way — implement as independent per-item toggles (multi-open allowed) unless simplicity favors single-open; either is visually acceptable

## Content (verbatim, 7 items)
1. **What's the difference between a subscription and a custom project?** — The subscription is ongoing and flexible — ideal for continuous design needs. Custom projects are one-time, fixed-scope engagements for larger goals like a rebrand or product launch.
2. **How fast is the turnaround?** — Most requests are delivered within 1–2 business days. Larger tasks may take longer, but you'll always be kept in the loop.
3. **How many requests can I make?** — As many as you like — with a subscription, you can queue unlimited requests, and they'll be handled one at a time in priority order.
4. **What types of design do you handle?** — Websites, product UI, landing pages, brand assets, decks, social media visuals — anything digital that needs to look and feel sharp.
5. **What tools do you use?** — Figma for design, Notion for task management, and Slack or email for async communication.
6. **Can I pause the subscription?** — Yes — you can pause anytime and resume when you're ready. Unused days roll over.
7. **Do you offer development too?** — Joris focuses on design only, but all deliverables are dev-ready. He can also recommend trusted no-code or Webflow/Framer developers if needed.

Contact card: "Have more questions?" / "Book a free discovery call" / CTA "Book a Discovery Call" / "Or, email me at joris@hanzo.com" (mailto link)

## Assets
- `/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png` (avatar, reused from founder bio)
- Icon: lucide `Plus` (rotated 45° for the "×" expanded state), `ArrowRight` for the CTA button

## Responsive Behavior
- **Desktop (≥1440px):** 2-column (contact card left, accordion right) as described
- **Tablet/Mobile:** stack to single column, contact card above accordion. Not visually captured — verify in `npm run dev`.
