"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import { MediaImage } from "@/components/MediaImage";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { nbsp, SECTION_HEADING_CLASS } from "@/lib/typography";
// Type-only, and it has to stay on its own line: folded back into the
// `dynamic()` module's value import it would pull the chunk into this bundle
// and undo the split below.
import type { LightboxItem } from "@/components/Lightbox";

// Nothing on this page needs the viewer until a tile is clicked. Split from a
// Client Component on purpose — a Server Component importing a Client Component
// through `dynamic()` does not code-split at all (next/dist/docs
// 01-app/02-guides/lazy-loading.md), which is also why page.tsx cannot do this
// for whole sections.
const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((m) => m.Lightbox),
);

/** Warms the chunk on intent, so the click itself doesn't wait on a fetch. */
function preloadLightbox() {
  void import("@/components/Lightbox");
}

interface GalleryItem {
  title: string;
  caption: string;
  image: string;
  /** Intrinsic size of the file — the lightbox lays the photo out from it. */
  width: number;
  height: number;
  /** Spans both columns on desktop. */
  wide?: boolean;
}

/** Photography extracted from the official HMR presentation deck (20.07.2026). */
const GALLERY: GalleryItem[] = [
  {
    title: "Lynk & Co 06",
    caption: "Белый — базовый цвет для Max и Ultra",
    image: "/images/gallery/06-white-coast.webp",
    width: 1600,
    height: 899,
    wide: true,
  },
  {
    title: "В движении",
    caption: "",
    image: "/images/gallery/06-white-mountain-road.webp",
    width: 1600,
    height: 1067,
  },
  {
    title: "Интерьер",
    caption: "",
    image: "/images/gallery/06-interior-dashboard.webp",
    width: 930,
    height: 620,
  },
  {
    title: "Twilight Purple",
    caption: "Только Ultra, +1 200 ¥",
    image: "/images/gallery/06-purple-profile.webp",
    width: 1024,
    height: 576,
  },
  {
    title: "Forest Green",
    caption: "Только Ultra, +1 500 ¥",
    image: "/images/gallery/06-green-studio.webp",
    width: 660,
    height: 360,
  },
  {
    title: "Экстерьер",
    caption: "",
    image: "/images/gallery/06-mint-architecture.webp",
    width: 930,
    height: 620,
  },
  {
    title: "Городской формат",
    caption: "",
    image: "/images/gallery/06-mint-street.webp",
    width: 700,
    height: 415,
  },
];

/** Same order as the grid, so the index a tile opens with is its own. */
const LIGHTBOX_ITEMS: LightboxItem[] = GALLERY.map((item) => ({
  src: item.image,
  width: item.width,
  height: item.height,
  alt: item.title,
}));

export function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + GALLERY.length) % GALLERY.length;
    });
  }, []);

  return (
    <section id="work" className="px-6 py-16 md:px-16 md:py-24 lg:px-[120px]">
      <Reveal rotate={-3} className="mx-auto flex w-fit items-center gap-4">
        <span
          className="hidden h-px w-12 bg-black/15 sm:block"
          aria-hidden="true"
        />
        <span className="font-serif text-2xl italic sm:text-3xl text-black/50">
          Галерея
        </span>
        <span
          className="hidden h-px w-12 bg-black/15 sm:block"
          aria-hidden="true"
        />
      </Reveal>

      <AnimatedHeading
        text="Как выглядит Lynk & Co 06"
        className={SECTION_HEADING_CLASS}
        delay={0.08}
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {GALLERY.map((item, i) => (
          <Reveal
            key={item.title}
            delay={0.16 + i * 0.05}
            rotate={i % 2 === 0 ? 2 : -2}
            className={item.wide ? "md:col-span-2" : undefined}
          >
            <figure className="group">
              <div
                className={`relative overflow-hidden rounded-2xl bg-neutral-100 ${item.wide ? "aspect-[16/9]" : "aspect-[3/2]"
                  }`}
              >
                {/* Trails the tile's own Reveal by 0.18s so the card lands
                    first and the photograph resolves inside it, rather than
                    both moving as one block. */}
                <ImageReveal delay={0.34 + i * 0.05}>
                  <MediaImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={
                      item.wide
                        ? "(min-width: 1024px) 1024px, 100vw"
                        : "(min-width: 768px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </ImageReveal>

                {/* An overlay rather than a <button> wrapped around the frame:
                    ImageReveal renders a div, which a button may not contain.
                    Hovering it still hovers the figure, so the group-hover
                    zoom on the photograph above keeps working. */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  onPointerEnter={preloadLightbox}
                  onFocus={preloadLightbox}
                  aria-label={`Открыть «${item.title}» во весь экран`}
                  className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-lg text-black">{item.title}</span>
                <span className="text-right text-base text-black/40">
                  {nbsp(item.caption)}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={LIGHTBOX_ITEMS}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
