import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Lets the dev server (HMR websocket, RSC, etc.) be accessed through the
  // ngrok tunnel used for mobile/remote preview — without this, Next.js
  // blocks cross-origin dev requests and client-side hydration breaks for
  // parts of the page.
  allowedDevOrigins: [
    "clustery-darell-uncopious.ngrok-free.dev",
    "camping-rent.uz",
    "www.camping-rent.uz",
    "trees-musician-abstract-flight.trycloudflare.com",
  ],
};

export default nextConfig;
