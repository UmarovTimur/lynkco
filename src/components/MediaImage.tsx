"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MediaImageProps extends ImageProps {
  /** Extra classes for the placeholder — e.g. a darker grey on dark surfaces. */
  shimmerClassName?: string;
}

/**
 * `next/image` with a shimmering grey placeholder showing through it until the
 * file has actually decoded.
 *
 * THE PLACEHOLDER SITS *BEHIND* THE IMAGE, AND THAT ORDER IS LOAD-BEARING.
 *
 * It used to be rendered after the <Image>, so it painted on top and hid the
 * photograph until React took it away. That put the single most basic thing on
 * the page — whether the reader sees the picture — at the end of a four-link
 * chain: the bundle had to arrive, hydration had to run, this effect had to see
 * the load, and finally Motion's exit animation had to play out on
 * requestAnimationFrame. Break any link and the reader is left looking at a
 * grey shimmering plate over a photograph that downloaded perfectly.
 *
 * The last link is the one that actually broke, and it broke for a reason worth
 * recording: rAF is not a guarantee. It is frozen in a backgrounded tab, and it
 * is starved on a phone whose main thread is already saturated. A half-finished
 * exit leaves the plate parked at partial opacity over the picture, forever.
 *
 * Painting the placeholder underneath removes the whole chain. A decoded image
 * is opaque, so it covers its own placeholder the instant it paints — no
 * JavaScript, no hydration, no animation frame. Everything below is now only
 * about tidying up: taking the finished plate out of the DOM so its infinite
 * sweep keyframes stop burning frames, times ~36 images on this page.
 *
 * All six call sites pass `fill`, so the <img> is `position: absolute` and wins
 * the paint order against an equally-positioned sibling declared before it.
 * A non-`fill` call site would be statically positioned and would paint *under*
 * the placeholder — if you add one, give it `relative` or it will vanish.
 *
 * Nothing here touches the image's own `className`: several call sites hang
 * `transition-transform` hover effects off it, and a second `transition-*`
 * utility from this component would win the merge and kill them.
 *
 * Requires a positioned ancestor: the placeholder is `absolute inset-0`, which
 * every call site already provides for `fill` images anyway.
 */
export function MediaImage({
  alt,
  shimmerClassName,
  onLoad,
  ...props
}: MediaImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Deliberately not the `onLoad` prop. The browser starts fetching images from
  // the server HTML long before React hydrates, so by the time a declarative
  // handler is attached the load event has usually already been and gone, and
  // the placeholder stays up over a picture that is plainly there.
  //
  // Reading `complete` is the only way to recover that after the fact, and the
  // read and the subscribe have to sit in one synchronous block: load events
  // arrive as their own tasks, so nothing can land between the two and be
  // missed. Split them — check in a ref callback, subscribe declaratively — and
  // that gap is exactly where an image goes quiet forever.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (node.complete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading state out of the DOM element is the external system this effect exists to sync with
      setLoaded(true);
      return;
    }

    // `error` counts as done too: a broken image is never going to arrive, and
    // shimmering at the reader forever is worse than showing the gap.
    const done = () => setLoaded(true);
    node.addEventListener("load", done);
    node.addEventListener("error", done);
    return () => {
      node.removeEventListener("load", done);
      node.removeEventListener("error", done);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.span
            aria-hidden
            className={cn(
              "img-shimmer pointer-events-none absolute inset-0",
              shimmerClassName,
            )}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Declared last so it paints over the placeholder above. See the header
          comment — this is the ordering the whole component depends on. */}
      <Image {...props} alt={alt} ref={ref} onLoad={onLoad} />
    </>
  );
}
