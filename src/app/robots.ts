import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Required under `output: "export"` — see the note in sitemap.ts. */
export const dynamic = "force-static";

/**
 * Emitted as a real /robots.txt at build time.
 *
 * Everything is crawlable — this is a two-page marketing site with nothing
 * private on it. The one thing worth stating explicitly is the sitemap
 * location, since that is how a crawler finds /sitemap.xml without guessing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
