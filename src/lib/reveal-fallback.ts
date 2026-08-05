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
 * Inlined into <head> as a blocking script so it runs before first paint —
 * it must set `pending` before the browser paints, or the fallback rules
 * would flash the content visible on every load.
 */
export const REVEAL_FALLBACK_SCRIPT = `
(function () {
  var el = document.documentElement;
  el.dataset.js = "pending";
  setTimeout(function () {
    if (el.dataset.js === "pending") el.dataset.js = "failed";
  }, ${HYDRATION_GRACE_MS});
})();
`;

/**
 * Called from the animated components' mount effects. Reaching this proves
 * React hydrated, so Motion owns visibility from here and the fallback must
 * stand down — including when it has already fired on a very slow device.
 */
export function markHydrated() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.js = "ok";
}
