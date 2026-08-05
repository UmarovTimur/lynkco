"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

const SWEEP_DURATION = 0.55;

// If the route never commits — an aborted push, a failed chunk — the cover
// would otherwise sit over the page for good. Long enough not to fire on a slow
// but working navigation.
const COMMIT_TIMEOUT_MS = 2500;

const PageTransitionContext = createContext<((href: string) => void) | null>(
  null,
);

/** The pathname a link lands on, with any hash and trailing slash stripped. */
function pathOf(href: string) {
  const path = href.split("#")[0].split("?")[0];
  if (!path) return null; // A bare "#anchor" — same page by definition.
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  // The cover sweeps bottom-to-top in one continuous move, pausing only long
  // enough at full coverage for the next route to swap in behind it. `target`
  // doubles as the "a transition is running" flag; `pushed` marks the halfway
  // point, which is a hard sync point — the route must have committed before
  // the cover starts leaving, or the reader catches the old page on the way
  // out.
  const [target, setTarget] = useState<string | null>(null);
  const [pushed, setPushed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Derived rather than stored: `usePathname` already re-renders us when the
  // route commits, so reading it here is what turns the cover around. Storing
  // it instead would mean a setState in an effect for a value we can just look
  // at.
  const arrived =
    pushed && target !== null && (timedOut || pathname === pathOf(target));

  const navigate = useCallback(
    (href: string) => {
      if (shouldReduceMotion) {
        router.push(href);
        return;
      }
      setTarget(href);
      setPushed(false);
      setTimedOut(false);
    },
    [router, shouldReduceMotion],
  );

  useEffect(() => {
    if (!pushed) return;
    const id = setTimeout(() => setTimedOut(true), COMMIT_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [pushed]);

  // Next resets scroll on navigation by writing the scroll position directly,
  // which Lenis — driving scroll from JS — doesn't see, so it restores its own
  // stale offset on the next frame. Hash targets are left alone: Lenis' anchor
  // handling (see layout.tsx) owns those.
  useEffect(() => {
    if (!arrived || !target || target.includes("#")) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [arrived, target, lenis]);

  const onSweepComplete = useCallback(() => {
    if (!pushed) {
      setPushed(true);
      if (target) router.push(target);
      return;
    }
    if (!arrived) return;
    setTarget(null);
    setPushed(false);
    setTimedOut(false);
  }, [arrived, pushed, target, router]);

  return (
    <PageTransitionContext.Provider value={navigate}>
      {children}

      <AnimatePresence>
        {target !== null && (
          <motion.div
            key="page-cover"
            aria-hidden
            // Above the nav (z-50) and the gallery lightbox (z-100).
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
            initial={{ y: "100%" }}
            animate={{ y: arrived ? "-100%" : "0%" }}
            transition={{ duration: SWEEP_DURATION, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={onSweepComplete}
          >
            <motion.span
              className="font-sans text-3xl font-bold tracking-[-0.02em] text-black sm:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: SWEEP_DURATION * 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Lynk &amp; Co 06
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

/**
 * A `next/link` that plays the cover sweep before handing over to the router.
 *
 * Falls back to plain link behaviour whenever a transition would be wrong:
 * modified clicks (the reader wants a new tab), and links whose pathname
 * matches the current one — those are in-page anchors, where covering the
 * screen to scroll a few hundred pixels would be absurd.
 */
export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const navigate = useContext(PageTransitionContext);
  const pathname = usePathname();
  const to = typeof href === "string" ? href : null;

  return (
    <Link
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!navigate || !to || event.defaultPrevented) return;
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const destination = pathOf(to);
        if (destination === null || destination === pathname) return;

        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </Link>
  );
}
