"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { MediaImage } from "@/components/MediaImage";

/**
 * The subset of a media item this viewer needs. Deliberately looser than
 * `GalleryItem` (lib/gallery) so sections holding their own hand-written lists
 * can open the same viewer without being pushed through the gallery manifest —
 * `GalleryItem` still satisfies it.
 */
export interface LightboxItem {
  src: string;
  width: number;
  height: number;
  /** Defaults to a photo. */
  type?: "photo" | "video";
  /** Videos only — poster frame shown before playback. */
  poster?: string;
  /** Empty by default: gallery thumbnails are decorative and captioned below. */
  alt?: string;
}

/**
 * Full-screen media viewer: dark overlay, one item at a time, arrows and
 * keyboard to step through the set.
 *
 * Mount it under an `<AnimatePresence>` so the fade-out gets to play, and
 * render it only while something is open — the scroll lock and the key
 * listeners live in this component's own lifecycle.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);

    // Locking background scroll takes both halves:
    //
    // 1. Lenis (see layout.tsx) drives scrolling from JS, so it keeps moving
    //    the page no matter what `overflow` says — it has to be paused.
    // 2. `html` is the scrolling element here, not `body` (body is `min-h-full`
    //    inside an `h-full` html), so an overflow lock on body does nothing.
    //    Removing the scrollbar also reflows the page, so its width is handed
    //    back as padding to keep the content from jumping sideways.
    lenis?.stop();

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
    };
  }, [onClose, onStep, lenis]);

  if (!item) return null;

  return (
    <motion.div
      // overscroll-contain stops touch rubber-banding from reaching the page
      // behind; data-lenis-prevent keeps Lenis off this subtree even if
      // something restarts it while the lightbox is open.
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col overscroll-contain bg-black/95 backdrop-blur-sm"
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
            <MediaImage
              key={item.src}
              src={item.src}
              alt={item.alt ?? ""}
              width={item.width}
              height={item.height}
              sizes="100vw"
              className="max-h-full w-auto rounded-lg object-contain"
              // The plate fills the whole stage here rather than tracking the
              // photo — the photo's own dimensions aren't laid out until it
              // loads. Toned right down so it doesn't glare out of the dark
              // overlay.
              shimmerClassName="rounded-lg bg-white/5 opacity-40"
              // The reader has already clicked and is looking at an empty
              // stage, so this never waits for anything. `priority` did the
              // same job until Next 16 deprecated it in favour of saying which
              // half you actually meant.
              loading="eager"
              fetchPriority="high"
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
