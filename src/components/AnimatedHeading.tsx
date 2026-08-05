"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { markHydrated } from "@/lib/reveal-fallback";

const LETTER_STAGGER = 0.022;

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  /** Heading level. Defaults to h2 — pass "h1" for a page title. */
  as?: "h1" | "h2";
  /** Offset before the first letter starts, in seconds. */
  delay?: number;
}

/**
 * Section heading that reveals a letter at a time, matching the hero's opening
 * line. Two things differ from the hero's version:
 *
 * - it fires when scrolled into view rather than on mount, since every other
 *   heading on the page starts below the fold;
 * - characters are grouped into per-word inline-blocks with real spaces
 *   between them. Animating bare characters (as the hero does, where each line
 *   is authored pre-split) turns every character into its own wrap opportunity
 *   and shreds long headings mid-word at narrow widths.
 */
export function AnimatedHeading({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    markHydrated();
    if (forceShow) return;
    // Safety net for the observer never firing (backgrounded tab, odd browser
    // state). Reveal's equivalent just flips everything visible on a timer,
    // which can't work here: that would run every heading's reveal while it
    // was still far below the fold, leaving nothing to see by the time the
    // reader scrolled down. So poll position instead and only step in for
    // headings that are genuinely on screen.
    const id = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) setForceShow(true);
    }, 1000);
    return () => clearInterval(id);
  }, [forceShow]);

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const visible = isInView || forceShow;
  const words = text.split(" ");
  // Character offset each word starts at, so the stagger keeps running
  // left-to-right across word boundaries instead of restarting per word.
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((n, w) => n + w.length, 0),
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, w) => {
        const start = offsets[w];
        return (
          // The space lives *outside* the nowrap span so it stays a wrap
          // opportunity — tucking it inside would make the heading unbreakable.
          <Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, i) => (
                <motion.span
                  key={i}
                  data-reveal
                  className="inline-block"
                  initial={{ opacity: 0, y: "70%" }}
                  animate={
                    visible ? { opacity: 1, y: "0%" } : { opacity: 0, y: "70%" }
                  }
                  transition={{
                    duration: 0.45,
                    delay: delay + (start + i) * LETTER_STAGGER,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
