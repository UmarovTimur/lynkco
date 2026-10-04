import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ReactLenis } from "lenis/react";
import { PageTransitionProvider } from "@/components/PageTransition";
import { REVEAL_FALLBACK_SCRIPT } from "@/lib/reveal-fallback";
import { SITE_NAME, SITE_URL, asset } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { SiteLoader } from "@/components/SiteLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  axes: ["opsz"],
});

// Playfair Display replaces Instrument Serif: same "elegant italic accent" role,
// but Instrument Serif has no Cyrillic glyphs at all (Latin/Latin-ext only),
// so Russian eyebrow labels would silently fall back to a system serif.
// Kept out of the critical path on purpose. This face is only ever used for the
// small italic eyebrow above a section heading, and there is no such label in
// the first viewport of either route — preloading it put ~119KB of fonts ahead
// of the hero. `swap` lets those labels paint in the metric-matched fallback
// Next generates (Playfair Display Fallback, off local Times New Roman) and
// switch when the real face lands.
//
// `normal` is deliberately absent: every one of the ten `font-serif` call sites
// in src/ is italic, so shipping the upright cuts a subset nothing renders.
const instrumentSerif = Playfair_Display({
  variable: "--font-instrument-serif",
  subsets: ["latin", "cyrillic"],
  style: ["italic"],
  preload: false,
  display: "swap",
});

const TITLE = "Lynk & Co 06 — параллельный импорт из Китая";
const DESCRIPTION =
  "Прямые поставки Lynk & Co 06 по параллельному импорту. Автомобили в наличии на складе в Хоргосе, отгрузка от одной единицы, доставка по странам СНГ.";

export const metadata: Metadata = {
  // Without metadataBase, Next resolves every relative OG/canonical URL against
  // localhost and says so in the build log. With `output: "export"` there is no
  // request to infer a host from later, so this is the only chance to get it
  // right — see src/lib/site.ts.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Sub-pages set only their own title; this keeps the brand on the end of it
    // without every page having to remember to repeat it.
    template: "%s | Lynk & Co 06",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        // Written by scripts/optimize-static-images.mjs from a gallery frame.
        url: "/seo/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lynk & Co 06 — параллельный импорт из Китая",
      },
    ],
  },
  twitter: {
    // Large image rather than the default summary thumbnail: the product here
    // is the car, and a 120px square of it communicates nothing.
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/seo/og.jpg"],
  },
  icons: {
    icon: [
      {
        url: asset("/seo/favicon-light.png"),
        media: "(prefers-color-scheme: light)",
      },
      {
        url: asset("/seo/favicon-dark.png"),
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: asset("/seo/apple-touch-icon.png"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google show a full-size image and an untruncated snippet — the
      // defaults are conservative and cost preview real estate for no benefit
      // on a page that wants to be seen.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The fallback script stamps data-js onto <html> before React boots, so the
    // server markup and the hydrating client disagree on this element's
    // attributes by design.
    <html
      lang="ru"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* No min-width floor: any value above the real device width (430px was
          wider than an iPhone 12/13/14 at 390px) makes the body overflow the
          screen, so the phone zooms out to fit and the page never fills the
          viewport. The layout is responsive on its own down to ~320px. */}
      <body className="flex min-h-full flex-col">
        {/* Inert JSON-LD data, rendered into the prerendered HTML where
            crawlers read it. See StructuredData for what it does and does not
            claim. */}
        <StructuredData />

        {/* First in the body so it is parsed and painted before the sections
            behind it — the whole point is to be on screen at first paint. It
            takes itself down via the data-loader attribute; no JS of ours
            needs to run. */}
        <SiteLoader />

        {/* beforeInteractive so it runs ahead of first paint and ahead of the
            app bundle — the whole point is to cover the bundle not arriving.
            Routed through next/script rather than a bare <script> tag, which
            React refuses to execute from inside a component tree. */}
        <Script id="reveal-fallback" strategy="beforeInteractive">
          {REVEAL_FALLBACK_SCRIPT}
        </Script>

        {/* Static corner glow over the opening screen. Separate from the ray
            layer below because that one is pinned to the viewport and this one
            must not be — see .page-glow in globals.css. */}
        <div className="page-glow" aria-hidden="true" />

        <div className="light-rays-backdrop" aria-hidden="true">
          <span className="light-rays-bundle light-rays-bundle-a" />
          <span className="light-rays-bundle light-rays-bundle-b" />
        </div>

        {/* The big diagonal shafts every page opens on. They share their band
            masks with the footer's (see .ray-band-* in globals.css) and live
            here rather than in a section so each route gets the same opening,
            not just the home page. */}
        <div className="page-rays" aria-hidden="true">
          <span className="page-ray ray-band-1" />
          <span className="page-ray ray-band-2" />
          <span className="page-ray ray-band-3" />
          <span className="page-ray ray-band-4" />
          <span className="page-ray ray-band-5" />
        </div>
        <ReactLenis root options={{ anchors: true, lerp: 0.1 }}>
          {/* Inside ReactLenis: the cover has to reset Lenis' scroll offset
              itself once the new route commits behind it. */}
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ReactLenis>
        <div className="sepia-grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
