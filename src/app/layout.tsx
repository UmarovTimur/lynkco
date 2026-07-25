import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ReactLenis } from "lenis/react";
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
    <html
      lang="ru"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full min-w-[100] flex flex-col">
        <ReactLenis root options={{ anchors: true, lerp: 0.1 }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
