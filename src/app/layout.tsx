import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Hanzo — a Design Craftsman's Portfolio Template",
  description:
    "Hanzo is a free minimal and elegant portfolio template made for product, software, and digital designers to share their work quickly and effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
