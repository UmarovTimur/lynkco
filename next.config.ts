import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static site: `next build` writes a self-contained `out/` that nginx
  // can serve straight off disk, with no Node process behind it.
  //
  // Nothing here needs a server — no route handlers, no server actions, no
  // cookies()/headers(), no runtime fetch, no dynamic routes. Both pages were
  // already prerendered under `standalone`; the Node process existed only to
  // run the image optimizer.
  //
  // nginx needs one rule to match this, because `trailingSlash` is left at its
  // default and routes are emitted as `/gallery.html` rather than
  // `/gallery/index.html`:
  //
  //   location / { try_files $uri $uri.html $uri/ =404; }
  //   error_page 404 /404.html;
  output: "export",

  images: {
    // A static export has no image server, so `next/image` cannot resize
    // anything at request time — this makes that explicit instead of failing
    // the build. What the browser gets is exactly the file in public/, which is
    // why scripts/optimize-static-images.mjs now caps those files at the sizes
    // the layout actually paints (see the header comment there).
    //
    // The trade-off this accepts: no srcset, so a phone downloads the same file
    // as a desktop. That is affordable only because the sources are now
    // 12-120KB. Re-check it before adding any full-bleed image.
    unoptimized: true,
  },
  // Lets the dev server (HMR websocket, RSC, etc.) be accessed through the
  // ngrok tunnel used for mobile/remote preview — without this, Next.js
  // blocks cross-origin dev requests and client-side hydration breaks for
  // parts of the page.
  // Wildcards matter here: cloudflare quick-tunnels and ngrok mint a brand new
  // random hostname on every restart, so pinning exact hosts means the next
  // tunnel is silently blocked again — the page still renders (it's server
  // HTML) but the client bundle is refused, so nothing hydrates: no entrance
  // animations, nav menu and FAQ don't open.
  allowedDevOrigins: [
    // Phones on the same wifi hit the dev server by LAN IP, which counts as a
    // different origin than the localhost it was started on.
    //
    // Pinned addresses go stale the moment the router hands out a different
    // lease, and the failure is quiet in the worst way: the page still renders,
    // because that is server HTML, but the bundle is refused and nothing
    // hydrates. `192.168.1.36` was here while the machine sat on `.34`, which
    // is exactly the shape of "on my phone the images never appear, only their
    // loaders" — no hydration means no effect to take the placeholders down.
    // Check `hostname -I` before trusting either of these.
    "192.168.1.34",
    "192.168.1.36",
    "*.trycloudflare.com",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.app",
    "*.ngrok.io",
    "camping-rent.uz",
    "www.camping-rent.uz",
  ],
};

export default nextConfig;
