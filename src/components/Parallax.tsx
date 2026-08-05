"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * How far above its resting place the content starts, in px. Give stacked
   * blocks different values — that difference in travel is what reads as
   * parallax rather than as one slab sliding in.
   */
  distance?: number;
  /** Blur at the start, in px. 0 disables the sharpening pass. */
  blur?: number;
}

/**
 * Scroll-linked reveal: content drops in from above while it sharpens out of
 * blur and transparency, driven by how far its container has travelled through
 * the viewport rather than by a timer.
 *
 * This is deliberately not `Reveal`. Reveal fires a fixed-duration animation
 * once on entry; here the progress *is* the scroll position, so the motion
 * tracks the reader and reverses if they scroll back up.
 */
export function Parallax({
  children,
  className,
  distance = 80,
  blur = 16,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Runs from the element first touching the bottom of the viewport to it
  // sitting at the centre, so it has settled before the reader looks straight
  // at it. Hooks must run unconditionally, hence this sits above the
  // reduced-motion branch.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.85],
    [`blur(${blur}px)`, "blur(0px)"],
  );

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {/* data-reveal so the no-JS / failed-bundle fallback can force this
          visible — see lib/reveal-fallback.ts. */}
      <motion.div
        data-reveal
        style={blur > 0 ? { y, opacity, filter } : { y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
