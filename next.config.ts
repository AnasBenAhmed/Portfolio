import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → produces an `out/` folder for shared hosting (Namecheap).
  output: "export",

  // Each route becomes a folder with index.html (e.g. /projects/ripple/index.html),
  // which Apache serves cleanly without any rewrite rules.
  trailingSlash: true,

  // Static export can't use the default (server) image optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
