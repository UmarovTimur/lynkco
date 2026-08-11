"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { MediaImage } from "@/components/MediaImage";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { Play } from "lucide-react";
import {
  ALL_ITEMS,
  GALLERY_GROUPS,
  type GalleryItem,
  plural,
} from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ALL = "all";

// Loaded on the first click, not with the grid. See the note in Work.tsx —
// `dynamic()` only splits when it is called from a Client Component.
const Lightbox = dynamic(() =>
  import("@/components/Lightbox").then((m) => m.Lightbox),
);

/** Warms the chunk on intent, so the click itself doesn't wait on a fetch. */
function preloadLightbox() {
  void import("@/components/Lightbox");
}

function Thumb({
  item,
  onOpen,
  eager,
}: {
  item: GalleryItem;
  onOpen: () => void;
  /** Above the fold on first paint — skips the lazy queue. */
  eager: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={preloadLightbox}
      onFocus={preloadLightbox}
      className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <MediaImage
        src={item.thumb}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        // `priority` is deprecated in Next 16 and meant a <link rel="preload">
        // per image — eight of them in the head of this route. These are all
        // above the fold, so eager is the part worth keeping; the head stays
        // clear for the fonts.
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {item.type === "video" && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur transition-transform duration-300 group-hover:scale-110">
            <Play size={18} className="ml-0.5 text-white" fill="currentColor" />
          </span>
        </span>
      )}
    </button>
  );
}

export function GalleryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("c") ?? ALL;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    if (filter === ALL) return ALL_ITEMS;
    return GALLERY_GROUPS.find((g) => g.slug === filter)?.items ?? ALL_ITEMS;
  }, [filter]);

  const setFilter = useCallback(
    (slug: string) => {
      // Shallow URL update so the active colour is shareable and the back
      // button steps through filters rather than leaving the page.
      const query = slug === ALL ? "" : `?c=${slug}`;
      router.replace(`/gallery${query}`, { scroll: false });
      setOpenIndex(null);
    },
    [router],
  );

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length],
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter(ALL)}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors",
            filter === ALL
              ? "border-black bg-black text-white"
              : "border-black/15 bg-white text-black hover:border-black/40",
          )}
        >
          Все · {ALL_ITEMS.length}
        </button>

        {GALLERY_GROUPS.map((group) => (
          <button
            key={group.slug}
            type="button"
            onClick={() => setFilter(group.slug)}
            title={group.note ?? undefined}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
              filter === group.slug
                ? "border-black bg-black text-white"
                : "border-black/15 bg-white text-black hover:border-black/40",
            )}
          >
            {group.swatch && (
              <span
                className="h-3 w-3 shrink-0 rounded-full border border-black/15"
                style={{ backgroundColor: group.swatch }}
                aria-hidden="true"
              />
            )}
            {group.label} · {group.items.length}
          </button>
        ))}
      </div>

      {(() => {
        const active = GALLERY_GROUPS.find((g) => g.slug === filter);
        return active?.note ? (
          <p className="mt-4 text-center text-sm text-black/40">
            {active.label} — {active.note}
          </p>
        ) : null;
      })()}

      <p className="mt-6 text-center text-sm text-black/40">
        {plural(
          items.filter((i) => i.type === "photo").length,
          "фотография",
          "фотографии",
          "фотографий",
        )}
        {items.some((i) => i.type === "video") &&
          ` · ${plural(
            items.filter((i) => i.type === "video").length,
            "видео",
            "видео",
            "видео",
          )}`}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <Thumb
            key={item.src}
            item={item}
            eager={i < 8}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={items}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}
