import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ReactLenis } from "lenis/react";
import { REVEAL_FALLBACK_SCRIPT } from "@/lib/reveal-fallback";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  axes: ["opsz"],
});

// Playfair Display replaces Instrument Serif: same "elegant italic accent" role,
// but Instrument Serif has no Cyrillic glyphs at all (Latin/Latin-ext only),
// so Russian eyebrow labels would silently fall back to a system serif.
const instrumentSerif = Playfair_Display({
  variable: "--font-instrument-serif",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Lynk & Co 06 — параллельный импорт из Китая",
  description:
    "Прямые поставки Lynk & Co 06 по параллельному импорту. Автомобили в наличии на складе в Хоргосе, отгрузка от одной единицы, доставка по странам СНГ.",
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
        {/* beforeInteractive so it runs ahead of first paint and ahead of the
            app bundle — the whole point is to cover the bundle not arriving.
            Routed through next/script rather than a bare <script> tag, which
            React refuses to execute from inside a component tree. */}
        <Script id="reveal-fallback" strategy="beforeInteractive">
          {REVEAL_FALLBACK_SCRIPT}
        </Script>

        <div className="light-rays-backdrop" aria-hidden="true">
          <span className="light-rays-bundle light-rays-bundle-a" />
          <span className="light-rays-bundle light-rays-bundle-b" />
          <span className="light-rays-bundle light-rays-bundle-c" />
        </div>
        <ReactLenis root options={{ anchors: true, lerp: 0.1 }}>
          {children}
        </ReactLenis>
        <div className="sepia-grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
