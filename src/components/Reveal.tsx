"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Small entrance rotation in degrees. Alternate sign between lines for variety. */
  rotate?: number;
  /** Render as a block-level div (default) or an inline span (for lines inside a heading/paragraph). */
  as?: "div" | "span";
}

export function Reveal({
  children,
  className,
  delay = 0,
  rotate = 3,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    // Safety net: content must never stay permanently hidden if the
    // intersection observer doesn't fire for some reason (backgrounded
    // tab, unusual browser state, etc).
    const timer = setTimeout(() => setForceShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const visible = isInView || forceShow;
  const hidden = { opacity: 0, y: 24, rotate, filter: "blur(8px)" };
  const shown = { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" };
  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (as === "span") {
    return (
      <motion.span
        ref={ref as RefObject<HTMLSpanElement>}
        className={className}
        initial={hidden}
        animate={visible ? shown : hidden}
        transition={transition}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
