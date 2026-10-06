import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files, so the site is exported to /out at build time.
  output: "export",
  images: {
    // Image optimization needs a server, which GitHub Pages doesn't have.
    unoptimized: true,
  },
};

export default nextConfig;
