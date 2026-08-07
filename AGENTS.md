<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Static export into `out/` (see Deployment below)
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build
- `npm run optimize:images` — Shrink hand-placed images in `public/images/` to the sizes the layout paints, and write the OG card. Run it after adding images outside the gallery.

## Deployment
This site is a **static export** (`output: "export"`), served by nginx off disk — there is no Node process in production.

What that costs, and what it means when editing:
- **`next/image` cannot resize anything.** `images.unoptimized` is on, so the file in `public/` is byte-for-byte what the browser downloads, and there is no `srcset`. Any new image must be pre-sized — add its directory to `TARGETS` in `scripts/optimize-static-images.mjs` and run `npm run optimize:images`.
- **No server features.** Route handlers that read the request, server actions, `cookies()`, `headers()`, middleware/proxy, redirects/rewrites/headers in config, and ISR are all unavailable — the build fails rather than degrading.
- **Metadata routes need `export const dynamic = "force-static"`.** `sitemap.ts` and `robots.ts` compile to Route Handlers, which are no longer cached by default; without that line `npm run build` errors out.
- **`NEXT_PUBLIC_SITE_URL` is baked in at build time** (see `.env.example` and `src/lib/site.ts`). Changing the domain means rebuilding.

nginx needs one rule, because routes are emitted as `/gallery.html` rather than `/gallery/index.html`:
```nginx
location / { try_files $uri $uri.html $uri/ =404; }
error_page 404 /404.html;
```

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

@docs/research/INSPECTION_GUIDE.md
