/**
 * Safety net for entrance animations, for when the JS bundle never arrives.
 *
 * Every animated element (Reveal, AnimatedHeading, the hero's letters and
 * chips) is a Motion component with an `initial` of `opacity: 0`. Motion
 * renders that into the server HTML as an inline style, so the markup ships
 * invisible and only becomes visible once React hydrates and Motion starts
 * animating. On a flaky mobile connection where the bundle is slow or fails,
 * the page renders — and stays blank.
 *
 * The in-component timers can't cover this: they are React effects, so they
 * only run in exactly the case that already works.
 *
 * So the state lives on <html> instead, driven by a tiny inline script that
 * ships with the document itself:
 *
 *   (no attribute)   JS disabled entirely — the script never ran
 *   data-js="pending"  script ran, waiting for React
 *   data-js="ok"       React mounted; Motion is in charge
 *   data-js="failed"   React never mounted within the grace period
 *
 * globals.css force-shows animated elements in the "no attribute" and "failed"
 * states, with !important because it has to beat Motion's inline styles.
 */

/** Grace period before we assume the bundle isn't coming. */
const HYDRATION_GRACE_MS = 4000;

/**
 * How long the loader stays up at minimum, even if React is ready sooner.
 *
 * Without a floor the loader is worse than none at all: on a warm cache
 * hydration lands in ~200ms, so the panel would appear and vanish as a single
 * frame of flicker. This holds it just long enough to read as a deliberate
 * opening rather than a glitch, and it is spent on work that is genuinely
 * happening — fonts and hero images are still arriving at that point.
 */
const LOADER_MIN_MS = 900;

/**
 * A second, independent state attribute (`data-loader`), because the loader and
 * the force-show fallback answer different questions and must be allowed to
 * disagree:
 *
 *   data-js     "is Motion in charge of visibility?"  — flips the instant React
 *               mounts, because delaying it would leave content stuck hidden
 *   data-loader "is the opening panel still up?"      — flips only once React
 *               is ready AND the minimum hold has elapsed
 *
 *   (no attribute)  scripting is off — the panel must never render, or it would
 *                   cover the page forever with nothing able to remove it
 *   "visible"       panel is up
 *   "done"          panel fades out
 */
export const REVEAL_FALLBACK_SCRIPT = `
(function () {
  var el = document.documentElement;
  el.dataset.js = "pending";
  el.dataset.loader = "visible";
  window.__loaderStart = Date.now();
  setTimeout(function () {
    if (el.dataset.js === "pending") el.dataset.js = "failed";
    // Unconditionally, even on "failed": a bundle that never arrived is
    // exactly when the reader must not be left staring at a loading panel.
    el.dataset.loader = "done";
  }, ${HYDRATION_GRACE_MS});
})();
`;

/**
 * Called from the animated components' mount effects. Reaching this proves
 * React hydrated, so Motion owns visibility from here.
 *
 * EXCEPT ONCE THE FALLBACK HAS ALREADY FIRED — and that exception is the whole
 * point of this branch. `data-js="failed"` means the grace period elapsed and
 * the force-show rules in globals.css put the entire page on screen with
 * `!important`. Handing control back to Motion at that point does not resume an
 * entrance; it un-does a page the reader is already looking at. Motion's
 * `initial` is still sitting in each element's inline style, so the instant the
 * attribute flips to "ok" every one of the ~280 animated elements drops back to
 * `opacity: 0` — the page blinks out, the photographs clip shut, and each one
 * only crawls back as its observer or its 2s timer catches up.
 *
 * That is exactly the "loader flashes, images don't appear" report on slow
 * phones: hydration there routinely lands after the 4s grace period, so the
 * flip happened on every load. A device slow enough to miss the window is the
 * last one that should then be made to replay 280 entrance animations.
 *
 * So: failed is terminal. This session shows its content plainly and skips the
 * entrances, which is the correct trade — a visible page beats an animated
 * blank one.
 */
/**
 * Every animated element calls markHydrated() from its own mount effect, and
 * there are close to 300 of them — they all mount in the same commit, while the
 * panel is still up and before the dismissal timer below has had a chance to
 * run. Without this latch each one queues its own redundant timer.
 */
let dismissalScheduled = false;

export function markHydrated() {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  if (el.dataset.js === "failed") return;
  el.dataset.js = "ok";

  if (dismissalScheduled || el.dataset.loader !== "visible") return;
  dismissalScheduled = true;

  // Serve out the rest of the minimum hold. `__loaderStart` is set by the
  // inline script above; if it is somehow missing, dismiss immediately rather
  // than inventing a delay the reader did not ask for.
  const start = (window as unknown as { __loaderStart?: number }).__loaderStart;
  const elapsed = typeof start === "number" ? Date.now() - start : LOADER_MIN_MS;
  window.setTimeout(
    () => {
      el.dataset.loader = "done";
    },
    Math.max(0, LOADER_MIN_MS - elapsed),
  );
}
