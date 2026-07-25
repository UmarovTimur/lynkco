"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
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
    return <div className={className}>{children}</div>;
  }

  const visible = isInView || forceShow;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 28, filter: "blur(10px)" }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
