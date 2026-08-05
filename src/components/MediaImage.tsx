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
 * `next/image` with a shimmering grey placeholder held over it until the file
 * has actually decoded.
 *
 * The placeholder covers the image rather than the image fading in over it, so
 * nothing here touches the image's own `className` — several call sites hang
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
      <Image {...props} alt={alt} ref={ref} onLoad={onLoad} />

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
    </>
  );
}
