"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { markHydrated } from "@/lib/reveal-fallback";

interface ImageRevealProps {
  children: ReactNode;
  /** Seconds. Stagger this across a grid so tiles don't all land at once. */
  delay?: number;
  className?: string;
}

/**
 * An entrance for the photograph itself, distinct from the entrance of the card
 * around it.
 *
 * `Reveal` already brings each tile in — up, straight, unblurred. Running the
 * image on the same curve just makes a bigger version of the same move. This
 * instead wipes the frame open from the bottom while the picture settles out of
 * a slight zoom, so the tile arrives and *then* the photograph resolves inside
 * it. Two beats, not one louder beat.
 *
 * WHY IT IS A WRAPPER AND NOT PROPS ON THE IMAGE
 *
 * Call sites hang `transition-transform group-hover:scale-105` off the image's
 * own className (see Work.tsx). Animating the image's transform here would
 * fight that hover — MediaImage's header comment records the same hazard for
 * `transition-*` utilities. Scaling a wrapper instead composes with the hover
 * scale rather than replacing it.
 *
 * The wrapper is `absolute inset-0`, which is also what `fill` images need from
 * their nearest positioned ancestor, so it slots in without changing layout.
 */
export function ImageReveal({
  children,
  delay = 0,
  className,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    markHydrated();
    // Same safety net as Reveal: an observer that never fires must not leave a
    // photograph clipped out of existence.
    const timer = setTimeout(() => setForceShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (shouldReduceMotion) {
    return (
      <div className={`absolute inset-0 ${className ?? ""}`}>{children}</div>
    );
  }

  const visible = isInView || forceShow;

  return (
    <motion.div
      ref={ref}
      // `data-reveal` opts this into the no-JS force-show rules in globals.css,
      // which reset clip-path and scale along with everything else. Without it
      // a failed bundle would leave the frame permanently shut.
      data-reveal
      className={`absolute inset-0 ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.14 }}
      animate={
        visible
          ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
          : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.14 }
      }
      transition={{
        // The wipe finishes before the zoom does, so the picture is fully
        // framed while it is still settling — that overlap is what stops it
        // reading as two separate tricks played in sequence.
        clipPath: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
