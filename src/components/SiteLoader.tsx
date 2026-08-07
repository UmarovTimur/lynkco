/**
 * The opening panel, shown while the bundle is on its way.
 *
 * WHY IT IS PLAIN MARKUP AND PLAIN CSS
 *
 * This is a server component with no client boundary and no Motion anywhere in
 * it, and that is the entire point. Every animated element on this site ships
 * with `opacity: 0` baked into the server HTML and only becomes visible once
 * React hydrates (see lib/reveal-fallback.ts). So the gap this panel exists to
 * cover is precisely the window in which no React is running — a loader built
 * out of Motion components would itself be invisible until the moment it was no
 * longer needed.
 *
 * It therefore paints from the document itself, animates on CSS keyframes, and
 * is dismissed by an attribute on <html> that the inline head script sets. No
 * JavaScript of ours has to run for the reader to see it.
 *
 * The dismissal is CSS-only too — see the `.site-loader` rules in globals.css.
 * Note especially that with scripting off the panel is `display: none`: nothing
 * would ever be able to take it down, so it must never go up.
 */
export function SiteLoader() {
  return (
    // aria-hidden because it is decorative and transient: the real content is
    // already in the DOM behind it, so a screen reader should be reading that
    // rather than announcing a spinner it cannot act on.
    <div className="site-loader" aria-hidden="true">
      {/* The footer's shafts, reused verbatim — same classes, same band masks,
          same markup as CtaFooter. They are inseparable from their ground:
          `.footer-rays` paints the dark radial panel itself, and `.footer-ray`
          is a white sheet at 5%, which only reads against black. That is why
          this panel is dark while the rest of the site is light — the loader
          resolves into the page like lights coming up, and it puts the opening
          and the closing of the site in the same visual language.

          The only thing added on top is a slow sweep; see `.site-loader
          .footer-ray` in globals.css. */}
      <div className="footer-rays">
        <span className="footer-ray ray-band-1" />
        <span className="footer-ray ray-band-2" />
        <span className="footer-ray ray-band-3" />
        <span className="footer-ray ray-band-4" />
        <span className="footer-ray ray-band-5" />
      </div>

      <div className="site-loader-inner">
        {/* Matches the wordmark in the nav, so the panel resolves into the
            header rather than cutting to an unrelated layout. */}
        <span className="site-loader-word">Lynk &amp; Co 06</span>
        <span className="site-loader-track">
          <span className="site-loader-bar" />
        </span>
      </div>
    </div>
  );
}
