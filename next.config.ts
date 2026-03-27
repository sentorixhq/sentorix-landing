import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: "export",

  // Trailing slash for Cloudflare Pages routing
  trailingSlash: true,

  // Disable image optimisation (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
