/**
 * Canonical site identity, in one place.
 *
 * Everything SEO-facing derives from `SITE_URL`: `metadataBase` in the root
 * layout, the absolute URLs in sitemap.xml and robots.txt, the `og:url` and
 * canonical tags, and the JSON-LD `@id`s. Get it wrong in one place and search
 * engines see two sites; deriving it all from here means it can only be wrong
 * everywhere at once, which is the failure mode you notice.
 *
 * Set NEXT_PUBLIC_SITE_URL at build time (see .env.example). It has to be
 * NEXT_PUBLIC_ rather than a server var because `output: "export"` bakes every
 * value in at build — there is no server left to read a private env var at
 * request time.
 */

const FALLBACK = "https://lynkco06.example";

function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    // Loud on purpose. A build that silently ships the placeholder produces a
    // sitemap and a set of canonicals pointing at a domain that does not exist,
    // and that is the kind of thing nobody notices until rankings move.
    console.warn(
      "\n[site] NEXT_PUBLIC_SITE_URL is not set — falling back to " +
        `${FALLBACK}.\n` +
        "[site] sitemap.xml, robots.txt, canonicals and OG tags will all point\n" +
        "[site] at that placeholder. Set it before deploying.\n",
    );
    return FALLBACK;
  }

  // Trailing slashes make `new URL(path, base)` behave differently and turn up
  // later as duplicate canonicals, so normalise once, here.
  return raw.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

/** Brand name, used in metadata, JSON-LD and the OG card. */
export const SITE_NAME = "Lynk & Co 06 — параллельный импорт";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
