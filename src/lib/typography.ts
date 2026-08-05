/**
 * Shared look for section headings: large, tight and heavy.
 *
 * Deliberately kept out of AnimatedHeading.tsx. That module is `"use client"`,
 * and a server component importing a plain value from a client module gets a
 * client reference rather than the string — which still works when handed
 * straight to a prop, but silently contributes nothing inside `cn()`, leaving
 * the heading unstyled with no error anywhere.
 */
export const SECTION_HEADING_CLASS =
  "mt-4 text-center text-4xl font-bold tracking-[-0.03em] text-black md:text-5xl lg:text-6xl";
