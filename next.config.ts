import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
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
