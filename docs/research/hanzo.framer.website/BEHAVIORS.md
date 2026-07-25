# Behavior Bible — hanzo.framer.website

## Navigation (`#nav`, fixed top:0)
- **Interaction model:** static + click-driven dropdown
- Nav bar itself does NOT change appearance on scroll (verified identical computed styles/screenshot at scrollY 0 and scrollY 8000+ — no shrink, no background/shadow change, no sticky-trigger threshold)
- Hamburger button (circular, white bg, ≡ icon) → **click** → opens a dropdown panel anchored top-right containing: nav links (Process, Work, About, Pricing, FAQ, Contact), a highlighted "Get Template" link (orange/red text, `rgb(255, 55, 0)`-ish), and 3 social icons (X, LinkedIn, Instagram) in circular outline buttons. Icon swaps from ≡ to × while open.
- No scroll-snap, no smooth-scroll library detected (`.lenis` / `.locomotive-scroll` classes absent; native scroll behavior).

## Hero (`#hero`)
- **Interaction model:** time-driven, one-shot on load
- Heading text ("Unlimited [img] Design for [img] Solid Startups") plays a type-in/reveal animation on initial page load (observed the heading rendering incrementally, "Unl" → full text, over roughly 1-2s on cold load). Treat as a one-time entrance animation (e.g. Framer's built-in text "type" effect or word/char stagger fade-in). Not scroll-triggered — happens immediately on mount.
- Static after load; no further animation.

## About / Recent Work bento (`#about`)
- **Interaction model:** static (no confirmed hover/click states found on the grid images themselves; the central circular folder icon is likely a static decorative badge, not verified as clickable — treat as non-interactive unless spec-writing reveals a href/cursor:pointer)

## Intro (`#intro`)
- **Interaction model:** static
- The 6 floating skill badges (Strategy, UI/UX, Prototyping, Animation, Research, Design systems) have a **fixed** rotation transform per badge (e.g. `matrix(0.997564, 0.0697565, -0.0697565, 0.997564, 0, 0)` ≈ `rotate(4deg)`), confirmed static via 2-second before/after sampling of `getComputedStyle().transform` — no idle float/drift animation. Each badge is simply statically tilted at a slightly different angle to create a "scattered" look.

## Process (`#process`)
- **Interaction model:** static (NOT scroll-driven)
- The 3 numbered cards (Subscribe/Request/Get Your Designs) sit in a fixed, static rotated/offset stack with hand-drawn red SVG squiggle-arrow connectors between them. Verified identical layout at scrollY 2759 and scrollY 3400 (two different scroll positions within the section) — confirms this is a static illustrative layout, not a scroll-triggered stacking/reveal animation. Build as static absolutely/relatively positioned cards with fixed rotation transforms, no scroll listeners needed.
- Testimonial pair below (Sophie Lemaire / Milan Bakker) — each has a play/pause icon button; not verified as functional audio (no `<audio>` element found in DOM sweep) — treat as decorative UI icon only.

## Work (`#work`)
- **Interaction model:** static grid (no confirmed hover-lift verified this pass — apply standard subtle hover scale/shadow per shadcn conventions if builder wants polish, but no exact values extracted; mark as best-effort)

## About-1 / Founder bio (`#about-1`)
- **Interaction model:** static

## Pricing (`#pricing`)
- **Interaction model:** click-driven toggle, content swap
- **Trigger:** click on "Monthly" or "Custom" label / toggle switch
- **State A — Monthly (default):**
  - Price: `$7,500` `/mo` (large number black, `/mo` gray)
  - Checklist: Unlimited design requests · Fast turnaround · Fixed monthly rate · Async communication · Flexible scope · Pause anytime
  - Sub-line above CTA: "● Booking Open — only 2 Spots Left"
  - CTA: "Book Free Discovery Call"
  - Testimonial: Helena Moreau / Creative Director at Studio Novo — "Astrid's minimalist design approach transformed our brand..."
- **State B — Custom:**
  - Price: `from` `$11,500` (gray "from" prefix + large black number, no `/mo`)
  - Checklist: Tailored scope & deliverables · One-off fee or milestone billing · End-to-end collaboration · High-impact execution · Workshops & reviews · Full documentation & assets
  - Testimonial: "Effortless process. Exceptional results. Working with Joris felt like having an in-house designer on speed dial." (no attribution visible in captured view)
- Toggle switch itself: pill track, orange/red (`rgb(255, 55, 0)`-ish) active fill, white circular thumb slides left (Monthly) ↔ right (Custom)
- **Transition:** content swap appears instant/fast-fade in screenshots taken 1s apart — exact easing/duration not captured via DOM diffing; implement as a quick opacity/fade cross-fade (~150-200ms) as a reasonable default, note as an assumption for QA to verify against live site.
- Badge row below the card (Senior-level quality, Systems thinking, Developer-friendly, Clear process, On-brand every time, Reliable partner, Fast execution, Thoughtful feedback, Smooth handoff): **confirmed static**, NOT an auto-scrolling marquee. Verified via `getBoundingClientRect().x` sampled 2s apart on the row container — no movement. It is simply a flex row wider than its `overflow: hidden` parent, clipped at the edges. Build as a static flex row, no animation.

## FAQ (`#faq`)
- **Interaction model:** click-driven accordion
- **Trigger:** click anywhere on a question row
- **State A (collapsed, default):** icon shows `+` (orange/red), no answer text visible, row has bottom border only
- **State B (expanded):** icon rotates to `×`, answer paragraph fades/slides in below the question (gray text), extra vertical padding added
- Multiple items can seemingly stay independent (not strictly verified as accordion-exclusive vs multi-open; only one was tested). Assume standard single-item-open accordion unless builder observes otherwise — low risk either way visually.
- 7 Q&A pairs total (see PAGE_TOPOLOGY.md / page text dump for verbatim copy).

## CTA / Footer (`#cta`)
- **Interaction model:** static
- Dark theme section (background flips from light gray to near-black `rgb(38,38,38)`-ish / `rgb(0,0,0)`-ish — exact value to confirm in spec extraction). No scroll-trigger for the theme flip; it's simply the section's own background color, encountered naturally on scroll.

## Global
- **Smooth scroll library:** none detected (no `.lenis`, no `.locomotive-scroll` wrapper classes)
- **Scroll-snap:** none detected on the page container
- **Fixed background decoration:** a diagonal light-beam gradient layer (`position: fixed`, z-index 0) sits behind the light-colored sections (hero through about-1/pricing/faq); footer uses a dark background where the same beams are faintly visible at reduced opacity/blend mode — confirm exact blend mode during footer spec extraction.
- **Framer platform chrome** (`Remix for free` badge, gift icon with counter, `Made in Framer` badge) — fixed bottom-right, NOT part of the template design, exclude entirely from the clone.
