"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import {
  ALL_ITEMS,
  GALLERY_GROUPS,
  type GalleryItem,
  plural,
} from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ALL = "all";

function Thumb({
  item,
  onOpen,
  priority,
}: {
  item: GalleryItem;
  onOpen: () => void;
  priority: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <Image
        src={item.thumb}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        priority={priority}
        loading={priority ? undefined : "lazy"}
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

function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while the lightbox owns the viewport.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр медиа"
    >
      <div className="flex shrink-0 items-center justify-between px-6 py-5">
        <span className="text-sm text-white/60">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Предыдущее"
          className="absolute left-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative flex h-full w-full items-center justify-center">
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-lg"
            />
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              sizes="100vw"
              className="max-h-full w-auto rounded-lg object-contain"
              priority
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Следующее"
          className="absolute right-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
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
            priority={i < 8}
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
