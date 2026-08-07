import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Required, not optional, in this version. Metadata routes compile down to
 * Route Handlers, and Route Handlers are no longer cached by default — so under
 * `output: "export"` the build refuses to emit this file until it is told the
 * route really is static ("export const dynamic ... not configured on route
 * /sitemap.xml"). Removing this line breaks `npm run build`, it does not
 * silently fall back.
 */
export const dynamic = "force-static";

/**
 * Emitted as a real /sitemap.xml file at build time — metadata routes are
 * among the handful of route conventions a static export still supports,
 * because this one runs at build and needs nothing from the request.
 *
 * Two routes, listed by hand. That is not laziness: there are no dynamic
 * routes to enumerate, and a generated list would only add a way for the file
 * to drift from what actually ships.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build time, not "now at request time" — there is no request time. This is
  // the honest answer to "when did this page last change", since the page is
  // frozen at whatever the build produced.
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
